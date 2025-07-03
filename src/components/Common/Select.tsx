import React from "react";

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  id: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  title?: string;
}

export const Select: React.FC<SelectProps> = ({
  id,
  value,
  onChange,
  title,
  children,
  ...props
}) => {
  const baseStyles =
    "rounded-2xl border border-containers-border bg-bgDefault text-sm text-keys-textOnWhite px-snug py-snug";

  return (
    <select
      id={id}
      value={value}
      onChange={onChange}
      title={title}
      className={baseStyles}
      {...props}
    >
      {children}
    </select>
  );
};
