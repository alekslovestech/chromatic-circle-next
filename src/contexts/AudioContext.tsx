"use client";

import React, {
  createContext,
  useContext,
  useState,
  useRef,
  useCallback,
  useEffect,
} from "react";
import {
  ixScaleDegreeIndex,
  ScaleDegreeIndex,
} from "@/types/GreekModes/ScaleDegreeType";
import { chromaticToActual, ixOctaveOffset } from "@/types/IndexTypes";
import { ScalePlaybackMode } from "@/types/ScalePlaybackMode";
import { ChordProgressionType } from "@/types/ChordProgressionType";

import { useGlobalMode } from "@/lib/hooks";

import { useMusical } from "./MusicalContext";
import { useDisplay } from "./DisplayContext";
import { ChordProgressionLibrary } from "@/types/ChordProgressionLibrary";
import { AbsoluteChord } from "@/types/AbsoluteChord";

export enum PlaybackState {
  ScaleComplete, //sound does not necessarily stop, but we're not playing a scale
  ScalePlaying, //sound is playing
  ScalePaused, //scale playback is paused, can be resumed
}

const PLAYBACK_DURATION_SINGLE_NOTE = 300;
const PLAYBACK_DURATION_CHORD = 500;

interface AudioContextType {
  isAudioInitialized: boolean;
  playbackState: PlaybackState;
  scalePlaybackMode: ScalePlaybackMode;
  startScalePlayback: () => void;
  stopScalePlayback: () => void;
  pauseScalePlayback: () => void;
  resumeScalePlayback: () => void;
  setAudioInitialized: (initialized: boolean) => void;
  setScalePlaybackMode: (mode: ScalePlaybackMode) => void;

  // Add chord progression playback:
  selectedProgression: ChordProgressionType | null;
  progressionPlaybackState: PlaybackState; // or reuse the same playbackState
  currentChordIndex: number;

  // Methods:
  startProgressionPlayback: () => void;
  pauseProgressionPlayback: () => void;
  stopProgressionPlayback: () => void;
  setSelectedProgression: (progression: ChordProgressionType | null) => void;
}

const AudioContext = createContext<AudioContextType | undefined>(undefined);

export const useAudio = () => {
  const context = useContext(AudioContext);
  if (!context) {
    throw new Error("useAudio must be used within an AudioProvider");
  }
  return context;
};

