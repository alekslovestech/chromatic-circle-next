"use client";
import Link from "next/link";

import { COMMON_STYLES } from "@/lib/design";
import { usePageLayout } from "@/lib/hooks/usePageLayout";

import { GlobalModeButton } from "@/components/Buttons/GlobalModeButton";
import { ChordNameDisplay } from "@/components/ChordNameDisplay";
import { StaffRenderer } from "@/components/StaffRenderer";
import { SettingsContainer } from "@/components/Settings/SettingsContainer";
import { KeyboardLinear } from "@/components/Keyboard/Linear/KeyboardLinear";
import { KeyboardCircular } from "@/components/Keyboard/Circular/KeyboardCircular";
import { CircularSettings } from "@/components/Settings/CircularSettings";

export default function Home() {
  const { gridRows, gridAreas, gridColumns } = usePageLayout();

  return (
    <div
      className={`DefaultPage-container ${COMMON_STYLES.pageContainer} bg-canvas-bgDefault`}
    >
      <div
        className={`DefaultPage-grid ${COMMON_STYLES.pageGrid}`}
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
          className={`DefaultPage-circular-container ${COMMON_STYLES.circularContainer}`}
          style={{ gridArea: "circular" }}
        >
          <div
            className={`DefaultPage-circular-inner ${COMMON_STYLES.circularInner}`}
          >
            <KeyboardCircular />
            <div className="flex-1">
              <CircularSettings />
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
          <SettingsContainer />
        </div>

        <div className="DefaultPage-global-mode-switch fixed bottom-normal right-normal">
          <Link href="/advanced">
            <GlobalModeButton text="Switch to Scale Preview Mode" />
          </Link>
        </div>
      </div>
    </div>
  );
}
