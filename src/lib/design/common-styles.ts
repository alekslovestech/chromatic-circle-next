export const DEBUG_BORDER = "border border-containers-border";

export const COMMON_STYLES = {
  staff: `flex justify-center items-center px-looser rounded ${DEBUG_BORDER}`,

  circularContainer: `p-snug overflow-hidden max-h-full rounded ${DEBUG_BORDER}`,
  circularInner:
    "p-2 h-full flex items-center justify-center text-2xl !text-labels-textDefault",

  linearContainer: `w-full h-full flex items-center justify-center overflow-hidden rounded ${DEBUG_BORDER}`,
  linearInner: "w-full h-full text-2xl",

  settingsPanel: `flex overflow-hidden gap-snug p-snug h-full min-h-0 box-border rounded ${DEBUG_BORDER}`,

  pageContainer:
    "h-full w-full flex flex-col px-snug md:px-loose lg:px-spacious",
  pageGrid: `grid p-2 gap-tight overflow-hidden flex-1 ${DEBUG_BORDER}`,
} as const;