export const AudioProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isAudioInitialized, setIsAudioInitialized] = useState(false);
  const [playbackState, setPlaybackState] = useState<PlaybackState>(
    PlaybackState.ScaleComplete
  );
  const [scalePlaybackMode, setScalePlaybackMode] = useState<ScalePlaybackMode>(
    ScalePlaybackMode.SingleNote
  );
  const { selectedMusicalKey, setSelectedNoteIndices } = useMusical();
  const { scalePreviewMode } = useDisplay();
  const globalMode = useGlobalMode();

  const scaleDegreeIndexRef = useRef<ScaleDegreeIndex>(ixScaleDegreeIndex(0));
  const playbackTimerIdRef = useRef<NodeJS.Timeout | null>(null);
  const landingNoteRef = useRef(false);

  const [selectedProgression, setSelectedProgression] =
    useState<ChordProgressionType | null>(null);
  const chordIndexRef = useRef<number>(0);
  const progressionTimerRef = useRef<NodeJS.Timeout | null>(null);

  const stopScalePlayback = useCallback(() => {
    console.log("AudioContext: Stopping scale playback");
    if (playbackTimerIdRef.current) {
      clearInterval(playbackTimerIdRef.current);
      playbackTimerIdRef.current = null;
    }
    setPlaybackState(PlaybackState.ScaleComplete);
    scaleDegreeIndexRef.current = ixScaleDegreeIndex(0);
  }, []);

  const playScaleStep = useCallback(() => {
    //final step - land on the tonic
    if (landingNoteRef.current) {
      console.assert(
        selectedMusicalKey,
        "selectedMusicalKey should always be defined"
      );
      console.log("PlayScaleStep: landing on the tonic");
      const actualTonicIndex = chromaticToActual(
        selectedMusicalKey.tonicIndex,
        ixOctaveOffset(0)
      );
      setSelectedNoteIndices([actualTonicIndex]);
      stopScalePlayback();
      landingNoteRef.current = false;
      return;
    }

    //play the note(s) for the current scale degree
    const currentScaleDegreeIndex = scaleDegreeIndexRef.current;

    const noteIndices = selectedMusicalKey.getNoteIndicesForScaleDegree(
      currentScaleDegreeIndex,
      scalePlaybackMode
    );
    setSelectedNoteIndices(noteIndices);

    //if we've played the last note (e.g. 7th degree), prepare to land on the tonic
    if (
      currentScaleDegreeIndex ===
      selectedMusicalKey!.scalePatternLength - 1
    ) {
      landingNoteRef.current = true;
      return;
    }

    // Move to next degree
    scaleDegreeIndexRef.current = ixScaleDegreeIndex(
      currentScaleDegreeIndex + 1
    );
  }, [
    selectedMusicalKey,
    setSelectedNoteIndices,
    stopScalePlayback,
    scalePlaybackMode,
  ]);

  const startScalePlayback = useCallback(() => {
    console.log("Starting scale playback");

    if (!isAudioInitialized) {
      console.log("Audio not initialized yet, cannot start scale playback");
      return;
    }

    if (!selectedMusicalKey) {
      throw new Error(
        "selectedMusicalKey is missing! This indicates a context initialization problem."
      );
    }

    if (playbackTimerIdRef.current) {
      clearInterval(playbackTimerIdRef.current);
    }

    const intervalDuration =
      scalePlaybackMode === ScalePlaybackMode.SingleNote /*||
      scalePlaybackMode === ScalePlaybackMode.DronedSingleNote*/
        ? PLAYBACK_DURATION_SINGLE_NOTE
        : PLAYBACK_DURATION_CHORD;
    playbackTimerIdRef.current = setInterval(
      () => playScaleStep(),
      intervalDuration
    );
    setPlaybackState(PlaybackState.ScalePlaying);
  }, [
    selectedMusicalKey,
    isAudioInitialized,
    playScaleStep,
    scalePlaybackMode,
  ]);

  const pauseScalePlayback = useCallback(() => {
    console.log("AudioContext: Pausing scale playback");
    if (playbackTimerIdRef.current) {
      clearInterval(playbackTimerIdRef.current);
      playbackTimerIdRef.current = null;
    }
    setPlaybackState(PlaybackState.ScalePaused);
  }, []);

  const resumeScalePlayback = useCallback(() => {
    console.log("AudioContext: Resuming scale playback");

    if (!isAudioInitialized) {
      console.log("Audio not initialized yet, cannot resume scale playback");
      return;
    }

    if (!selectedMusicalKey) {
      throw new Error(
        "selectedMusicalKey is missing! This indicates a context initialization problem."
      );
    }

    if (playbackTimerIdRef.current) {
      clearInterval(playbackTimerIdRef.current);
    }

    const intervalDuration =
      scalePlaybackMode === ScalePlaybackMode.SingleNote
        ? PLAYBACK_DURATION_SINGLE_NOTE
        : PLAYBACK_DURATION_CHORD;

    playbackTimerIdRef.current = setInterval(
      () => playScaleStep(),
      intervalDuration
    );
    setPlaybackState(PlaybackState.ScalePlaying);
  }, [
    selectedMusicalKey,
    isAudioInitialized,
    playScaleStep,
    scalePlaybackMode,
  ]);

  const playProgressionStep = useCallback(() => {
    if (!selectedProgression || !selectedMusicalKey) return;

    const progression =
      ChordProgressionLibrary.getProgression(selectedProgression);
    const currentChord: AbsoluteChord = progression.getChordAtIndex(
      chordIndexRef.current,
      selectedMusicalKey
    );

    // Update the visual selection (just like scale playback does)
    setSelectedNoteIndices([
      chromaticToActual(currentChord.chromaticIndex, ixOctaveOffset(0)),
    ]);

    // Move to next chord (or loop back to start)
    chordIndexRef.current = (chordIndexRef.current + 1) % progression.length;
  }, [selectedProgression, selectedMusicalKey, setSelectedNoteIndices]);

  const startProgressionPlayback = useCallback(() => {
    if (!selectedProgression) return;

    chordIndexRef.current = 0;
    playProgressionStep(); // Play first chord immediately

    progressionTimerRef.current = setInterval(
      () => playProgressionStep(),
      PLAYBACK_DURATION_CHORD // e.g., 2000ms per chord
    );
    setPlaybackState(PlaybackState.ScalePlaying);
  }, [selectedProgression, playProgressionStep]);

  // Stop playback when mode changes
  useEffect(() => {
    console.log("🔄 Mode changed, stopping any ongoing playback");
    stopScalePlayback();
  }, [globalMode, stopScalePlayback]);

  // Auto-start scale playback when conditions are met
  useEffect(() => {
    console.log(
      "AudioContext: useEffect scalePreviewMode:",
      scalePreviewMode,
      "isAudioInitialized:",
      isAudioInitialized
    );

    if (scalePreviewMode && isAudioInitialized) {
      // Only start if completely stopped (not playing or paused)
      if (playbackState === PlaybackState.ScaleComplete) {
        console.log("🎵 Auto-starting scale playback");
        startScalePlayback();
      }
    } else {
      console.log("⏹️ Auto-stopping scale playback");
      stopScalePlayback();
    }
  }, [
    scalePreviewMode,
    isAudioInitialized,
    startScalePlayback,
    stopScalePlayback,
  ]);

  const value = {
    isAudioInitialized,
    playbackState,
    scalePlaybackMode,
    startScalePlayback,
    stopScalePlayback,
    pauseScalePlayback,
    resumeScalePlayback,
    setAudioInitialized: setIsAudioInitialized,
    setScalePlaybackMode,

    // Add chord progression playback:
    selectedProgression,
    progressionPlaybackState: playbackState,
    setSelectedProgression,
    currentChordIndex: chordIndexRef.current,
    startProgressionPlayback,
    pauseProgressionPlayback: pauseScalePlayback, // Reusing pauseScalePlayback
    stopProgressionPlayback: stopScalePlayback, // Reusing stopScalePlayback
  };

  return (
    <AudioContext.Provider value={value}>{children}</AudioContext.Provider>
  );
};
