import React from "react";

interface SectionTitleProps {
  children: React.ReactNode;
  className?: string;
  centered?: boolean;
}

export const SectionTitle: React.FC<SectionTitleProps> = ({
  children,
  className = "",
  centered = false,
}) => {
  return (
    <div
      className={`section-title text-base text-labels-textDefault font-bold mb-2 flex-shrink-0 ${
        centered ? "text-center" : ""
      } ${className}`}
    >
      {children}
    </div>
  );
};
