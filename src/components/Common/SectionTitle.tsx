import React from "react";
import { TYPOGRAPHY } from "@/lib/design";

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
      className={`section-title ${
        TYPOGRAPHY.sectionTitle
      } mb-tight flex-shrink-0 ${centered ? "text-center" : ""} ${className}`}
    >
      {children}
    </div>
  );
};
