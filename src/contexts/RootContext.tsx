"use client";

import React, { ReactNode } from "react";
import { useGlobalMode } from "@/lib/hooks";

import { DisplayProvider } from "./DisplayContext";
import { MusicalProvider } from "./MusicalContext";
import { PresetProvider } from "./PresetContext";
import { AudioProvider } from "./AudioContext";

export const RootProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const globalMode = useGlobalMode();

  return (
    <MusicalProvider key={`musical-${globalMode}`}>
      <DisplayProvider key={`display-${globalMode}`}>
        <AudioProvider>
          {/* Remove the key - don't reset audio */}
          <PresetProvider key={`preset-${globalMode}`}>
            {children}
          </PresetProvider>
        </AudioProvider>
      </DisplayProvider>
    </MusicalProvider>
  );
};
