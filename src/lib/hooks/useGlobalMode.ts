"use client";
import { usePathname } from "next/navigation";

export enum GlobalMode {
  Default = "Default",
  Scales = "Scales",
  Demo = "Demo",
}

export const useGlobalMode = () => {
  const pathname = usePathname();
  return pathname === "/scales"
    ? GlobalMode.Scales
    : pathname === "/demo"
    ? GlobalMode.Demo
    : GlobalMode.Default;
};

export const useIsDemoMode = () => {
  const globalMode = useGlobalMode();
  return globalMode === GlobalMode.Demo;
};

export const useIsScalePreviewMode = () => {
  const globalMode = useGlobalMode();
  return globalMode === GlobalMode.Scales;
};
