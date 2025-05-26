"use client";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 to-pink-500">
      {/* Grid Container - Default Mode */}
      <div
        className="grid grid-cols-2 lg:grid-cols-4 h-screen p-2 gap-1 overflow-hidden
                    grid-rows-[100px_minmax(230px,3fr)_3fr_2fr] lg:grid-rows-[100px_1fr_1fr]
                    grid-areas-[staff_staff_staff_staff]
                              [circular_circular_settings_settings]
                              [linear_linear_settings_settings]"
      >
        {/* Staff Area */}
        <div className="grid-area-staff flex justify-center items-center px-5 border border-white/30 rounded">
          <div className="w-full">Staff Component</div>
        </div>

        {/* Circular Keyboard Area */}
        <div className="grid-area-circular grid grid-areas-[circular-keyboard_sidebar] grid-cols-[200px_1fr] p-2 overflow-hidden max-h-full border border-white/30 rounded">
          <div className="grid-area-circular-keyboard border-r border-white/30 p-2">
            Circular Keyboard
          </div>
          <div className="grid-area-sidebar self-end mb-4 flex flex-col justify-end text-right max-w-[120px] p-2">
            <div className="w-full break-words">Chord Display</div>
          </div>
        </div>

        {/* Linear Keyboard Area */}
        <div className="grid-area-linear w-full h-full flex items-center justify-center overflow-hidden border border-white/30 rounded">
          Linear Keyboard
        </div>

        {/* Settings Area */}
        <div className="grid-area-settings flex gap-4 overflow-hidden p-4 h-full min-h-0 box-border border border-white/30 rounded">
          <div className="max-h-[45px] rounded">Settings Component</div>
        </div>

        {/* Navigation Button */}
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
