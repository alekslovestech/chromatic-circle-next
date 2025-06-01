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

  return (
    <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8 min-h-screen bg-gray-600 flex items-center justify-center">
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
          <div className="w-full h-full flex items-center justify-center text-2xl">
            Staff Component
          </div>
        </div>

        <div
          className={COMMON_STYLES.circular}
          style={{ gridArea: "circular" }}
        >
          <div className="border-r border-white/30 p-2 h-full flex items-center justify-center text-2xl">
            Circular Keyboard
          </div>
          <div
            className="self-end mb-4 flex flex-col justify-end text-right max-w-[120px] p-2"
            style={{ gridArea: "sidebar" }}
          >
            <div className="w-full h-full flex items-center justify-center text-2xl break-words">
              Chord Display
            </div>
          </div>
        </div>

        <div className={COMMON_STYLES.linear} style={{ gridArea: "linear" }}>
          <div className="h-full flex items-center justify-center text-2xl">
            Linear Keyboard
          </div>
        </div>

        <div
          className={COMMON_STYLES.settings}
          style={{ gridArea: "settings" }}
        >
          <div className="max-h-[45px] rounded text-2xl text-center align-middle">
            Settings Component
          </div>
        </div>

        <div className="fixed bottom-4 right-4">
          <Link href="/advanced">
            <GlobalModeButton text="Switch to Scale Preview Mode" />
          </Link>
        </div>
      </div>
    </div>
  );
}
