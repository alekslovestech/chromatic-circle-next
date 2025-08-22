"use client";

import { useCallback, useRef, useState } from "react";
import { chromaticToActual } from "@/types/IndexTypes";
import { ChordProgressionType } from "@/types/enums/ChordProgressionType";
import { ChordProgressionLibrary } from "@/types/ChordProgressionLibrary";
import { AbsoluteChord } from "@/types/AbsoluteChord";

import { PlaybackState } from "@/contexts/AudioContext";
import { useMusical } from "@/contexts/MusicalContext";

const PLAYBACK_DURATION_CHORD = 500;

interface UseChordProgressionPlaybackProps {
  setPlaybackState: (state: PlaybackState) => void;
}

export const useChordProgressionPlayback = ({
  setPlaybackState,
}: UseChordProgressionPlaybackProps) => {
  const { selectedMusicalKey, setSelectedNoteIndices } = useMusical();

  const [selectedProgression, setSelectedProgression] =
    useState<ChordProgressionType | null>(null);
  const chordIndexRef = useRef<number>(0);
  const progressionTimerRef = useRef<NodeJS.Timeout | null>(null);

  const playProgressionStep = useCallback(() => {
    if (!selectedProgression || !selectedMusicalKey) return;

    const progression =
      ChordProgressionLibrary.getProgression(selectedProgression);
    const currentChord: AbsoluteChord = progression.getChordAtIndex(
      chordIndexRef.current,
      selectedMusicalKey
    );

    // Update the visual selection (just like scale playback does)
    setSelectedNoteIndices([chromaticToActual(currentChord.chromaticIndex)]);

    // Move to next chord (or loop back to start)
    chordIndexRef.current = (chordIndexRef.current + 1) % progression.length;
  }, [selectedProgression, selectedMusicalKey, setSelectedNoteIndices]);

  const startProgressionPlayback = useCallback(() => {
    if (!selectedProgression) return;

    chordIndexRef.current = 0;
    playProgressionStep(); // Play first chord immediately

    progressionTimerRef.current = setInterval(
      () => playProgressionStep(),
      PLAYBACK_DURATION_CHORD
    );
    setPlaybackState(PlaybackState.ScalePlaying);
  }, [selectedProgression, playProgressionStep, setPlaybackState]);

  const pauseProgressionPlayback = useCallback(() => {
    // TODO: Implement pause logic
  }, []);

  const stopProgressionPlayback = useCallback(() => {
    // TODO: Implement stop logic
  }, []);

  return {
    selectedProgression,
    setSelectedProgression,
    currentChordIndex: chordIndexRef.current,
    startProgressionPlayback,
    pauseProgressionPlayback,
    stopProgressionPlayback,
  };
};
