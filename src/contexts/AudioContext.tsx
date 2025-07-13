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

import { useGlobalMode } from "@/lib/hooks";

import { useMusical } from "./MusicalContext";
import { useDisplay } from "./DisplayContext";

export enum PlaybackState {
  ScaleComplete, //sound does not necessarily stop, but we're not playing a scale
  ScalePlaying, //sound is playing
}

const PLAYBACK_INTERVAL_SINGLE_NOTE = 300;
const PLAYBACK_INTERVAL_CHORD = 500;

interface AudioContextType {
  isAudioInitialized: boolean;
  playbackState: PlaybackState;
  scalePlaybackMode: ScalePlaybackMode;
  startScalePlayback: () => void;
  stopScalePlayback: () => void;
  setAudioInitialized: (initialized: boolean) => void;
  setScalePlaybackMode: (mode: ScalePlaybackMode) => void;
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
      scalePlaybackMode === ScalePlaybackMode.SingleNote
        ? PLAYBACK_INTERVAL_SINGLE_NOTE
        : PLAYBACK_INTERVAL_CHORD;
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
      console.log("🎵 Auto-starting scale playback");
      startScalePlayback();
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
    setAudioInitialized: setIsAudioInitialized,
    setScalePlaybackMode,
  };

  return (
    <AudioContext.Provider value={value}>{children}</AudioContext.Provider>
  );
};
