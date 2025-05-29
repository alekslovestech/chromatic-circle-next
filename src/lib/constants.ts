export const STAFF_HEIGHT_PX = "100px";

export const COMMON_STYLES = {
  staff: "flex justify-center items-center px-5 border border-white/30 rounded",
  circular:
    "grid grid-areas-[circular-keyboard_sidebar] grid-cols-[200px_1fr] p-2 overflow-hidden max-h-full border border-white/30 rounded",
  linear:
    "w-full h-full flex items-center justify-center overflow-hidden border border-white/30 rounded",
  settings:
    "flex gap-4 overflow-hidden p-4 h-full min-h-0 box-border border border-white/30 rounded",
} as const;
