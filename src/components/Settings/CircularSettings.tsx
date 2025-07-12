"use client";
import React from "react";

import { useGlobalMode, GlobalMode } from "@/lib/hooks";
import { DEBUG_BORDER } from "@/lib/design";

// Components
import { MusicalKeySelector } from "@/components/MusicalKeySelector";
import { TransposeWidget } from "@/components/TransposeWidget";
import { ClearButton } from "@/components/Buttons/ClearButton";
import { KeyTextModeSelect } from "@/components/Settings/NoteDisplayModeSelect";
import { PlayScaleButton } from "@/components/Buttons/PlayScaleButton";

import { CircularVisModeSelect } from "../Keyboard/Circular/CircularVisModeSelect";

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
        className={`flex ${outerGapVertical} ${outerGapHorizontal} ${DEBUG_BORDER} `}
      >
        <div className={`flex flex-col ${settingsGap}`}>
          <div className={`flex ${settingsGap}`}>
            <MusicalKeySelector useDropdownSelector={true} />
            <TransposeWidget target="key" />
          </div>
          {/*<ScalePreviewToggle />*/}
          <KeyTextModeSelect />
          <div className="max-w-xs self-center">
            <PlayScaleButton />
          </div>
        </div>

        <div className={`flex flex-col ${settingsGap}`}></div>
      </div>
    );
  }

  return (
    <div
      id="keyboardcircular-settings"
      className={`flex flex-col ${settingsGap} ${DEBUG_BORDER}`}
    >
      <CircularVisModeSelect />
      <div className={`key-selector-and-transpose flex ${settingsGap}`}>
        <MusicalKeySelector useDropdownSelector={false} />
        <TransposeWidget target="notes" />
      </div>
      {/*<MonochromeModeToggle />*/}
      <div className="max-w-xs self-center">
        <ClearButton />
      </div>
    </div>
  );
};
