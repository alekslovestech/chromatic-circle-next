"use client";
import React from "react";

import { usePreset } from "@/contexts/PresetContext";
import { InputMode } from "@/types/SettingModes";

import { InputModeSelector } from "./InputModeSelector";
import { PresetsSelector } from "./PresetsSelector";
import { LAYOUT_PATTERNS } from "@/lib/design/LayoutPatterns";

export const InputSettings: React.FC = () => {
  const { inputMode } = usePreset();

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
        {showPresets && <PresetsSelector />}
      </div>
    </div>
  );
};
