"use client";
import { useEffect, useState } from "react";

export const useBorder = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // During SSR, return the default border to avoid hydration mismatch
  const outline =
    isClient && process.env.NODE_ENV === "development"
      ? "border-containers-outlineDebug"
      : "border-containers-outline";
  return `border ${outline}`;
};
