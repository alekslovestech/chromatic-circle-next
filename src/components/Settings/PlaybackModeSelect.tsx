"use client";
import React from "react";
import { ScalePlaybackMode } from "@/types/ScalePlaybackMode";
import { useAudio } from "@/contexts/AudioContext";
import { Button } from "@/components/Common/Button";
import { SectionTitle } from "@/components/Common/SectionTitle";

interface PlaybackModeOption {
  id: string;
  mode: ScalePlaybackMode;
  label: string;
  description: string;
}

const PLAYBACK_MODE_OPTIONS: PlaybackModeOption[] = [
  {
    id: "single-note",
    mode: ScalePlaybackMode.SingleNote,
    label: "♪",
    description: "Play single notes",
  },
  {
    id: "triad",
    mode: ScalePlaybackMode.Triad,
    label: "♪♪♪",
    description: "Play triads (3-note chords)",
  },
  {
    id: "seventh",
    mode: ScalePlaybackMode.Seventh,
    label: "♪♪♪♪",
    description: "Play seventh chords (4-note chords)",
  },
];

export const PlaybackModeSelect: React.FC = () => {
  const { scalePlaybackMode, setScalePlaybackMode } = useAudio();

  const handleModeChange = (newMode: ScalePlaybackMode) => {
    setScalePlaybackMode(newMode);
  };

  return (
    <div className="playback-mode-select">
      <SectionTitle>Playback Mode</SectionTitle>
      <div className="flex gap-2">
        {PLAYBACK_MODE_OPTIONS.map(({ id, mode, label, description }) => (
          <Button
            key={id}
            id={`playback-${id}`}
            variant="option"
            size="sm"
            selected={scalePlaybackMode === mode}
            onClick={() => handleModeChange(mode)}
            title={description}
          >
            {label}
          </Button>
        ))}
      </div>
    </div>
  );
};
