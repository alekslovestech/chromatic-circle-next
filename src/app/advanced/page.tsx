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
    <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8 min-h-screen bg-gray-500 flex items-center justify-center">
      <div
        className="grid p-2 gap-1 overflow-hidden"
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
        <div className={COMMON_STYLES.staff} style={{ gridArea: "staff" }}>
          <div className="w-full text-2xl text-center">
            <StaffRenderer />
          </div>
        </div>

        <div
          className={COMMON_STYLES.circular}
          style={{ gridArea: "circular" }}
        >
          <div className="p-2 text-2xl text-center">Circular Keyboard</div>
        </div>

        <div className={COMMON_STYLES.linear} style={{ gridArea: "linear" }}>
          <div className="text-2xl text-center">Linear Keyboard</div>
        </div>

        <div className={COMMON_STYLES.settings} style={{ gridArea: "sidebar" }}>
          <div className="max-h-[45px] rounded text-2xl text-center">
            <SettingsContainer />
          </div>
        </div>

        <div className="fixed bottom-4 right-4">
          <Link href="/default">
            <GlobalModeButton text="Switch to Basic Mode" />
          </Link>
        </div>
      </div>
    </div>
  );
}
