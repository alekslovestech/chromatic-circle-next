import { useIsLandscape } from "./useIsLandscape";
import { useGlobalMode } from "./useGlobalMode";
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
}

export function usePageLayout(): PageLayout {
  const mode = useGlobalMode(); // Auto-detect from route
  const isLandscape = useIsLandscape();
  const orientation: OrientationType = isLandscape ? "landscape" : "portrait";

  const config = LAYOUT_CONFIGS[mode][orientation];

  return {
    gridRows: config.gridRows,
    gridAreas: config.gridAreas,
    gridColumns: isLandscape ? GRID_COLUMNS.landscape : GRID_COLUMNS.portrait,
    orientation,
  };
}
