"use client";
import Link from "next/link";

import { COMMON_STYLES, DEBUG_BORDER } from "@/lib/constants";
import {
  STAFF_HEIGHT_PX,
  GRID_COLUMNS,
  LAYOUT_CONSTRAINTS,
} from "@/lib/layout-constants";
import { useIsLandscape } from "@/lib/hooks/useIsLandscape";

import { GlobalModeButton } from "@/components/Buttons/GlobalModeButton";
import { ChordNameDisplay } from "@/components/ChordNameDisplay";
import StaffRenderer from "@/components/StaffRenderer";
import SettingsContainer from "@/components/Settings/SettingsContainer";
import { KeyboardLinear } from "@/components/Keyboard/Linear/KeyboardLinear";

//NB using Styles instead of tailwind classes for grid areas
export default function Home() {
  const isLandscape = useIsLandscape();
  const gridRowsPortrait = `${STAFF_HEIGHT_PX} minmax(230px, 3fr) 3fr 2fr`;
  const gridAreasPortrait = ` 'staff staff' 
                              'settings settings'
                              'circular circular'
                              'linear linear'`;

  const gridRowsLandscape = `${STAFF_HEIGHT_PX} 1fr 1fr`;
  const gridAreasLandscape = `'circular circular staff staff'
                              'circular circular settings settings'
                              'linear linear settings settings'`;
  const gridCols = isLandscape ? GRID_COLUMNS.landscape : GRID_COLUMNS.portrait;
  const gridAreas = isLandscape ? gridAreasLandscape : gridAreasPortrait;
  const gridRows = isLandscape ? gridRowsLandscape : gridRowsPortrait;
  return (
    <div className="DefaultPage-container mx-auto max-w-7xl px-normal md:px-loose lg:px-spacious min-h-screen bg-canvas-bgDefault flex items-center justify-center">
      <div
        className={`DefaultPage-grid grid p-2 gap-tight overflow-hidden ${DEBUG_BORDER}`}
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
          className={`DefaultPage-keyboard-circular-container ${COMMON_STYLES.circular} ${DEBUG_BORDER}`}
          style={{ gridArea: "circular" }}
        >
          <div className="DefaultPage-keyboard-circular p-2 h-full flex items-center justify-center text-2xl !text-labels-textDefault">
            Circular Keyboard
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
          className={`DefaultPage-keyboard-linear-container ${COMMON_STYLES.linear}`}
          style={{ gridArea: "linear" }}
        >
          <div className="DefaultPage-keyboard-linear w-full h-full text-2xl">
            <KeyboardLinear />
          </div>
        </div>

        <div
          className={`DefaultPage-settings-container ${COMMON_STYLES.settings}`}
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
