"use client";
import React from "react";

import { usePreset } from "@/contexts/PresetContext";
import { InputMode } from "@/types/SettingModes";

import { InputModeSelector } from "./InputModeSelector";
import { PresetsSelector } from "./PresetsSelector";

export const InputSettings: React.FC = () => {
  const { inputMode } = usePreset();

  const showPresets =
    inputMode === InputMode.ChordPresets ||
    inputMode === InputMode.IntervalPresets;

  return (
    <div className="settings-container flex flex-row w-full h-full gap-loose">
      <div className="w-1/3 h-full flex items-center justify-center">
        <InputModeSelector />
      </div>
      <div className="presets-container w-2/3 h-full flex items-center justify-center">
        {showPresets && <PresetsSelector />}
      </div>
    </div>
  );
};
