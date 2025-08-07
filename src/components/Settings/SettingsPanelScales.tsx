"use client";
import React from "react";
import { LAYOUT_PATTERNS } from "@/lib/design";
import { useBorder } from "@/lib/hooks/useBorder";
import { PlaybackModeSelect } from "./PlaybackModeSelect";
import { MusicalKeySelector } from "../MusicalKeySelector";
import { TransposeWidget } from "../TransposeWidget";
import { PlayScaleButton } from "../Buttons/PlayScaleButton";
import { PauseScaleButton } from "../Buttons/PauseScaleButton";

export const SettingsPanelScales = () => {
  const settingsGap = "gap-tight";
  const outerGapVertical = "gap-tight";
  const outerGapHorizontal = "gap-normal";
  const border = useBorder();

  return (
    <div
      id="settings-panel-scales"
      className={`flex flex-col ${outerGapVertical} ${border} ${LAYOUT_PATTERNS.fullSize}`}
    >
      <div className={`flex justify-between ${outerGapHorizontal} flex-1`}>
        {/* Left Column - Musical Context */}
        <div
          className={`${LAYOUT_PATTERNS.centerFlexCol} rounded p-2 flex-1 ${settingsGap} ${border}`}
        >
          <TransposeWidget target="key" />
          <MusicalKeySelector useDropdownSelector={true} />
          {/* currently disabled for simplicity */}
          {/*<NoteDisplayModeSelect />*/}
        </div>

        {/* Right Column - Playback Settings */}
        <div
          className={`${LAYOUT_PATTERNS.centerFlexCol} ${settingsGap} rounded p-2 flex-1 ${border}`}
        >
          <PlaybackModeSelect />
          <div
            className={`${LAYOUT_PATTERNS.centerFlexRowGap} max-w-xs self-center`}
          >
            <PlayScaleButton />
            <PauseScaleButton />
          </div>
        </div>
      </div>
    </div>
  );
};
