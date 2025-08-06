export const LAYOUT_PATTERNS = {
  // Common size patterns
  fullSize: "h-full w-full",

  // Common flex patterns
  centerFlex: "flex items-center justify-center",
  centerFlexCol: "flex flex-col items-center justify-center",
  centerFlexRowGap: "flex flex-row items-center justify-center gap-snug",
  spaceBetween: "flex items-center justify-between",

  // Common overflow patterns
  scrollContainer: "overflow-hidden min-h-0",
  clippedContainer: "overflow-hidden",
} as const;
