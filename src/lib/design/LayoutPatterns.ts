export const LAYOUT_PATTERNS = {
  // Common size patterns
  fullSize: "h-full w-full",
  fillContainer: "h-full w-full flex-1",

  // Common flex patterns
  centerFlex: "flex items-center justify-center",
  centerFlexCol: "flex flex-col items-center justify-center",
  spaceBetween: "flex items-center justify-between",

  // Common overflow patterns
  scrollContainer: "overflow-hidden min-h-0",
  clippedContainer: "overflow-hidden",
} as const;
