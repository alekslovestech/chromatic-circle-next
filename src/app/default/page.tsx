"use client";
import { COMMON_STYLES } from "@/lib/constants";
import {
  STAFF_HEIGHT_PX,
  GRID_COLUMNS,
  LAYOUT_CONSTRAINTS,
} from "@/lib/layout-constants";
import { useIsLandscape } from "@/lib/hooks/useIsLandscape";

import { GlobalModeButton } from "@/components/Buttons/GlobalModeButton";
import Link from "next/link";
import { ChordNameDisplay } from "@/components/ChordNameDisplay";
import StaffRenderer from "@/components/StaffRenderer";
import SettingsContainer from "@/components/Settings/SettingsContainer";

//NB using Styles instead of tailwind classes for grids
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
  //background: linear-gradient(135deg, #F7F8FA, #EAEFF3);
  return (
    <div className="DefaultPage-container mx-auto max-w-7xl px-4 md:px-6 lg:px-8 min-h-screen bg-[#F7F8FA] flex items-center justify-center">
      <div
        className="DefaultPage-grid grid p-2 gap-1 overflow-hidden border border-containers-border"
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
        {/*
        <div className={COMMON_STYLES.staff} style={{ gridArea: "staff" }}>
          <div className="w-full h-full flex items-center justify-center text-2xl">
            <StaffRenderer />
          </div>
        </div>
*/}
        <div
          className={`DefaultPage-keyboard-circular-container border border-containers-border ${COMMON_STYLES.circular}`}
          style={{ gridArea: "circular" }}
        >
          <div className="DefaultPage-keyboard-circular border border-containers-border p-2 h-full flex items-center justify-center text-2xl !text-labels-textDefault">
            Circular Keyboard
          </div>
          <div
            className="DefaultPage-chord-sidebar self-end mb-4 flex flex-col justify-end text-right max-w-[120px] p-2"
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
          <div className="DefaultPage-keyboard-linear h-full flex items-center justify-center text-2xl !text-labels-textDefault">
            Linear Keyboard
          </div>
        </div>

        <div
          className={`DefaultPage-settings-container ${COMMON_STYLES.settings}`}
          style={{ gridArea: "settings" }}
        >
          <div className="DefaultPage-settings-header max-h-[45px] rounded text-2xl text-center align-middle">
            <SettingsContainer />
          </div>
        </div>

        <div className="DefaultPage-global-mode-switch fixed bottom-4 right-4">
          <Link href="/advanced">
            <GlobalModeButton text="Switch to Scale Preview Mode" />
          </Link>
        </div>
      </div>
    </div>
  );
}
