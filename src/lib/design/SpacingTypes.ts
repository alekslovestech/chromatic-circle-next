export type SpacingSize = "tight" | "snug" | "normal" | "loose" | "spacious";

export const getGapClass = (size: SpacingSize) => `gap-${size}`;
export const getPaddingClass = (size: SpacingSize) => `p-${size}`;
export const getMarginClass = (size: SpacingSize) => `m-${size}`;
