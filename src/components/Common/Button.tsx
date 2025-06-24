import React from "react";

import {
  ButtonVariant,
  ButtonDensity,
  ButtonSize,
  BASE_STYLES,
  VARIANTS,
  DENSITIES,
  SIZES,
  SELECTED_STYLES,
  DISABLED_STYLES,
} from "./ButtonTypes";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  density?: ButtonDensity;
  size?: ButtonSize;
  selected?: boolean;
  disabled?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = "option",
  density = "standard",
  size = "md",
  selected = false,
  disabled = false,
  className = "",
  ...props
}) => {
  const selectedStyles = selected ? `${SELECTED_STYLES} selected` : "";
  const disabledStyles = disabled ? `${DISABLED_STYLES} disabled` : "";
  const propsId = props.id;
  const propsWithoutId = { ...props };
  delete propsWithoutId.id;
  return (
    <button
      id={propsId}
      className={`${BASE_STYLES} ${DENSITIES[density]} ${SIZES[size]} ${VARIANTS[variant]} ${selectedStyles} ${disabledStyles} ${className}`}
      {...propsWithoutId}
    >
      {children}
    </button>
  );
};
