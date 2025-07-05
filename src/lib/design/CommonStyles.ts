import { LAYOUT_PATTERNS } from "./LayoutPatterns";
import { TYPOGRAPHY } from "./Typography";

export const DEBUG_BORDER = "border border-containers-borderDebug";

export const COMMON_STYLES = {
  staff: `${LAYOUT_PATTERNS.centerFlex} px-spacious rounded ${DEBUG_BORDER}`,

  keyboardCircular: `p-snug ${LAYOUT_PATTERNS.clippedContainer} max-h-full rounded ${DEBUG_BORDER}`,
  keyboardLinear: `${LAYOUT_PATTERNS.fullSize} ${LAYOUT_PATTERNS.centerFlex} ${LAYOUT_PATTERNS.clippedContainer} rounded ${DEBUG_BORDER}`,

  circularContainer: `p-snug overflow-hidden max-h-full rounded ${DEBUG_BORDER}`,
  circularInner: `p-snug ${LAYOUT_PATTERNS.fullSize} ${LAYOUT_PATTERNS.centerFlex} ${TYPOGRAPHY.keyboardText}`,

  linearContainer: `w-full h-full flex items-center justify-center overflow-hidden rounded ${DEBUG_BORDER}`,
  linearInner: `${LAYOUT_PATTERNS.fullSize} ${TYPOGRAPHY.keyboardText}`,

  settingsPanel: `flex overflow-hidden gap-snug p-snug h-full min-h-0 box-border rounded ${DEBUG_BORDER}`,

  pageContainer: `${LAYOUT_PATTERNS.fullSize} flex flex-col px-snug md:px-loose lg:px-spacious`,
  pageGrid: `grid p-snug gap-tight ${LAYOUT_PATTERNS.clippedContainer} flex-1 ${DEBUG_BORDER}`,
} as const;
