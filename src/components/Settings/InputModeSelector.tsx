"use client";

import React from "react";

import { InputMode } from "@/types/SettingModes";

import { usePreset } from "@/contexts/PresetContext";
import { Button } from "@/components/Common/Button";
import { SectionTitle } from "@/components/Common/SectionTitle";
import { DEBUG_BORDER } from "@/lib/constants";

interface ModeSelectorButton {
  id: string;
  mode: InputMode;
  description: string;
}

const AVAILABLE_MODES: ModeSelectorButton[] = [
  {
    id: "mode-freeform",
    mode: InputMode.Toggle,
    description: "Click notes to toggle them on/off",
  },
  {
    id: "mode-singlenote",
    mode: InputMode.SingleNote,
    description: "Click a note to select it",
  },
  {
    id: "mode-intervals",
    mode: InputMode.IntervalPresets,
    description: "Select from predefined intervals",
  },
  {
    id: "mode-chords",
    mode: InputMode.ChordPresets,
    description: "Select from predefined chord patterns",
  },
];

export const InputModeSelector: React.FC = () => {
  const { inputMode, setInputMode } = usePreset();
  const handleModeChange = (newMode: InputMode) => {
    setInputMode(newMode);
  };

  /*.mode-selector {
  display: flex;
  width: 100px;
  min-height: 0;
  max-height: 100%;
  flex-direction: column;
  flex-shrink: 0;
  align-items: stretch;
  overflow-y: auto;
}*/
  /*.mode-button-container {
  width: 100%;
  display: flex;          
  flex-direction: column; 
  gap: 0.5rem;
}
}*/
  return (
    <div
      className={`input-mode-selector text-center space-y-2 ${DEBUG_BORDER}`}
    >
      <SectionTitle>Input Mode</SectionTitle>
      <div className="mode-selector-buttons w-full flex flex-col gap-normal">
        {AVAILABLE_MODES.map(({ id, mode, description }) => {
          return (
            <Button
              id={id}
              key={mode}
              variant="option"
              density="compact"
              size="sm"
              onClick={() => handleModeChange(mode)}
              selected={inputMode === mode}
              title={description}
            >
              {mode.toString()}
            </Button>
          );
        })}
      </div>
    </div>
  );
};
