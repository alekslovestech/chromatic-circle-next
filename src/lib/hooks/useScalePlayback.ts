"use client";

import { useCallback, useRef, useEffect, useState } from "react";
import {
  ixScaleDegreeIndex,
  ScaleDegreeIndex,
} from "@/types/GreekModes/ScaleDegreeType";
import { chromaticToActual, ixOctaveOffset } from "@/types/IndexTypes";
import { ScalePlaybackMode } from "@/types/ScalePlaybackMode";
import { PlaybackState } from "@/contexts/AudioContext";
import { useMusical } from "@/contexts/MusicalContext";
import { useDisplay } from "@/contexts/DisplayContext";
import { useGlobalMode } from "@/lib/hooks";

const PLAYBACK_DURATION_SINGLE_NOTE = 300;
const PLAYBACK_DURATION_CHORD = 500;

interface UseScalePlaybackProps {
  isAudioInitialized: boolean;
  playbackState: PlaybackState;
  setPlaybackState: (state: PlaybackState) => void;
}

export const useScalePlayback = ({
  isAudioInitialized,
  playbackState,
  setPlaybackState,
}: UseScalePlaybackProps) => {
  const [scalePlaybackMode, setScalePlaybackMode] = useState<ScalePlaybackMode>(
    ScalePlaybackMode.SingleNote
  );

  const { selectedMusicalKey, setSelectedNoteIndices } = useMusical();
  const { scalePreviewMode } = useDisplay();
  const globalMode = useGlobalMode();

  const scaleDegreeIndexRef = useRef<ScaleDegreeIndex>(ixScaleDegreeIndex(0));
  const playbackTimerIdRef = useRef<NodeJS.Timeout | null>(null);
  const landingNoteRef = useRef(false);
  const userStoppedPlaybackRef = useRef(false);

  const stopScalePlayback = useCallback(() => {
    console.log("AudioContext: Stopping scale playback");
    if (playbackTimerIdRef.current) {
      clearInterval(playbackTimerIdRef.current);
      playbackTimerIdRef.current = null;
    }
    setPlaybackState(PlaybackState.ScaleComplete);
    scaleDegreeIndexRef.current = ixScaleDegreeIndex(0);
    userStoppedPlaybackRef.current = true; // Mark as user-stopped
  }, [setPlaybackState]);

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

    userStoppedPlaybackRef.current = false; // Reset the flag when starting

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
    setPlaybackState,
  ]);

  const pauseScalePlayback = useCallback(() => {
    console.log("AudioContext: Pausing scale playback");
    if (playbackTimerIdRef.current) {
      clearInterval(playbackTimerIdRef.current);
      playbackTimerIdRef.current = null;
    }
    setPlaybackState(PlaybackState.ScalePaused);
  }, [setPlaybackState]);

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
    setPlaybackState,
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
      // Only auto-start if not manually stopped by user
      if (
        playbackState === PlaybackState.ScaleComplete &&
        !userStoppedPlaybackRef.current
      ) {
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
    playbackState,
  ]);

  // Separate effect to handle musical key changes
  useEffect(() => {
    // Reset user-stopped flag when musical key changes
    userStoppedPlaybackRef.current = false;
    console.log("Musical key changed, resetting user-stopped flag");

    // Auto-start playback for the new scale if conditions are met
    if (scalePreviewMode && isAudioInitialized) {
      console.log("🎵 Auto-starting playback for new musical key");
      startScalePlayback();
    }
  }, [
    selectedMusicalKey,
    scalePreviewMode,
    isAudioInitialized,
    startScalePlayback,
  ]);

  return {
    scalePlaybackMode,
    setScalePlaybackMode,
    startScalePlayback,
    stopScalePlayback,
    pauseScalePlayback,
    resumeScalePlayback,
  };
};
