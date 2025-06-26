export const DEBUG_BORDER = "border border-containers-borderDebug";

export const COMMON_STYLES = {
  staff: `flex justify-center items-center px-5 rounded ${DEBUG_BORDER} `,
  circular: `p-2 overflow-hidden max-h-full rounded ${DEBUG_BORDER}`,
  linear: `w-full h-full flex items-center justify-center overflow-hidden rounded ${DEBUG_BORDER}`,
  settings: `flex gap-4 overflow-hidden p-4 h-full min-h-0 box-border rounded ${DEBUG_BORDER}`,
} as const;
