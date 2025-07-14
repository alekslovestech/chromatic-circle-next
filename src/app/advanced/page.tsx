"use client";
import Link from "next/link";

import { COMMON_STYLES, NOTATION_LAYOUT } from "@/lib/design";
import { usePageLayout } from "@/lib/hooks/usePageLayout";

import { GlobalModeButton } from "@/components/Buttons/GlobalModeButton";
import { StaffRenderer } from "@/components/StaffRenderer";
import { KeyboardLinear } from "@/components/Keyboard/Linear/KeyboardLinear";
import { KeyboardCircular } from "@/components/Keyboard/Circular/KeyboardCircular";
import { SettingsPanelAdvanced } from "@/components/Settings/SettingsPanelAdvanced";
import { ChordNameDisplay } from "@/components/ChordNameDisplay";

export default function AdvancedPage() {
  const { gridRows, gridAreas, gridColumns } = usePageLayout();

  return (
    <div
      className={`AdvancedPage-container ${COMMON_STYLES.pageContainer} bg-canvas-bgAdvanced`}
    >
      <div
        className={`AdvancedPage-grid ${COMMON_STYLES.pageGrid}`}
        //NB using Styles instead of tailwind classes for grid areas
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
          className={`AdvancedPage-circular ${COMMON_STYLES.circularContainer}`}
          style={{ gridArea: "circular" }}
        >
          <div
            className={`AdvancedPage-circular-inner ${COMMON_STYLES.circularInner}`}
          >
            <KeyboardCircular />
          </div>
        </div>

        <div
          className={`AdvancedPage-linear-container ${COMMON_STYLES.linearContainer}`}
          style={{ gridArea: "linear" }}
        >
          <div
            className={`AdvancedPage-linear-inner ${COMMON_STYLES.linearInner}`}
          >
            <KeyboardLinear />
          </div>
        </div>

        <div
          className={`AdvancedPage-settings-container ${COMMON_STYLES.settingsPanel}`}
          style={{ gridArea: "sidebar" }}
        >
          <SettingsPanelAdvanced />
        </div>

        <div className="AdvancedPage-global-mode-switch fixed bottom-normal right-normal">
          <Link href="/default">
            <GlobalModeButton text="Switch to Basic Mode" />
          </Link>
        </div>
      </div>
    </div>
  );
}
