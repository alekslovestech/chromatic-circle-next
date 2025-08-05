import { LAYOUT_PATTERNS } from "./LayoutPatterns";

export const DEBUG_BORDER =
  process.env.NODE_ENV === "development"
    ? "border border-containers-borderDebug"
    : "border border-containers-border";

export const COMMON_STYLES = {
  staff: `${LAYOUT_PATTERNS.fullSize} ${LAYOUT_PATTERNS.centerFlex} px-snug rounded ${DEBUG_BORDER}`,

  keyboardCircular: `p-snug ${LAYOUT_PATTERNS.clippedContainer} max-h-full rounded ${DEBUG_BORDER}`,
  keyboardLinear: `${LAYOUT_PATTERNS.fullSize} ${LAYOUT_PATTERNS.centerFlex} ${LAYOUT_PATTERNS.clippedContainer} rounded ${DEBUG_BORDER}`,

  circularContainer: `relative p-snug overflow-hidden max-h-full rounded ${DEBUG_BORDER}`,
  circularInner: `${LAYOUT_PATTERNS.fullSize} ${LAYOUT_PATTERNS.centerFlex}`,

  linearContainer: `${LAYOUT_PATTERNS.fullSize} ${LAYOUT_PATTERNS.centerFlex} overflow-hidden rounded ${DEBUG_BORDER}`,
  linearInner: `${LAYOUT_PATTERNS.fullSize}`,

  settingsPanel: `flex overflow-hidden gap-snug h-full min-h-0 box-border rounded ${DEBUG_BORDER}`,

  pageContainer: `${LAYOUT_PATTERNS.fullSize} flex flex-col px-snug md:px-loose lg:px-spacious`,
  pageGrid: `grid gap-tight ${LAYOUT_PATTERNS.clippedContainer} flex-1 ${DEBUG_BORDER}`,
} as const;
