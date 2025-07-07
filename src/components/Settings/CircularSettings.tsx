"use client";
import React from "react";

import { useGlobalMode, GlobalMode } from "@/lib/hooks";

// Components
import { MusicalKeySelector } from "@/components/MusicalKeySelector";
import { TransposeWidget } from "@/components/TransposeWidget";
import { MonochromeModeToggle } from "@/components/Settings/MonochromeModeToggle";
import { ClearButton } from "@/components/Buttons/ClearButton";
import { KeyTextModeSelect } from "@/components/Settings/NoteDisplayModeSelect";
import { ScalePreviewToggle } from "@/components/Settings/ScalePreviewToggle";
import { PlayScaleButton } from "@/components/Buttons/PlayScaleButton";

import { CircularVisModeSelect } from "../Keyboard/Circular/CircularVisModeSelect";
import { DEBUG_BORDER } from "@/lib/design";

export const CircularSettings = () => {
  const globalMode = useGlobalMode();
  const isAdvanced = globalMode === GlobalMode.Advanced;
  const outerGapVertical = "gap-tight";
  const outerGapHorizontal = "gap-normal";
  const settingsGap = "gap-tight";
  if (isAdvanced) {
    return (
      <div
        id="keyboardcircular-settings"
        className={`${DEBUG_BORDER} flex ${outerGapVertical} ${outerGapHorizontal}`}
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

        <div className={`flex flex-col ${settingsGap}`}></div>
      </div>
    );
  }

  return (
    <div
      id="keyboardcircular-settings"
      className={`${DEBUG_BORDER} flex flex-col ${settingsGap}`}
    >
      <CircularVisModeSelect />
      <div className={`key-selector-and-transpose flex ${settingsGap}`}>
        <MusicalKeySelector useDropdownSelector={false} />
        <TransposeWidget target="notes" />
      </div>
      <MonochromeModeToggle />
      <ClearButton />
    </div>
  );
};
