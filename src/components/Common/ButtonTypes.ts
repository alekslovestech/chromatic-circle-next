export type ButtonVariant = "option" | "action" | "global" | "vis";
export type ButtonSize = "sm" | "md" | "lg";

export const BASE_STYLES =
  "rounded-2xl border border-buttons-border bg-buttons-bgDefault text-buttons-textDefault hover:bg-buttons-bgHover";

export const VARIANTS: Record<ButtonVariant, string> = {
  option: "",
  action: "text-default",
  global: "border-buttons-border bg-gray-100 whitespace-normal",
  vis: "rounded-none border-buttons-border fill-none stroke-[2px] stroke-black text-buttons-textDefault text-font-bold",
};

export const SIZES: Record<ButtonSize, string> = {
  sm: "px-tight py-tight min-w-button-sm max-w-button-sm",
  md: "px-snug py-snug min-w-button-md max-w-button-md",
  lg: "px-normal py-normal min-w-button-lg max-w-button-lg",
};

export const SELECTED_STYLES =
  "!bg-buttons-bgSelected !border-buttons-borderSelected !text-buttons-textSelected fill-none stroke-[3px] stroke-white pointer-events-none";

export const DISABLED_STYLES =
  "opacity-50 cursor-not-allowed bg-buttons-bgDisabled";

export const TYPOGRAPHY = {
  sectionTitle: "text-base text-labels-textDefault font-bold",
  controlLabel: "text-sm text-labels-textDefault font-medium",
  buttonText: "text-labels-textDefault font-medium",
  bodyText: "text-sm text-labels-textDefault",
  displayText: "text-2xl text-labels-textDefault font-bold",
  keyboardText: "text-2xl text-labels-textDefault",
} as const;

export type TypographyVariant = keyof typeof TYPOGRAPHY;
