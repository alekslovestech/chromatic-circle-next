export const TYPOGRAPHY = {
  sectionTitle: "text-base font-bold",
  controlLabel: "text-sm font-medium",
  buttonText: "text-sm font-medium",
  bodyText: "text-sm",
  displayText: "text-3xl sm:text-3xl md:text-4xl lg:text-5xl font-bold",
  keyboardText: "text-base font-bold",
  shortKeyText: "text-base font-normal",
} as const;

export type TypographyVariant = keyof typeof TYPOGRAPHY;
