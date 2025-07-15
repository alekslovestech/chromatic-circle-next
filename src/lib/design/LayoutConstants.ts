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
    landscape: "1fr 1fr", // Already 50/50
    portrait: "1fr",
  },
  tablet: {
    landscape: "1fr 1fr", // Changed from "1fr 2fr 1fr" to "1fr 1fr" for clean 50/50
    portrait: "1fr 1fr",
  },
  desktop: {
    landscape: "1fr 1fr", // Changed from "1fr 2fr 2fr 1fr" to "1fr 1fr" for clean 50/50
    portrait: "1fr 1fr 1fr",
  },
} as const;

export type OrientationType = "landscape" | "portrait";

// Use the existing GlobalMode concept - layout is derived from app mode
export const LAYOUT_CONFIGS = {
  [GlobalMode.Default]: {
    mobile: {
      portrait: {
        gridRows: `${STAFF_HEIGHT_PX} minmax(${MIN_SETTINGS_HEIGHT}, 3fr) 2fr 1fr`, // Increased settings from 2.5fr to 3fr, reduced linear from 1.5fr to 1fr
        gridAreas: `'staff' 
                    'settings'
                    'circular'
                    'linear'`,
      },
      landscape: {
        gridRows: `${STAFF_HEIGHT_PX} 1.5fr 0.8fr`, // Increased settings row from 1fr to 1.5fr, reduced linear from 1fr to 0.8fr
        gridAreas: `'circular staff'
                    'circular settings'
                    'linear settings'`,
      },
    },
    tablet: {
      portrait: {
        gridRows: `${STAFF_HEIGHT_PX} minmax(${MIN_SETTINGS_HEIGHT}, 3fr) 2.5fr 1.2fr`, // Increased settings from 2.5fr to 3fr, reduced linear from 1.8fr to 1.2fr
        gridAreas: `'staff staff' 
                    'settings settings'
                    'circular circular'
                    'linear linear'`,
      },
      landscape: {
        gridRows: `${STAFF_HEIGHT_PX} 1.5fr 0.8fr`, // Increased settings row from 1fr to 1.5fr, reduced linear from 1fr to 0.8fr
        gridAreas: `'circular circular staff'
                    'circular circular settings'
                    'linear linear settings'`,
      },
    },
    desktop: {
      portrait: {
        gridRows: `${STAFF_HEIGHT_PX} minmax(${MIN_SETTINGS_HEIGHT}, 3fr) 2.5fr 1.5fr`, // Increased settings from 2.5fr to 3fr, reduced linear from 2fr to 1.5fr
        gridAreas: `'staff staff staff' 
                    'settings settings settings'
                    'circular circular circular'
                    'linear linear linear'`,
      },
      landscape: {
        gridRows: `${STAFF_HEIGHT_PX} 1.5fr 0.8fr`, // Increased settings row from 1fr to 1.5fr, reduced linear from 1fr to 0.8fr
        gridAreas: `'circular circular staff staff'
                    'circular circular settings settings'
                    'linear linear settings settings'`,
      },
    },
  },
  [GlobalMode.Advanced]: {
    mobile: {
      portrait: {
        gridRows: `${STAFF_HEIGHT_PX} minmax(${MIN_SETTINGS_HEIGHT}, 2fr) 2fr 0.8fr`, // Increased sidebar from 1.5fr to 2fr, reduced linear from 1fr to 0.8fr
        gridAreas: `'staff'
                    'sidebar'
                    'circular'                      
                    'linear'`,
      },
      landscape: {
        gridRows: `${STAFF_HEIGHT_PX} 1.5fr 1fr`,
        gridAreas: `'circular staff'
                    'circular sidebar'
                    'circular linear'`, // 50/50 split
      },
    },
    tablet: {
      portrait: {
        gridRows: `${STAFF_HEIGHT_PX} minmax(${MIN_SETTINGS_HEIGHT}, 2fr) 2fr 0.8fr`, // Increased sidebar from 1.5fr to 2fr, reduced linear from 1fr to 0.8fr
        gridAreas: `'staff staff'
                    'sidebar sidebar'
                    'circular circular'                      
                    'linear linear'`,
      },
      landscape: {
        gridRows: `${STAFF_HEIGHT_PX} 1.5fr 1fr`,
        gridAreas: `'circular staff'
                    'circular sidebar'
                    'circular linear'`, // 50/50 split with 2 columns
      },
    },
    desktop: {
      portrait: {
        gridRows: `${STAFF_HEIGHT_PX} minmax(${MIN_SETTINGS_HEIGHT}, 2fr) 2fr 1fr`, // Increased sidebar from 1.5fr to 2fr, reduced linear from 1fr to 1fr (keeping it reasonable on desktop)
        gridAreas: `'staff staff staff'
                    'sidebar sidebar sidebar'
                    'circular circular circular'                      
                    'linear linear linear'`,
      },
      landscape: {
        gridRows: `${STAFF_HEIGHT_PX} 1.5fr 1fr`,
        gridAreas: `'circular staff'
                    'circular sidebar'
                    'circular linear'`, // 50/50 split with 2 columns
      },
    },
  },
} as const;

export const NOTATION_LAYOUT = {
  gridTemplateColumns: "50% 50%",
  gap: "0.5rem",
} as const;
