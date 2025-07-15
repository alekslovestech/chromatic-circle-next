export type ButtonVariant = "option" | "action" | "global" | "vis";
export type ButtonSize = "sm" | "md" | "lg";

export const BASE_STYLES =
  "rounded-2xl border border-buttons-border bg-buttons-bgDefault text-buttons-textDefault hover:bg-buttons-bgHover transition-all duration-150";

export const VARIANTS: Record<ButtonVariant, string> = {
  option: "shadow-sm", // Subtle shadow for toggle-style buttons
  action:
    "max-w-24 text-default self-center bg-buttons-actionBgDefault border-buttons-actionBorder text-buttons-actionText hover:bg-buttons-actionBgHover active:bg-buttons-actionBgActive shadow-md hover:shadow-lg active:shadow-sm transform hover:scale-105 active:scale-95", // More dynamic styling
  global: "border-buttons-border bg-gray-100 whitespace-normal",
  vis: "rounded-none border-buttons-border fill-none stroke-[2px] stroke-black text-buttons-textDefault text-font-bold",
};

export const SIZES: Record<ButtonSize, string> = {
  sm: "px-tight py-tight min-w-button-sm max-w-button-sm",
  md: "px-snug py-snug min-w-button-md max-w-button-md",
  lg: "px-normal py-normal min-w-button-lg max-w-button-lg",
};

export const SELECTED_STYLES =
  "!bg-buttons-bgSelected !border-buttons-borderSelected !text-buttons-textSelected fill-none stroke-[3px] stroke-white pointer-events-none shadow-inner"; // Added shadow-inner for "pressed in" look

export const DISABLED_STYLES =
  "opacity-50 cursor-not-allowed bg-buttons-bgDisabled";
