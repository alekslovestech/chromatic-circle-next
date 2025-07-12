"use client";

import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from "react";
import {
  CircularVisMode,
  ChordDisplayMode,
  KeyDisplayMode,
} from "@/types/SettingModes";
import { useGlobalMode, GlobalMode } from "@/lib/hooks";

export interface DisplaySettings {
  circularVisMode: CircularVisMode;
  monochromeMode: boolean;
  scalePreviewMode: boolean;
  keyTextMode: KeyDisplayMode;
  chordDisplayMode: ChordDisplayMode;
  setCircularVisMode: (mode: CircularVisMode) => void;
  setMonochromeMode: (mode: boolean) => void;
  setScalePreviewMode: (mode: boolean) => void;
  setKeyTextMode: (mode: KeyDisplayMode) => void;
  setChordDisplayMode: (mode: ChordDisplayMode) => void;
}

const DisplayContext = createContext<DisplaySettings | null>(null);

export const DisplayProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  // Get globalMode from hook
  const globalMode = useGlobalMode();
  const isAdvanced = globalMode === GlobalMode.Advanced;

  const [circularVisMode, setCircularVisMode] = useState<CircularVisMode>(
    isAdvanced ? CircularVisMode.Polygon : CircularVisMode.None
  );
  const [scalePreviewMode, setScalePreviewMode] = useState<boolean>(isAdvanced);
  const [keyTextMode, setKeyTextMode] = useState<KeyDisplayMode>(
    isAdvanced ? KeyDisplayMode.ScaleDegree : KeyDisplayMode.NoteNames
  );
  const [chordDisplayMode, setChordDisplayMode] = useState<ChordDisplayMode>(
    ChordDisplayMode.Letters_Short
  );

  const [monochromeMode, setMonochromeMode] = useState<boolean>(isAdvanced);

  const value: DisplaySettings = {
    circularVisMode,
    monochromeMode,
    scalePreviewMode,
    keyTextMode,
    chordDisplayMode,
    setCircularVisMode,
    setMonochromeMode,
    setScalePreviewMode,
    setKeyTextMode,
    setChordDisplayMode,
  };

  return (
    <DisplayContext.Provider value={value}>{children}</DisplayContext.Provider>
  );
};

export const useDisplay = () => {
  const context = useContext(DisplayContext);
  if (!context) {
    throw new Error("useDisplay must be used within a DisplayProvider");
  }
  return context;
};
