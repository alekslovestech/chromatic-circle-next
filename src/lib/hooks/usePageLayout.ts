import { useIsLandscape } from "./useIsLandscape";
import { useGlobalMode } from "./useGlobalMode";
import { LAYOUT_CONFIGS } from "@/lib/design/LayoutConstants";

type OrientationType = "landscape" | "portrait";
export interface PageLayout {
  gridRows: string;
  gridAreas: string;
  gridColumns: string;
  orientation: OrientationType;
}

const GRID_COLUMNS = "1fr 1fr";

export function usePageLayout(): PageLayout {
  const mode = useGlobalMode();
  const isLandscape = useIsLandscape();

  const orientation: OrientationType = isLandscape ? "landscape" : "portrait";
  const config = LAYOUT_CONFIGS[mode][orientation];

  return {
    gridRows: config.gridRows,
    gridAreas: config.gridAreas,
    gridColumns: GRID_COLUMNS,
    orientation,
  };
}
