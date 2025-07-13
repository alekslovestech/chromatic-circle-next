"use client";
import React from "react";
import { DEBUG_BORDER, LAYOUT_PATTERNS } from "@/lib/design";
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
      className={`flex justify-between ${outerGapVertical} ${outerGapHorizontal} ${DEBUG_BORDER} ${LAYOUT_PATTERNS.fullSize}`}
    >
      {/* Left Column - Musical Context */}
      <div
        className={`flex flex-col rounded p-2 flex-1 ${settingsGap} ${DEBUG_BORDER}`}
      >
        <TransposeWidget target="key" />
        <MusicalKeySelector useDropdownSelector={true} />
        {/* currently disabled for simplicity */}
        {/*<NoteDisplayModeSelect />*/}
      </div>

      {/* Right Column - Playback Settings */}
      <div
        className={`flex flex-col ${settingsGap} rounded p-2 flex-1 ${DEBUG_BORDER}`}
      >
        <PlaybackModeSelect />
        <div className="max-w-xs self-center">
          <PlayScaleButton />
        </div>
      </div>
    </div>
  );
};
