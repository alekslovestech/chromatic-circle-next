import { GlobalMode } from "../hooks";

const STAFF_HEIGHT_PX = "90px";
const MIN_SETTINGS_HEIGHT_DEFAULT = "220px";
const MIN_SETTINGS_HEIGHT_ADVANCED = "140px";

// Use the existing GlobalMode concept - layout is derived from app mode
type GridAreaConfig = {
  portrait: string;
  landscape: string;
};

type GridRowsConfig = {
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

const DEFAULT_ROWS: GridRowsConfig = {
  portrait: `${STAFF_HEIGHT_PX} minmax(${MIN_SETTINGS_HEIGHT_DEFAULT}, 1.5fr) 1fr`,
  landscape: `${STAFF_HEIGHT_PX} 2.2fr 1fr`,
};

const ADVANCED_ROWS: GridRowsConfig = {
  portrait: `${STAFF_HEIGHT_PX} minmax(${MIN_SETTINGS_HEIGHT_ADVANCED}, 1fr) 1fr`,
  landscape: `${STAFF_HEIGHT_PX} 2.2fr 1fr`,
};

export const LAYOUT_CONFIGS = {
  [GlobalMode.Default]: {
    portrait: {
      gridRows: DEFAULT_ROWS.portrait,
      gridAreas: DEFAULT_GRID_AREAS.portrait,
    },
    landscape: {
      gridRows: DEFAULT_ROWS.landscape,
      gridAreas: DEFAULT_GRID_AREAS.landscape,
    },
  },
  [GlobalMode.Advanced]: {
    portrait: {
      gridRows: ADVANCED_ROWS.portrait,
      gridAreas: ADVANCED_GRID_AREAS.portrait,
    },
    landscape: {
      gridRows: ADVANCED_ROWS.landscape,
      gridAreas: ADVANCED_GRID_AREAS.landscape,
    },
  },
} as const;

export const NOTATION_LAYOUT = {
  gridTemplateColumns: "50% 50%",
  gap: "0.5rem",
} as const;
