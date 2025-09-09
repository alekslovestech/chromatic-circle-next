"use client";
import { useEffect, useState } from "react";
import { GlobalMode } from "@/types/enums/GlobalMode";

import { useGlobalMode } from "./useGlobalMode";

export const useBorder = () => {
  const globalMode = useGlobalMode();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // During SSR, return the default border to avoid hydration mismatch
  if (!isClient) return "border border-containers-border";

  return globalMode === GlobalMode.Demo
    ? "border border-transparent"
    : `border border-containers-${
        process.env.NODE_ENV === "development" ? "borderDebug" : "border"
      }`;
};
