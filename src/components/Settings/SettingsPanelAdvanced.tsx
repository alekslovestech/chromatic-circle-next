"use client";
import React from "react";
import Link from "next/link";
import { DEBUG_BORDER, LAYOUT_PATTERNS } from "@/lib/design";
import { PlaybackModeSelect } from "./PlaybackModeSelect";
import { MusicalKeySelector } from "../MusicalKeySelector";
import { TransposeWidget } from "../TransposeWidget";
import { PlayScaleButton } from "../Buttons/PlayScaleButton";
import { GlobalModeButton } from "../Buttons/GlobalModeButton";

export const SettingsPanelAdvanced = () => {
  const settingsGap = "gap-tight";
  const outerGapVertical = "gap-tight";
  const outerGapHorizontal = "gap-normal";

  return (
    <div
      id="settings-panel-advanced"
      className={`flex flex-col ${outerGapVertical} ${DEBUG_BORDER} ${LAYOUT_PATTERNS.fullSize}`}
    >
      <div className={`flex justify-between ${outerGapHorizontal} flex-1`}>
        {/* Left Column - Musical Context */}
        <div
          className={`${LAYOUT_PATTERNS.centerFlexCol} rounded p-2 flex-1 ${settingsGap} ${DEBUG_BORDER}`}
        >
          <TransposeWidget target="key" />
          <MusicalKeySelector useDropdownSelector={true} />
          {/* currently disabled for simplicity */}
          {/*<NoteDisplayModeSelect />*/}
        </div>

        {/* Right Column - Playback Settings */}
        <div
          className={`${LAYOUT_PATTERNS.centerFlexCol} ${settingsGap} rounded p-2 flex-1 ${DEBUG_BORDER}`}
        >
          <PlaybackModeSelect />
          <div className="max-w-xs self-center">
            <PlayScaleButton />
          </div>
        </div>
      </div>

      {/* Mode switch at bottom */}
      <div className="mt-tight pt-tight border-t border-gray-300 text-center">
        <Link href="/default">
          <GlobalModeButton text="Basic Mode" />
        </Link>
      </div>
    </div>
  );
};
