import { TYPOGRAPHY } from "./Typography";

export const DEBUG_BORDER = "border border-containers-border";

export const COMMON_STYLES = {
  staff: `flex justify-center items-center px-spacious rounded ${DEBUG_BORDER}`,

  circularContainer: `p-snug overflow-hidden max-h-full rounded ${DEBUG_BORDER}`,
  circularInner: `p-snug h-full flex items-center justify-center ${TYPOGRAPHY.keyboardText}`,

  linearContainer: `w-full h-full flex items-center justify-center overflow-hidden rounded ${DEBUG_BORDER}`,
  linearInner: `w-full h-full ${TYPOGRAPHY.keyboardText}`,

  settingsPanel: `flex overflow-hidden gap-snug p-snug h-full min-h-0 box-border rounded ${DEBUG_BORDER}`,

  pageContainer:
    "h-full w-full flex flex-col px-snug md:px-loose lg:px-spacious",
  pageGrid: `grid p-snug gap-tight overflow-hidden flex-1 ${DEBUG_BORDER}`,
} as const;
