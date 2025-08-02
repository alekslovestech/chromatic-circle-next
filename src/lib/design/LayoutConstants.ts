import { GlobalMode } from "../hooks";

export const STAFF_HEIGHT_PX = "90px";
export const MIN_SETTINGS_HEIGHT = "220px";

export const LAYOUT_CONSTRAINTS = {
  mobile: { maxWidth: "100vw", maxHeight: "100vh" },
  tablet: { maxWidth: "100vw", maxHeight: "100vh" },
  desktop: { maxWidth: "1400px", maxHeight: "100vh" },
} as const;

// Use the existing GlobalMode concept - layout is derived from app mode
type GridAreaConfig = {
  portrait: string;
  landscape: string;
};

const DEFAULT_GRID_AREAS: GridAreaConfig = {
  portrait: `'staff staff' 
             'settings settings'
             'circular circular'
             'linear linear'`,

  landscape: `'circular staff'
              'circular settings'
              'linear settings'`,
};

const ADVANCED_GRID_AREAS: GridAreaConfig = {
  portrait: `'staff staff'
             'sidebar sidebar'
             'circular circular'                      
             'linear linear'`,

  landscape: `'circular staff'
              'circular sidebar'
              'circular linear'`,
};

const UNIVERSAL_LANDSCAPE_ROWS = `${STAFF_HEIGHT_PX} 1.5fr 1fr`;
const UNIVERSAL_PORTRAIT_ROWS = `${STAFF_HEIGHT_PX} minmax(${MIN_SETTINGS_HEIGHT}, 1.5fr) 1fr`;

export const LAYOUT_CONFIGS = {
  [GlobalMode.Default]: {
    portrait: {
      gridRows: UNIVERSAL_PORTRAIT_ROWS,
      gridAreas: DEFAULT_GRID_AREAS.portrait,
    },
    landscape: {
      gridRows: UNIVERSAL_LANDSCAPE_ROWS,
      gridAreas: DEFAULT_GRID_AREAS.landscape,
    },
  },
  [GlobalMode.Advanced]: {
    portrait: {
      gridRows: UNIVERSAL_PORTRAIT_ROWS,
      gridAreas: ADVANCED_GRID_AREAS.portrait,
    },
    landscape: {
      gridRows: UNIVERSAL_LANDSCAPE_ROWS,
      gridAreas: ADVANCED_GRID_AREAS.landscape,
    },
  },
} as const;

export const NOTATION_LAYOUT = {
  gridTemplateColumns: "50% 50%",
  gap: "0.5rem",
} as const;
