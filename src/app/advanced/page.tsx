"use client";

import { COMMON_STYLES } from "@/lib/constants";
import {
  STAFF_HEIGHT_PX,
  GRID_COLUMNS,
  LAYOUT_CONSTRAINTS,
} from "@/lib/layout-constants";
import Link from "next/link";
import { useIsLandscape } from "@/lib/hooks/useIsLandscape";
import { GlobalModeButton } from "@/components/Buttons/GlobalModeButton";
import StaffRenderer from "@/components/StaffRenderer";
import SettingsContainer from "@/components/Settings/SettingsContainer";
import { KeyboardLinear } from "@/components/Keyboard/Linear/KeyboardLinear";

export default function AdvancedPage() {
  const isLandscape = useIsLandscape();
  const gridRowsPortrait = `${STAFF_HEIGHT_PX} 0.55fr 1fr 1fr`;
  const gridAreasPortrait = ` 'staff staff'
                              'sidebar sidebar'
                              'circular circular'                      
                              'linear linear'`;
  const gridRowsLandscape = `${STAFF_HEIGHT_PX} 1fr 1fr`;
  const gridAreasLandscape = `'circular circular staff staff'
                              'circular circular sidebar sidebar'
                              'circular circular linear linear'
                              'circular circular linear linear'`;

  const gridCols = isLandscape ? GRID_COLUMNS.landscape : GRID_COLUMNS.portrait;
  const gridRows = isLandscape ? gridRowsLandscape : gridRowsPortrait;
  const gridAreas = isLandscape ? gridAreasLandscape : gridAreasPortrait;
  return (
    <div className="AdvancedPage-container mx-auto max-w-7xl px-normal md:px-loose lg:px-spacious min-h-screen bg-canvas-bgAdvanced flex items-center justify-center">
      <div
        className="AdvancedPage-grid grid p-2 gap-tight overflow-hidden"
        style={{
          gridTemplateColumns: gridCols,
          gridTemplateRows: gridRows,
          gridTemplateAreas: gridAreas,
          maxWidth: LAYOUT_CONSTRAINTS.maxWidth,
          maxHeight: LAYOUT_CONSTRAINTS.maxHeight,
          width: "100%",
          height: "100vh",
        }}
      >
        <StaffRenderer style={{ gridArea: "staff" }} />

        <div
          className={`AdvancedPage-keyboard-circular-container ${COMMON_STYLES.circular}`}
          style={{ gridArea: "circular" }}
        >
          <div className="AdvancedPage-keyboard-circular p-2 text-2xl text-center">
            Circular Keyboard
          </div>
        </div>

        <div
          className={`AdvancedPage-keyboard-linear-container ${COMMON_STYLES.linear}`}
          style={{ gridArea: "linear" }}
        >
          <div className="AdvancedPage-keyboard-linear w-full h-full text-2xl">
            <KeyboardLinear />
          </div>
        </div>

        <div
          className={`AdvancedPage-settings-container ${COMMON_STYLES.settings}`}
          style={{ gridArea: "sidebar" }}
        >
          <SettingsContainer />
        </div>

        <div className="AdvancedPage-global-mode-switch fixed bottom-4 right-4">
          <Link href="/default">
            <GlobalModeButton text="Switch to Basic Mode" />
          </Link>
        </div>
      </div>
    </div>
  );
}
