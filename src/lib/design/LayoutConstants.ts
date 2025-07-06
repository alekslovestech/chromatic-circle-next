import { GlobalMode } from "../hooks";

export const STAFF_HEIGHT_PX = "90px";

export const LAYOUT_CONSTRAINTS = {
  maxWidth: "800px",
  maxHeight: "600px",
} as const;

export const GRID_COLUMNS = {
  landscape: "1fr 1fr 1fr 1fr",
  portrait: "1fr 1fr",
} as const;

export type OrientationType = "landscape" | "portrait";

// Use the existing GlobalMode concept - layout is derived from app mode
export const LAYOUT_CONFIGS = {
  [GlobalMode.Default]: {
    portrait: {
      gridRows: `${STAFF_HEIGHT_PX} minmax(230px, 3fr) 3fr 2fr`,
      gridAreas: `'staff staff' 
                  'settings settings'
                  'circular circular'
                  'linear linear'`,
    },
    landscape: {
      gridRows: `${STAFF_HEIGHT_PX} 1fr 1fr`,
      gridAreas: `'circular circular staff staff'
                  'circular circular settings settings'
                  'linear linear settings settings'`,
    },
  },
  [GlobalMode.Advanced]: {
    portrait: {
      gridRows: `${STAFF_HEIGHT_PX} 1fr 2fr 1fr`,
      gridAreas: `'staff staff'
                  'sidebar sidebar'
                  'circular circular'                      
                  'linear linear'`,
    },
    landscape: {
      gridRows: `${STAFF_HEIGHT_PX} 1fr 1fr`,
      gridAreas: `'circular circular staff staff'
                  'circular circular sidebar sidebar'
                  'circular circular linear linear'
                  'circular circular linear linear'`,
    },
  },
} as const;

export const NOTATION_LAYOUT = {
  gridTemplateColumns: "70% 30%",
  gap: "0.5rem",
} as const;
