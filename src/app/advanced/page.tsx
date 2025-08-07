"use client";

import { COMMON_STYLES, NOTATION_LAYOUT } from "@/lib/design";
import { usePageLayout } from "@/lib/hooks/usePageLayout";
import { useBorder } from "@/lib/hooks/useBorder";

import { StaffRenderer } from "@/components/StaffRenderer";
import { KeyboardLinear } from "@/components/Keyboard/Linear/KeyboardLinear";
import { KeyboardCircular } from "@/components/Keyboard/Circular/KeyboardCircular";
import { SettingsPanelAdvanced } from "@/components/Settings/SettingsPanelAdvanced";
import { ChordNameDisplay } from "@/components/ChordNameDisplay";
import Link from "next/link";
import { GlobalModeButton } from "@/components/Buttons/GlobalModeButton";

export default function AdvancedPage() {
  const { gridRows, gridAreas, gridColumns } = usePageLayout();
  const border = useBorder();

  return (
    <div
      className={`AdvancedPage-container ${COMMON_STYLES.pageContainer} bg-canvas-bgAdvanced ${border}`}
    >
      <div
        className={`AdvancedPage-grid ${COMMON_STYLES.pageGrid} ${border}`}
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
          className={`AdvancedPage-circular ${COMMON_STYLES.circularContainer} ${border}`}
          style={{ gridArea: "circular" }}
        >
          {/* Add GlobalModeButton positioned in top-left corner */}
          <div className="absolute top-2 left-2 z-10">
            <Link href="/default">
              <GlobalModeButton text="Basic Mode" />
            </Link>
          </div>

          <div
            className={`AdvancedPage-circular-inner ${COMMON_STYLES.circularInner} ${border}`}
          >
            <KeyboardCircular />
          </div>
        </div>

        <div
          className={`AdvancedPage-linear-container ${COMMON_STYLES.linearContainer} ${border}`}
          style={{ gridArea: "linear" }}
        >
          <div
            className={`AdvancedPage-linear-inner ${COMMON_STYLES.linearInner} ${border}`}
          >
            <KeyboardLinear />
          </div>
        </div>

        <div
          className={`AdvancedPage-settings-container ${COMMON_STYLES.settingsPanel} ${border}`}
          style={{ gridArea: "sidebar" }}
        >
          <SettingsPanelAdvanced />
        </div>
      </div>
    </div>
  );
}
