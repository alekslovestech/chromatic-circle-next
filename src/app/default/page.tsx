"use client";
import Link from "next/link";
import { STAFF_HEIGHT_PX } from "@/lib/constants";
import { useIsLandscape } from "@/lib/hooks/useIsLandscape";

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
  const gridAreas = isLandscape ? gridAreasLandscape : gridAreasPortrait;
  const gridRows = isLandscape ? gridRowsLandscape : gridRowsPortrait;

  return (
    <div className="min-h-screen bg-gray-500">
      {/* Grid Container - Default Mode */}
      <div
        className={`grid h-screen p-2 gap-1 overflow-hidden`}
        style={{
          gridTemplateRows: gridRows,
          gridTemplateAreas: gridAreas,
        }}
      >
        <div
          className="flex justify-center items-center px-5 border border-white/30 rounded"
          style={{ gridArea: "staff" }}
        >
          <div className="w-full text-2xl text-center">Staff Component</div>
        </div>

        <div
          className="grid grid-areas-[circular-keyboard_sidebar] grid-cols-[200px_1fr] p-2 overflow-hidden max-h-full border border-white/30 rounded"
          style={{ gridArea: "circular" }}
        >
          <div className="border-r border-white/30 p-2 text-2xl text-center">
            Circular Keyboard
          </div>
          <div
            className="self-end mb-4 flex flex-col justify-end text-right max-w-[120px] p-2"
            style={{ gridArea: "sidebar" }}
          >
            <div className="w-full break-words text-2xl text-center">
              Chord Display
            </div>
          </div>
        </div>

        <div
          className="grid-area-linear w-full h-full flex items-center justify-center overflow-hidden border border-white/30 rounded"
          style={{ gridArea: "linear" }}
        >
          <div className="text-2xl text-center">Linear Keyboard</div>
        </div>

        <div className="grid-area-settings flex gap-4 overflow-hidden p-4 h-full min-h-0 box-border border border-white/30 rounded">
          <div className="max-h-[45px] rounded text-2xl text-center">
            Settings Component
          </div>
        </div>

        <div className="fixed bottom-4 right-4">
          <Link
            href="/advanced"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-purple-600 bg-white hover:bg-gray-50 transition-colors"
          >
            Switch to Advanced View
          </Link>
        </div>
      </div>
    </div>
  );
}
