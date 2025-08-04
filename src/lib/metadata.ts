import type { Metadata, Viewport } from "next";

// Viewport configuration
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

// Base metadata shared across the application
export const baseMetadata: Metadata = {
  title: "Music Wheel App",
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
    title: "Music Wheel",
    description:
      "Interactive music theory application for exploring the chromatic circle",
    type: "website",
    url: "https://chromatic-circle-next.vercel.app",
    images: [
      {
        url: "https://chromatic-circle-next.vercel.app/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "Music Wheel Icon",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Music Wheel",
    description:
      "Interactive music theory application for exploring the chromatic circle",
  },
};

// Default view metadata
export const defaultViewMetadata: Metadata = {
  ...baseMetadata,
  title: "Music Wheel App - Intervals and Chords",
  keywords: ["black and white keys", "intervals", "chord presets"],
  description: "Exploring intervals and chords on the chromatic circle",
  openGraph: {
    ...baseMetadata.openGraph,
    title: "Default View - Music Wheel",
    description: "Exploring intervals and chords on the chromatic circle",
  },
  twitter: {
    ...baseMetadata.twitter,
    title: "Default View - Music Wheel",
    description:
      "Basic features for exploring music theory with the chromatic circle",
  },
};

// Advanced view metadata
export const advancedViewMetadata: Metadata = {
  ...baseMetadata,
  title: "Music Wheel App - Musical Modes and Scales",
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
    title: "Music Wheel App - Musical Modes and Scales",
    description: "Exploring musical modes and scales on the chromatic circle",
  },
  twitter: {
    ...baseMetadata.twitter,
    title: "Music Wheel App - Musical Modes and Scales",
    description: "Exploring musical modes and scales on the chromatic circle",
  },
};
