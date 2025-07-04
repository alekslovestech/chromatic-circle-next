"use client";
import React from "react";

import { useGlobalMode, GlobalMode } from "@/lib/hooks";

// Components
import { MusicalKeySelector } from "@/components/MusicalKeySelector";
import { TransposeWidget } from "@/components/TransposeWidget";
import { ChordNameDisplay } from "@/components/ChordNameDisplay";
import { MonochromeModeToggle } from "@/components/Settings/MonochromeModeToggle";
import { ClearButton } from "@/components/Buttons/ClearButton";
import { KeyTextModeSelect } from "@/components/Settings/NoteDisplayModeSelect";
import { ScalePreviewToggle } from "@/components/Settings/ScalePreviewToggle";
import { PlayScaleButton } from "@/components/Buttons/PlayScaleButton";

import { CircularVisModeSelect } from "./CircularVisModeSelect";
import { DEBUG_BORDER } from "@/lib/constants";

export const CircularSettings = () => {
  const globalMode = useGlobalMode();
  const isAdvanced = globalMode === GlobalMode.Advanced;
  console.log(`CircularSettings: isAdvanced=${isAdvanced}`);
  const settingsGap = "gap-tight";
  if (isAdvanced) {
    return (
      <div
        id="keyboardcircular-settings"
        className={`${DEBUG_BORDER} flex ${settingsGap}`}
      >
        <div className={`flex flex-col ${settingsGap}`}>
          <div className={`flex ${settingsGap}`}>
            <MusicalKeySelector useDropdownSelector={true} />
            <TransposeWidget target="key" />
          </div>
          <ScalePreviewToggle />
          <KeyTextModeSelect />
          <PlayScaleButton />
        </div>

        <div className={`flex flex-col ${settingsGap}`}>
          <ChordNameDisplay />
          {/* <GlobalModeButton /> */}
        </div>
      </div>
    );
  }

  return (
    <div
      id="keyboardcircular-settings"
      className={`${DEBUG_BORDER} flex flex-col ${settingsGap}`}
    >
      <CircularVisModeSelect />
      <div className={`flex ${settingsGap}`}>
        <MusicalKeySelector useDropdownSelector={false} />
        <TransposeWidget target="notes" />
      </div>
      <MonochromeModeToggle />
      <ClearButton />
      <ChordNameDisplay />
      {/* <GlobalModeButton /> */}
    </div>
  );
};
