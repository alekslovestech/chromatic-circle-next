"use client";
import React from "react";

import { useChordPresets } from "@/contexts/ChordPresetContext";
import { InputMode } from "@/types/SettingModes";

import { InputModeSelector } from "./InputModeSelector";
import { ChordPresetSelector } from "./ChordPresetsSelector";
import { LAYOUT_PATTERNS } from "@/lib/design/LayoutPatterns";

export const InputSettings: React.FC = () => {
  const { inputMode } = useChordPresets();

  const showPresets =
    inputMode === InputMode.ChordPresets ||
    inputMode === InputMode.IntervalPresets;

  return (
    <div
      className={`settings-container flex flex-row ${LAYOUT_PATTERNS.fullSize} gap-loose`}
    >
      <div className="w-1/3 h-full flex items-center justify-center">
        <InputModeSelector />
      </div>
      <div
        className={`presets-container w-2/3 h-full ${LAYOUT_PATTERNS.centerFlex}`}
      >
        {showPresets ? <ChordPresetSelector /> : <div className="h-full" />}
      </div>
    </div>
  );
};
