"use client";
import React from "react";

import { usePreset } from "@/contexts/PresetContext";
import { InputMode } from "@/types/SettingModes";

import { InputModeSelector } from "./InputModeSelector";
import { PresetsSelector } from "./PresetsSelector";

const SettingsContainer: React.FC = () => {
  const { inputMode } = usePreset();

  const showPresets =
    inputMode === InputMode.ChordPresets ||
    inputMode === InputMode.IntervalPresets;

  return (
    <div className="settings-container">
      <InputModeSelector />
      {showPresets && <PresetsSelector />}
    </div>
  );
};

export default SettingsContainer;
