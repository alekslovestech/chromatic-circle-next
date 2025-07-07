import { useIsLandscape } from "./useIsLandscape";
import { useGlobalMode } from "./useGlobalMode";
import { useBreakpoint } from "./useBreakpoint";
import {
  LAYOUT_CONFIGS,
  GRID_COLUMNS,
  OrientationType,
} from "@/lib/design/LayoutConstants";

// Single return type for the hook
export interface PageLayout {
  gridRows: string;
  gridAreas: string;
  gridColumns: string;
  orientation: OrientationType;
  breakpoint: string;
}

export function usePageLayout(): PageLayout {
  const mode = useGlobalMode();
  const isLandscape = useIsLandscape();
  const breakpoint = useBreakpoint();

  const orientation: OrientationType = isLandscape ? "landscape" : "portrait";
  const config = LAYOUT_CONFIGS[mode][breakpoint][orientation];

  return {
    gridRows: config.gridRows,
    gridAreas: config.gridAreas,
    gridColumns: GRID_COLUMNS[breakpoint][orientation],
    orientation,
    breakpoint,
  };
}
