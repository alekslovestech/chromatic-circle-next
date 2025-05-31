import type { Metadata, Viewport } from "next";

// Viewport configuration
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

// Base metadata shared across the application
export const baseMetadata: Metadata = {
  title: "Chromatic Circle",
  keywords: [
    "music theory",
    "chromatic circle",
    "circular keyboard",
    "music education",
    "harmony",
    "geometry",
    "color coding chords",
    "circle of fifths",
  ],
  description:
    "Interactive music theory application for exploring the chromatic circle",
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "Chromatic Circle",
    description:
      "Interactive music theory application for exploring the chromatic circle",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Chromatic Circle",
    description:
      "Interactive music theory application for exploring the chromatic circle",
  },
};

// Default view metadata
export const defaultViewMetadata: Metadata = {
  ...baseMetadata,
  title: "Default View - Chromatic Circle",
  keywords: ["black and white keys", "intervals", "chord presets"],
  description:
    "Basic features for exploring music theory with the chromatic circle",
  openGraph: {
    ...baseMetadata.openGraph,
    title: "Default View - Chromatic Circle",
    description:
      "Basic features for exploring music theory with the chromatic circle",
  },
  twitter: {
    ...baseMetadata.twitter,
    title: "Default View - Chromatic Circle",
    description:
      "Basic features for exploring music theory with the chromatic circle",
  },
};

// Advanced view metadata
export const advancedViewMetadata: Metadata = {
  ...baseMetadata,
  title: "Advanced View - Chromatic Circle",
  keywords: [
    "ionian, dorian, phrygian, lydian, mixolydian, aeolian, locrian",
    "hungarian minor",
    "ukranian dorian",
    "phrygian dominant",
    "greek modes",
    "musical modes",
    "modes",
    "scales",
    "chords",
    "progressions",
  ],
  description:
    "Advanced features for exploring music theory with the chromatic circle",
  openGraph: {
    ...baseMetadata.openGraph,
    title: "Advanced View - Chromatic Circle",
    description:
      "Advanced features for exploring music theory with the chromatic circle",
  },
  twitter: {
    ...baseMetadata.twitter,
    title: "Advanced View - Chromatic Circle",
    description:
      "Advanced features for exploring music theory with the chromatic circle",
  },
};
