"use client";
import { useGlobalMode, GlobalMode } from "./useGlobalMode";

export const useBorder = () => {
  const globalMode = useGlobalMode();
  const isDemo = globalMode === GlobalMode.Demo;

  if (isDemo) {
    return "border border-transparent";
  }

  return process.env.NODE_ENV === "development"
    ? "border border-containers-borderDebug"
    : "border border-containers-border";
};
