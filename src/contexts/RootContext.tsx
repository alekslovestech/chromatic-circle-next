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

  //keys are used to force re-renders of the children when the global mode changes
  return (
    <MusicalProvider key={`musical-${globalMode}`}>
      <AudioProvider key={`audio-${globalMode}`}>
        <DisplayProvider key={`display-${globalMode}`}>
          <PresetProvider key={`preset-${globalMode}`}>
            {children}
          </PresetProvider>
        </DisplayProvider>
      </AudioProvider>
    </MusicalProvider>
  );
};
