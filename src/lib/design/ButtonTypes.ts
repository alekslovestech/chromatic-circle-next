export type ButtonVariant = "option" | "action" | "global" | "vis";
export type ButtonSize = "sm" | "md" | "lg";

export const BASE_STYLES =
  "rounded-2xl border border-buttons-border bg-buttons-bgDefault text-buttons-textDefault hover:bg-buttons-bgHover";

export const VARIANTS: Record<ButtonVariant, string> = {
  option: "",
  action: "max-w-24 text-default self-center",
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
