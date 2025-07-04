"use client";
import Link from "next/link";

import { COMMON_STYLES, DEBUG_BORDER } from "@/lib/constants";
import { STAFF_HEIGHT_PX, GRID_COLUMNS } from "@/lib/layout-constants";
import { useIsLandscape } from "@/lib/hooks/useIsLandscape";

import { GlobalModeButton } from "@/components/Buttons/GlobalModeButton";
import { StaffRenderer } from "@/components/StaffRenderer";
import { KeyboardLinear } from "@/components/Keyboard/Linear/KeyboardLinear";
import { KeyboardCircular } from "@/components/Keyboard/Circular/KeyboardCircular";
import { CircularSettings } from "@/components/Keyboard/Circular/CircularSettings";

export default function AdvancedPage() {
  const isLandscape = useIsLandscape();
  const gridRowsPortrait = `${STAFF_HEIGHT_PX} 1fr 2fr 1fr`;
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
    <div className="AdvancedPage-container h-full w-full bg-canvas-bgAdvanced flex flex-col px-snug md:px-loose lg:px-spacious">
      <div
        className={`AdvancedPage-grid grid p-2 gap-tight overflow-hidden flex-1 ${DEBUG_BORDER}`}
        style={{
          gridTemplateColumns: gridCols,
          gridTemplateRows: gridRows,
          gridTemplateAreas: gridAreas,
          width: "100%",
        }}
      >
        <StaffRenderer style={{ gridArea: "staff" }} />

        <div
          className={`AdvancedPage-keyboard-circular-container ${COMMON_STYLES.circular}`}
          style={{ gridArea: "circular" }}
        >
          <div className="AdvancedPage-keyboard-circular p-2 h-full flex items-center justify-center text-2xl !text-labels-textDefault">
            <KeyboardCircular />
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
          <CircularSettings />
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
