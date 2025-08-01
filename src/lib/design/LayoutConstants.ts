import { GlobalMode } from "../hooks";

export const STAFF_HEIGHT_PX = "90px";
export const MIN_SETTINGS_HEIGHT = "220px";

export const LAYOUT_CONSTRAINTS = {
  mobile: { maxWidth: "100vw", maxHeight: "100vh" },
  tablet: { maxWidth: "100vw", maxHeight: "100vh" },
  desktop: { maxWidth: "1400px", maxHeight: "100vh" },
} as const;

export type OrientationType = "landscape" | "portrait";

// Use the existing GlobalMode concept - layout is derived from app mode
const DEFAULT_GRID_AREAS = {
  portrait: `'staff staff' 
             'settings settings'
             'circular circular'
             'linear linear'`,

  landscape: `'circular staff'
              'circular settings'
              'linear settings'`,
};

const ADVANCED_GRID_AREAS = {
  portrait: `'staff staff'
             'sidebar sidebar'
             'circular circular'                      
             'linear linear'`,

  landscape: `'circular staff'
              'circular sidebar'
              'circular linear'`,
};

export const LAYOUT_CONFIGS = {
  [GlobalMode.Default]: {
    mobile: {
      portrait: {
        gridRows: `${STAFF_HEIGHT_PX} minmax(${MIN_SETTINGS_HEIGHT}, 3fr) 2fr 1fr`,
        gridAreas: DEFAULT_GRID_AREAS.portrait,
      },
      landscape: {
        gridRows: `${STAFF_HEIGHT_PX} 1.5fr 0.8fr`,
        gridAreas: DEFAULT_GRID_AREAS.landscape,
      },
    },
    tablet: {
      portrait: {
        gridRows: `${STAFF_HEIGHT_PX} minmax(${MIN_SETTINGS_HEIGHT}, 3fr) 2.5fr 1.2fr`,
        gridAreas: DEFAULT_GRID_AREAS.portrait,
      },
      landscape: {
        gridRows: `${STAFF_HEIGHT_PX} 1.5fr 0.8fr`,
        gridAreas: DEFAULT_GRID_AREAS.landscape,
      },
    },
    desktop: {
      portrait: {
        gridRows: `${STAFF_HEIGHT_PX} minmax(${MIN_SETTINGS_HEIGHT}, 3fr) 2.5fr 1.5fr`,
        gridAreas: DEFAULT_GRID_AREAS.portrait,
      },
      landscape: {
        gridRows: `${STAFF_HEIGHT_PX} 1.5fr 0.8fr`,
        gridAreas: DEFAULT_GRID_AREAS.landscape,
      },
    },
  },
  [GlobalMode.Advanced]: {
    mobile: {
      portrait: {
        gridRows: `${STAFF_HEIGHT_PX} minmax(${MIN_SETTINGS_HEIGHT}, 2fr) 2fr 0.8fr`,
        gridAreas: ADVANCED_GRID_AREAS.portrait,
      },
      landscape: {
        gridRows: `${STAFF_HEIGHT_PX} 1.5fr 1fr`,
        gridAreas: ADVANCED_GRID_AREAS.landscape,
      },
    },
    tablet: {
      portrait: {
        gridRows: `${STAFF_HEIGHT_PX} minmax(${MIN_SETTINGS_HEIGHT}, 2fr) 2fr 0.8fr`,
        gridAreas: ADVANCED_GRID_AREAS.portrait,
      },
      landscape: {
        gridRows: `${STAFF_HEIGHT_PX} 1.5fr 1fr`,
        gridAreas: ADVANCED_GRID_AREAS.landscape,
      },
    },
    desktop: {
      portrait: {
        gridRows: `${STAFF_HEIGHT_PX} minmax(${MIN_SETTINGS_HEIGHT}, 2fr) 2fr 1fr`,
        gridAreas: ADVANCED_GRID_AREAS.portrait,
      },
      landscape: {
        gridRows: `${STAFF_HEIGHT_PX} 1.5fr 1fr`,
        gridAreas: ADVANCED_GRID_AREAS.landscape,
      },
    },
  },
} as const;

export const NOTATION_LAYOUT = {
  gridTemplateColumns: "50% 50%",
  gap: "0.5rem",
} as const;
