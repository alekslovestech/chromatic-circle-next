"use client";

import Link from "next/link";

const STAFF_HEIGHT = 100;
export default function AdvancedPage() {
  const gridRows = `${STAFF_HEIGHT}px_1fr_1fr_1fr`;
  const gridAreas = `
                      'staff_staff'
                      'sidebar_sidebar'
                      'circular_circular'                      
                      'linear_linear'`;
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-600 to-blue-500">
      {/* Grid Container - Advanced Mode */}
      <div
        className={`grid lg:grid-cols-4 h-screen p-2 gap-1 overflow-hidden
                    grid-rows-[${gridRows}] lg:grid-rows-[1fr_1fr_1fr]
                    [grid-template-areas:${gridAreas}]`}
      >
        {/* Staff Area */}
        <div className="grid-area-staff flex justify-center items-center px-5 border border-white/30 rounded">
          <div className="w-full">Staff Component</div>
        </div>

        {/* Circular Keyboard Area */}
        <div className="grid-area-circular grid grid-areas-[circular-keyboard] p-2 overflow-hidden max-h-full border border-white/30 rounded">
          <div className="grid-area-circular-keyboard p-2">
            Circular Keyboard
          </div>
        </div>

        {/* Linear Keyboard Area */}
        <div className="grid-area-linear w-full h-full flex items-center justify-center overflow-hidden border border-white/30 rounded">
          Linear Keyboard
        </div>

        {/* Sidebar Area */}
        <div className="grid-area-sidebar flex gap-4 overflow-hidden p-4 h-full min-h-0 box-border border border-white/30 rounded">
          <div className="max-h-[45px] rounded">Sidebar Component</div>
        </div>

        {/* Navigation Button */}
        <div className="fixed bottom-4 right-4">
          <Link
            href="/"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-purple-600 bg-white hover:bg-gray-50 transition-colors"
          >
            Switch to Default View
          </Link>
        </div>
      </div>
    </div>
  );
}
