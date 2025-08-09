"use client";
import { usePathname } from "next/navigation";

export enum GlobalMode {
  Default = "Default",
  Scales = "Scales",
  ChordProgressions = "ChordProgressions",
  Demo = "Demo",
}

export const useGlobalMode = () => {
  const pathname = usePathname();
  switch (pathname) {
    case "/scales":
      return GlobalMode.Scales;
    case "/chordprogressions":
      return GlobalMode.ChordProgressions;
    case "/demo":
      return GlobalMode.Demo;
    default:
      return GlobalMode.Default;
  }
};

export const useIsDemoMode = () => {
  const globalMode = useGlobalMode();
  return globalMode === GlobalMode.Demo;
};

export const useIsScalePreviewMode = () => {
  const globalMode = useGlobalMode();
  return globalMode === GlobalMode.Scales;
};

export const useIsChordProgressionsMode = () => {
  const globalMode = useGlobalMode();
  return globalMode === GlobalMode.ChordProgressions;
};
