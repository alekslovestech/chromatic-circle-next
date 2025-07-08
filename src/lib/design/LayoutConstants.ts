import { GlobalMode } from "../hooks";

export const STAFF_HEIGHT_PX = "90px";
export const MIN_SETTINGS_HEIGHT = "220px";

export const LAYOUT_CONSTRAINTS = {
  mobile: { maxWidth: "100vw", maxHeight: "100vh" },
  tablet: { maxWidth: "100vw", maxHeight: "100vh" },
  desktop: { maxWidth: "1400px", maxHeight: "100vh" },
} as const;

export const GRID_COLUMNS = {
  mobile: {
    landscape: "1fr 1fr",
    portrait: "1fr",
  },
  tablet: {
    landscape: "1fr 2fr 1fr",
    portrait: "1fr 1fr",
  },
  desktop: {
    landscape: "1fr 2fr 2fr 1fr",
    portrait: "1fr 1fr 1fr",
  },
} as const;

export type OrientationType = "landscape" | "portrait";

// Use the existing GlobalMode concept - layout is derived from app mode
export const LAYOUT_CONFIGS = {
  [GlobalMode.Default]: {
    mobile: {
      portrait: {
        gridRows: `${STAFF_HEIGHT_PX} minmax(${MIN_SETTINGS_HEIGHT}, 2.5fr) 2fr 1.5fr`,
        gridAreas: `'staff' 
                    'settings'
                    'circular'
                    'linear'`,
      },
      landscape: {
        gridRows: `${STAFF_HEIGHT_PX} 1fr 1fr`,
        gridAreas: `'circular staff'
                    'circular settings'
                    'linear settings'`,
      },
    },
    tablet: {
      portrait: {
        gridRows: `${STAFF_HEIGHT_PX} minmax(${MIN_SETTINGS_HEIGHT}, 2.5fr) 2.5fr 1.8fr`,
        gridAreas: `'staff staff' 
                    'settings settings'
                    'circular circular'
                    'linear linear'`,
      },
      landscape: {
        gridRows: `${STAFF_HEIGHT_PX} 1fr 1fr`,
        gridAreas: `'circular circular staff'
                    'circular circular settings'
                    'linear linear settings'`,
      },
    },
    desktop: {
      portrait: {
        gridRows: `${STAFF_HEIGHT_PX} minmax(${MIN_SETTINGS_HEIGHT}, 2.5fr) 2.5fr 2fr`,
        gridAreas: `'staff staff staff' 
                    'settings settings settings'
                    'circular circular circular'
                    'linear linear linear'`,
      },
      landscape: {
        gridRows: `${STAFF_HEIGHT_PX} 1fr 1fr`,
        gridAreas: `'circular circular staff staff'
                    'circular circular settings settings'
                    'linear linear settings settings'`,
      },
    },
  },
  [GlobalMode.Advanced]: {
    mobile: {
      portrait: {
        gridRows: `${STAFF_HEIGHT_PX} minmax(${MIN_SETTINGS_HEIGHT}, 1.5fr) 2fr 1fr`,
        gridAreas: `'staff'
                    'sidebar'
                    'circular'                      
                    'linear'`,
      },
      landscape: {
        gridRows: `${STAFF_HEIGHT_PX} 1.5fr 1fr`,
        gridAreas: `'circular staff'
                    'circular sidebar'
                    'circular linear'`,
      },
    },
    tablet: {
      portrait: {
        gridRows: `${STAFF_HEIGHT_PX} minmax(${MIN_SETTINGS_HEIGHT}, 1.5fr) 2fr 1fr`,
        gridAreas: `'staff staff'
                    'sidebar sidebar'
                    'circular circular'                      
                    'linear linear'`,
      },
      landscape: {
        gridRows: `${STAFF_HEIGHT_PX} 1.5fr 1fr`,
        gridAreas: `'circular circular staff'
                    'circular circular sidebar'
                    'circular circular linear'`,
      },
    },
    desktop: {
      portrait: {
        gridRows: `${STAFF_HEIGHT_PX} minmax(${MIN_SETTINGS_HEIGHT}, 1.5fr) 2fr 1fr`,
        gridAreas: `'staff staff staff'
                    'sidebar sidebar sidebar'
                    'circular circular circular'                      
                    'linear linear linear'`,
      },
      landscape: {
        gridRows: `${STAFF_HEIGHT_PX} 1.5fr 1fr`,
        gridAreas: `'circular circular staff staff'
                    'circular circular sidebar sidebar'
                    'circular circular linear linear'
                    'circular circular linear linear'`,
      },
    },
  },
} as const;

export const NOTATION_LAYOUT = {
  gridTemplateColumns: "60% 40%",
  gap: "0.5rem",
} as const;
