"use client";
import React from "react";
import { DEBUG_BORDER } from "@/lib/design";
import { NoteDisplayModeSelect } from "./NoteDisplayModeSelect";
import { PlaybackModeSelect } from "./PlaybackModeSelect";
import { MusicalKeySelector } from "../MusicalKeySelector";
import { TransposeWidget } from "../TransposeWidget";
import { PlayScaleButton } from "../Buttons/PlayScaleButton";

export const CircularSettingsAdvanced = () => {
  const settingsGap = "gap-tight";
  const outerGapVertical = "gap-tight";
  const outerGapHorizontal = "gap-normal";

  return (
    <div
      id="circular-settings-advanced"
      className={`flex ${outerGapVertical} ${outerGapHorizontal} ${DEBUG_BORDER}`}
    >
      {/* Left Column - Musical Context */}
      <div className={`flex flex-col ${settingsGap} border rounded p-2`}>
        <div className={`flex ${settingsGap}`}>
          <MusicalKeySelector useDropdownSelector={true} />
          <TransposeWidget target="key" />
        </div>
        {/*<NoteDisplayModeSelect />*/}
      </div>

      {/* Right Column - Playback Settings */}
      <div className={`flex flex-col ${settingsGap} border rounded p-2`}>
        <PlaybackModeSelect />
        <div className="max-w-xs self-center">
          <PlayScaleButton />
        </div>
      </div>
    </div>
  );
};
