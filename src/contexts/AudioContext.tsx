"use client";

import React, { createContext, useContext, useState } from "react";
import { useScalePlayback } from "@/lib/hooks/useScalePlayback";
import { useChordProgressionPlayback } from "@/lib/hooks/useChordProgressionPlayback";
import { ScalePlaybackMode } from "@/types/ScalePlaybackMode";
import { ChordProgressionType } from "@/types/enums/ChordProgressionType";

export enum PlaybackState {
  ScaleComplete,
  ScalePlaying,
  ScalePaused,
}

interface AudioContextType {
  isAudioInitialized: boolean;
  playbackState: PlaybackState;
  setAudioInitialized: (initialized: boolean) => void;

  // Scale playback
  scalePlaybackMode: ScalePlaybackMode;
  setScalePlaybackMode: (mode: ScalePlaybackMode) => void;
  startScalePlayback: () => void;
  stopScalePlayback: () => void;
  pauseScalePlayback: () => void;
  resumeScalePlayback: () => void;

  // Chord progression playback
  selectedProgression: ChordProgressionType | null;
  setSelectedProgression: (progression: ChordProgressionType | null) => void;
  currentChordIndex: number;
  startProgressionPlayback: () => void;
  pauseProgressionPlayback: () => void;
  stopProgressionPlayback: () => void;
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

  const scalePlayback = useScalePlayback({
    isAudioInitialized,
    playbackState,
    setPlaybackState,
  });

  const chordProgressionPlayback = useChordProgressionPlayback({
    setPlaybackState,
  });

  const value: AudioContextType = {
    isAudioInitialized,
    playbackState,
    setAudioInitialized: setIsAudioInitialized,

    // Scale playback
    ...scalePlayback,

    // Chord progression playback
    ...chordProgressionPlayback,
  };

  return (
    <AudioContext.Provider value={value}>{children}</AudioContext.Provider>
  );
};
