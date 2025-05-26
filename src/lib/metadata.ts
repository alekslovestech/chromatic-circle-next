import type { Metadata, Viewport } from "next";

// Viewport configuration
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

// Base metadata shared across the application
const baseMetadata = {
  title: "Chromatic Circle",
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
} as const;

// Default metadata for the root layout
export const defaultMetadata: Metadata = {
  ...baseMetadata,
};

// Advanced view metadata
export const advancedMetadata: Metadata = {
  ...baseMetadata,
  title: "Advanced View - Chromatic Circle",
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
