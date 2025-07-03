export const TYPOGRAPHY = {
  sectionTitle: "text-base text-labels-textDefault font-bold",
  controlLabel: "text-sm text-labels-textDefault font-medium",
  buttonText: "text-sm text-labels-textDefault font-medium",
  bodyText: "text-sm text-labels-textDefault",
  displayText: "text-2xl text-labels-textDefault font-bold",
  keyboardText: "text-2xl text-labels-textDefault",
} as const;

export type TypographyVariant = keyof typeof TYPOGRAPHY;
