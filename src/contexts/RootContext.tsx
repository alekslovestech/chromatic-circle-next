"use client";

import React, { ReactNode, useEffect } from "react";
import { useGlobalMode } from "@/lib/hooks";
import { initPH } from "@/lib/ph";

import { DisplayProvider } from "./DisplayContext";
import { MusicalProvider } from "./MusicalContext";
import { ChordPresetProvider } from "./ChordPresetContext";
import { AudioProvider } from "./AudioContext";

export const RootProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const globalMode = useGlobalMode();

  // Initialize PostHog on mount
  useEffect(() => {
    initPH();
  }, []);

  return (
    <MusicalProvider key={`musical-${globalMode}`}>
      <DisplayProvider key={`display-${globalMode}`}>
        <AudioProvider>
          {/* Remove the key - don't reset audio */}
          <ChordPresetProvider key={`chord-preset-${globalMode}`}>
            {children}
          </ChordPresetProvider>
        </AudioProvider>
      </DisplayProvider>
    </MusicalProvider>
  );
};
