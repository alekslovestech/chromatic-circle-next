export const TYPOGRAPHY = {
  sectionTitle: "text-base font-bold",
  controlLabel: "text-sm font-medium",
  buttonText: "text-sm font-medium",
  bodyText: "text-sm",
  displayText: "text-xl sm:text-2xl lg:text-3xl font-bold",
  keyboardText: "text-sm sm:text-base md:text-lg lg:text-xl font-bold",
} as const;

export type TypographyVariant = keyof typeof TYPOGRAPHY;
