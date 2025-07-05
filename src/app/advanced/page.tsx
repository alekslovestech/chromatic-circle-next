"use client";
import Link from "next/link";

import { COMMON_STYLES } from "@/lib/design";
import { usePageLayout } from "@/lib/hooks/usePageLayout";

import { GlobalModeButton } from "@/components/Buttons/GlobalModeButton";
import { StaffRenderer } from "@/components/StaffRenderer";
import { KeyboardLinear } from "@/components/Keyboard/Linear/KeyboardLinear";
import { KeyboardCircular } from "@/components/Keyboard/Circular/KeyboardCircular";
import { CircularSettings } from "@/components/Settings/CircularSettings";

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
        <StaffRenderer style={{ gridArea: "staff" }} />
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
          <CircularSettings />
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
