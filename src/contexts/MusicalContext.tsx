"use client";

import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from "react";

import { ChordType } from "@/types/enums/ChordType";
import { ChordMatch } from "@/types/interfaces/ChordMatch";
import { ActualIndex, ixActualArray } from "@/types/IndexTypes";
import { DEFAULT_MUSICAL_KEY, MusicalKey } from "@/types/Keys/MusicalKey";
import { useIsScalePreviewMode } from "@/lib/hooks/useGlobalMode";

import { ChordUtils } from "@/utils/ChordUtils";

export interface MusicalSettings {
  selectedNoteIndices: ActualIndex[];
  selectedMusicalKey: MusicalKey;
  currentChordMatch?: ChordMatch;
  setSelectedNoteIndices: (indices: ActualIndex[]) => void;
  setSelectedMusicalKey: (key: MusicalKey) => void;
  setCurrentChordMatch: (chordMatch?: ChordMatch) => void;
}

const MusicalContext = createContext<MusicalSettings | null>(null);

export const MusicalProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const isScales = useIsScalePreviewMode();
  const [selectedNoteIndices, setSelectedNoteIndices] = useState<ActualIndex[]>(
    isScales ? [] : ixActualArray([7, 11, 14])
  );
  const [selectedMusicalKey, setSelectedMusicalKey] =
    useState<MusicalKey>(DEFAULT_MUSICAL_KEY);
  const [currentChordMatch, setCurrentChordMatch] = useState<
    ChordMatch | undefined
  >(undefined);
  const value: MusicalSettings = {
    selectedNoteIndices,
    selectedMusicalKey,
    currentChordMatch,
    setSelectedNoteIndices,
    setSelectedMusicalKey,
    setCurrentChordMatch,
  };

  useEffect(() => {
    if (selectedNoteIndices.length === 0) return;
    const rootNoteIndex = selectedNoteIndices[0];
    const updatedIndices = ChordUtils.calculateUpdatedIndices(
      rootNoteIndex,
      false,
      selectedNoteIndices,
      ChordType.Major
    );
    setSelectedNoteIndices(updatedIndices);
  }, []); //update indices on mount

  return (
    <MusicalContext.Provider value={value}>{children}</MusicalContext.Provider>
  );
};

export const useMusical = () => {
  const context = useContext(MusicalContext);
  if (!context) {
    throw new Error("useMusical must be used within a MusicalProvider");
  }
  return context;
};
