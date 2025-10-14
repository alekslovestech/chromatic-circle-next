"use client";

import { useCallback, useRef, useState } from "react";
import { chromaticToActual } from "@/types/IndexTypes";
import { ChordProgressionType } from "@/types/enums/ChordProgressionType";
import { ChordProgressionLibrary } from "@/types/ChordProgressionLibrary";
import { AbsoluteChord } from "@/types/AbsoluteChord";
import { ScalePlaybackMode } from "@/types/ScalePlaybackMode";

import { PlaybackState } from "@/contexts/AudioContext";
import { useMusical } from "@/contexts/MusicalContext";
import { useGlobalMode } from "@/lib/hooks/useGlobalMode";
import { GlobalMode } from "@/types/enums/GlobalMode";
import { ScaleDegreeIndex } from "@/types/ScaleModes/ScaleDegreeType";

const PLAYBACK_DURATION_SCALE = 300;
const PLAYBACK_DURATION_CHORD = 500;

interface UseSequencePlaybackProps {
  isAudioInitialized: boolean;
  playbackState: PlaybackState;
  setPlaybackState: (state: PlaybackState) => void;
}

export const useSequencePlayback = ({
  isAudioInitialized,
  playbackState,
  setPlaybackState,
}: UseSequencePlaybackProps) => {
  const { selectedMusicalKey, setNotesDirectly } = useMusical();
  const globalMode = useGlobalMode();

  // Scale-specific state
  const [scalePlaybackMode, setScalePlaybackMode] = useState<ScalePlaybackMode>(
    ScalePlaybackMode.SingleNote // Use actual existing value
  );
  const scaleIndexRef = useRef<number>(0);
  const scaleTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Chord progression-specific state
  const [selectedProgression, setSelectedProgression] =
    useState<ChordProgressionType | null>(null);
  const chordIndexRef = useRef<number>(0);
  const progressionTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Unified playback functions
  const startSequencePlayback = useCallback(() => {
    if (globalMode === GlobalMode.Scales) {
      startScalePlayback();
    } else if (globalMode === GlobalMode.ChordProgressions) {
      startChordProgressionPlayback();
    }
  }, [globalMode]);

  const pauseSequencePlayback = useCallback(() => {
    if (playbackState === PlaybackState.SequencePlaying) {
      pauseCurrentPlayback();
    }
  }, [playbackState]);

  const resumeSequencePlayback = useCallback(() => {
    if (playbackState === PlaybackState.SequencePaused) {
      resumeCurrentPlayback();
    }
  }, [playbackState]);

  const stopSequencePlayback = useCallback(() => {
    stopCurrentPlayback();
    setPlaybackState(PlaybackState.SequenceComplete);
  }, [setPlaybackState]);

  // Scale playback implementation
  const startScalePlayback = useCallback(() => {
    if (!selectedMusicalKey || !isAudioInitialized) return;

    scaleIndexRef.current = 0;
    playScaleStep();

    scaleTimerRef.current = setInterval(
      () => playScaleStep(),
      PLAYBACK_DURATION_SCALE
    );
    setPlaybackState(PlaybackState.SequencePlaying);
  }, [selectedMusicalKey, isAudioInitialized, setPlaybackState]);

  const playScaleStep = useCallback(() => {
    if (!selectedMusicalKey) return;

    // Use the same approach as the original useScalePlayback
    const currentScaleDegreeIndex = scaleIndexRef.current as ScaleDegreeIndex;

    const noteIndices = selectedMusicalKey.getNoteIndicesForScaleDegree(
      currentScaleDegreeIndex,
      scalePlaybackMode
    );
    setNotesDirectly(noteIndices);

    // Check if we've reached the end of the scale
    if (currentScaleDegreeIndex >= selectedMusicalKey.scalePatternLength - 1) {
      setPlaybackState(PlaybackState.SequenceComplete);
      stopCurrentPlayback();
      return;
    }

    // Move to next scale degree
    scaleIndexRef.current++;
  }, [
    selectedMusicalKey,
    scalePlaybackMode,
    setNotesDirectly,
    setPlaybackState,
  ]);

  // Chord progression playback implementation
  const startChordProgressionPlayback = useCallback(() => {
    if (!selectedProgression || !selectedMusicalKey) return;

    chordIndexRef.current = 0;
    playProgressionStep();

    progressionTimerRef.current = setInterval(
      () => playProgressionStep(),
      PLAYBACK_DURATION_CHORD
    );
    setPlaybackState(PlaybackState.SequencePlaying);
  }, [selectedProgression, selectedMusicalKey, setPlaybackState]);

  const playProgressionStep = useCallback(() => {
    if (!selectedProgression || !selectedMusicalKey) return;

    const progression =
      ChordProgressionLibrary.getProgression(selectedProgression);
    const currentChord: AbsoluteChord = progression.getChordAtIndex(
      chordIndexRef.current,
      selectedMusicalKey
    );

    setNotesDirectly([chromaticToActual(currentChord.chromaticIndex)]);

    chordIndexRef.current = (chordIndexRef.current + 1) % progression.length;
  }, [selectedProgression, selectedMusicalKey, setNotesDirectly]);

  // Helper functions
  const pauseCurrentPlayback = useCallback(() => {
    if (scaleTimerRef.current) {
      clearInterval(scaleTimerRef.current);
      scaleTimerRef.current = null;
    }
    if (progressionTimerRef.current) {
      clearInterval(progressionTimerRef.current);
      progressionTimerRef.current = null;
    }
    setPlaybackState(PlaybackState.SequencePaused);
  }, [setPlaybackState]);

  const resumeCurrentPlayback = useCallback(() => {
    if (globalMode === GlobalMode.Scales) {
      scaleTimerRef.current = setInterval(
        () => playScaleStep(),
        PLAYBACK_DURATION_SCALE
      );
    } else if (globalMode === GlobalMode.ChordProgressions) {
      progressionTimerRef.current = setInterval(
        () => playProgressionStep(),
        PLAYBACK_DURATION_CHORD
      );
    }
    setPlaybackState(PlaybackState.SequencePlaying);
  }, [globalMode, playScaleStep, playProgressionStep, setPlaybackState]);

  const stopCurrentPlayback = useCallback(() => {
    if (scaleTimerRef.current) {
      clearInterval(scaleTimerRef.current);
      scaleTimerRef.current = null;
    }
    if (progressionTimerRef.current) {
      clearInterval(progressionTimerRef.current);
      progressionTimerRef.current = null;
    }
  }, []);

  return {
    // Unified interface
    startSequencePlayback,
    pauseSequencePlayback,
    resumeSequencePlayback,
    stopSequencePlayback,

    // Scale-specific
    scalePlaybackMode,
    setScalePlaybackMode,

    // Chord progression-specific
    selectedProgression,
    setSelectedProgression,

    // Legacy aliases for backward compatibility during transition
    startScalePlayback,
    pauseScalePlayback: pauseSequencePlayback,
    resumeScalePlayback: resumeSequencePlayback,
    stopScalePlayback: stopSequencePlayback,
  };
};
