import React from "react";

interface ToggleProps {
  id: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  label: string;
  padding?: "tight" | "snug" | "normal" | "loose" | "spacious";
  disabled?: boolean;
}

export const Toggle: React.FC<ToggleProps> = ({
  id,
  checked,
  onChange,
  label,
  padding = "normal",
  disabled = false,
}) => {
  const paddingClass = `gap-${padding}`;

  const checkboxStyles = [
    // Base styles
    "w-4 h-4 rounded border transition-colors duration-200",
    // Using unified color system
    "border-containers-border",
    "bg-buttons-bgDefault",
    // Checked state
    checked ? "bg-buttons-bgSelected border-buttons-borderSelected" : "",
    // Hover state (only if not disabled)
    !disabled && !checked ? "hover:bg-buttons-bgHover" : "",
    // Focus state
    "focus:ring-2 focus:ring-buttons-bgSelected focus:ring-opacity-50",
    // Disabled state
    disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer",
  ]
    .filter(Boolean)
    .join(" ");

  // ✅ Use the same font constants as SectionTitle
  const labelStyles = [
    "text-sm text-labels-textDefault font-medium transition-colors duration-200", // Same pattern as SectionTitle
    !disabled
      ? "hover:text-buttons-textSelected cursor-pointer"
      : "cursor-not-allowed opacity-50",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={`flex items-center ${paddingClass}`}>
      <input
        type="checkbox"
        id={id}
        checked={checked}
        onChange={(e) => !disabled && onChange(e.target.checked)}
        disabled={disabled}
        className={checkboxStyles}
      />
      <label htmlFor={id} className={labelStyles}>
        {label}
      </label>
    </div>
  );
};
