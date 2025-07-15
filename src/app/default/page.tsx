"use client";

import { COMMON_STYLES, NOTATION_LAYOUT } from "@/lib/design";
import { usePageLayout } from "@/lib/hooks/usePageLayout";

import { ChordNameDisplay } from "@/components/ChordNameDisplay";
import { StaffRenderer } from "@/components/StaffRenderer";
import { InputSettings } from "@/components/Settings/InputSettings";
import { SettingsPanelDefault } from "@/components/Settings/SettingsPanelDefault";
import { KeyboardLinear } from "@/components/Keyboard/Linear/KeyboardLinear";
import { KeyboardCircular } from "@/components/Keyboard/Circular/KeyboardCircular";

export default function Home() {
  const { gridRows, gridAreas, gridColumns } = usePageLayout();

  return (
    <div
      className={`DefaultPage-container ${COMMON_STYLES.pageContainer} bg-canvas-bgDefault`}
    >
      <div
        className={`DefaultPage-grid ${COMMON_STYLES.pageGrid}`}
        style={{
          gridTemplateColumns: gridColumns,
          gridTemplateRows: gridRows,
          gridTemplateAreas: gridAreas,
          width: "100%",
        }}
      >
        <div
          className="grid"
          style={{
            gridArea: "staff",
            ...NOTATION_LAYOUT,
          }}
        >
          <StaffRenderer />
          <ChordNameDisplay />
        </div>

        <div
          className={`DefaultPage-circular-container ${COMMON_STYLES.circularContainer}`}
          style={{ gridArea: "circular" }}
        >
          <div
            className={`DefaultPage-circular-inner ${COMMON_STYLES.circularInner}`}
          >
            <KeyboardCircular />
            <div className="flex-1">
              <SettingsPanelDefault />
            </div>
          </div>
          <div
            className="DefaultPage-chord-sidebar self-end mb-normal flex flex-col justify-end text-right max-w-[120px] p-2"
            style={{ gridArea: "sidebar" }}
          >
            <div className="DefaultPage-chord-display w-full h-full flex items-center justify-center text-2xl break-words">
              <ChordNameDisplay />
            </div>
          </div>
        </div>

        <div
          className={`DefaultPage-linear-container ${COMMON_STYLES.linearContainer}`}
          style={{ gridArea: "linear" }}
        >
          <div
            className={`DefaultPage-linear-inner ${COMMON_STYLES.linearInner}`}
          >
            <KeyboardLinear />
          </div>
        </div>

        <div
          className={`DefaultPage-settings-container ${COMMON_STYLES.settingsPanel}`}
          style={{ gridArea: "settings" }}
        >
          <InputSettings />
        </div>
      </div>
    </div>
  );
}
