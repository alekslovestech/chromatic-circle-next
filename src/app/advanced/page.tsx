"use client";

import { STAFF_HEIGHT_PX } from "@/lib/constants";
import Link from "next/link";
import { useIsLandscape } from "@/lib/hooks/useIsLandscape";

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
  const gridRows = isLandscape ? gridRowsLandscape : gridRowsPortrait;
  const gridAreas = isLandscape ? gridAreasLandscape : gridAreasPortrait;
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-600 to-blue-500">
      <div
        className={`grid lg:grid-cols-4 h-screen p-2 gap-1 overflow-hidden`}
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
          className="grid grid-areas-[circular-keyboard] p-2 overflow-hidden max-h-full border border-white/30 rounded"
          style={{ gridArea: "circular" }}
        >
          <div className="p-2 text-2xl text-center">Circular Keyboard</div>
        </div>

        <div
          className="w-full h-full flex items-center justify-center overflow-hidden border border-white/30 rounded"
          style={{ gridArea: "linear" }}
        >
          <div className="text-2xl text-center">Linear Keyboard</div>
        </div>

        <div
          className="flex gap-4 overflow-hidden p-4 h-full min-h-0 box-border border border-white/30 rounded"
          style={{ gridArea: "sidebar" }}
        >
          <div className="max-h-[45px] rounded text-2xl text-center">
            Sidebar Component
          </div>
        </div>

        <div className="fixed bottom-4 right-4">
          <Link
            href="/default"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-purple-600 bg-white hover:bg-gray-50 transition-colors"
          >
            Switch to Default View
          </Link>
        </div>
      </div>
    </div>
  );
}
