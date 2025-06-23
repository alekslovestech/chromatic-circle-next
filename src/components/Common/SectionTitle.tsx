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
      className={`section-title text-base font-medium mb-2 text-serenity-textblack flex-shrink-0 ${
        centered ? "text-center" : ""
      } ${className}`}
    >
      {children}
    </div>
  );
};
