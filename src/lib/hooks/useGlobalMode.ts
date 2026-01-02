"use client";
import { GlobalMode } from "@/types/enums/GlobalMode";
import { usePathname } from "next/navigation";

export const useGlobalMode = () => {
  const pathname = usePathname();
  switch (pathname) {
    case "/scales":
      return GlobalMode.Scales;
    case "/scales-demo":
      return GlobalMode.Scales;
    case "/harmony-demo":
      return GlobalMode.Default;
    case "/chordprogressions-demo":
      return GlobalMode.ChordProgressions;
    case "/minimal":
      return GlobalMode.Minimal;
    default:
      return GlobalMode.Default;
  }
};

export const useIsDemoRoute = () => {
  const pathname = usePathname();
  return pathname?.endsWith("-demo") ?? false;
};

export const useIsMinimalMode = () => {
  const globalMode = useGlobalMode();
  return globalMode === GlobalMode.Minimal;
};

export const useIsScalePreviewMode = () => {
  const globalMode = useGlobalMode();
  return globalMode === GlobalMode.Scales;
};

export const useIsChordProgressionsMode = () => {
  const globalMode = useGlobalMode();
  return globalMode === GlobalMode.ChordProgressions;
};
