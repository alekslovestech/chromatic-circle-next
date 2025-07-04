"use client";

import React from "react";

import { DEBUG_BORDER } from "@/lib/design";
import { InputMode } from "@/types/SettingModes";
import { useGlobalMode, GlobalMode } from "@/lib/hooks";

import { Button } from "@/components/Common/Button";
import { SectionTitle } from "@/components/Common/SectionTitle";

import { usePreset } from "@/contexts/PresetContext";

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
  const globalMode = useGlobalMode();
  const handleModeChange = (newMode: InputMode) => {
    setInputMode(newMode);
  };

  const isAdvancedMode = globalMode === GlobalMode.Advanced;
  return (
    <div
      className={`input-mode-selector text-center space-y-2 ${DEBUG_BORDER}`}
    >
      <SectionTitle>Input Mode</SectionTitle>
      <div className="mode-selector-buttons w-full flex flex-col gap-snug">
        {AVAILABLE_MODES.map(({ id, mode, description }) => {
          const isHidden =
            isAdvancedMode &&
            (mode === InputMode.IntervalPresets ||
              mode === InputMode.ChordPresets);

          return (
            <Button
              id={id}
              key={mode}
              variant="option"
              size="sm"
              onClick={() => handleModeChange(mode)}
              selected={inputMode === mode}
              title={description}
              hidden={isHidden}
            >
              {mode.toString()}
            </Button>
          );
        })}
      </div>
    </div>
  );
};
