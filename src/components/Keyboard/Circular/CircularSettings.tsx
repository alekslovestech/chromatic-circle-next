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
  if (isAdvanced) {
    return (
      <div id="keyboardcircular-settings" className={DEBUG_BORDER}>
        <div style={{ display: "flex", flexDirection: "row", gap: 15 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
            <div style={{ display: "flex", flexDirection: "row", gap: 15 }}>
              <MusicalKeySelector useDropdownSelector={true} />
              <TransposeWidget showKeyTranspose={true} />
            </div>
            <ScalePreviewToggle />
            <KeyTextModeSelect />
            <PlayScaleButton />
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
            <ChordNameDisplay />
            {/* <GlobalModeButton /> */}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div id="keyboardcircular-settings" className={DEBUG_BORDER}>
      <div style={{ display: "flex", flexDirection: "row", gap: 15 }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
          <CircularVisModeSelect />
          <div style={{ display: "flex", flexDirection: "row", gap: 15 }}>
            <MusicalKeySelector useDropdownSelector={false} />
            <TransposeWidget showKeyTranspose={false} />
          </div>
          <MonochromeModeToggle />
          <ClearButton />
          <ChordNameDisplay />
          {/* <GlobalModeButton /> */}
        </div>
      </div>
    </div>
  );
};
