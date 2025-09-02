"use client";

import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from "react";

import { ChordType } from "@/types/enums/ChordType";
import { ActualIndex, InversionIndex, ixActualArray } from "@/types/IndexTypes";
import { DEFAULT_MUSICAL_KEY, MusicalKey } from "@/types/Keys/MusicalKey";
import { useIsScalePreviewMode } from "@/lib/hooks/useGlobalMode";
import {
  ChordReference,
  makeChordReference,
} from "@/types/interfaces/ChordReference";

import { ChordUtils } from "@/utils/ChordUtils";
import { NoteGroupingId } from "@/types/NoteGroupingId";

export interface MusicalSettings {
  selectedNoteIndices: ActualIndex[];
  selectedMusicalKey: MusicalKey;
  currentChordRef?: ChordReference;
  setSelectedNoteIndices: (indices: ActualIndex[]) => void;
  setSelectedMusicalKey: (key: MusicalKey) => void;
  setCurrentChordRef: (chordRef?: ChordReference) => void;

  // New ergonomic setters
  setChordRootNote: (rootNote: ActualIndex) => void;
  setChordType: (chordType: NoteGroupingId) => void;
  setChordInversion: (inversionIndex: InversionIndex) => void;
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
  const [currentChordRef, setCurrentChordRef] = useState<
    ChordReference | undefined
  >(
    // Create initial chord reference to match the initial notes [7, 11, 14] = G major
    isScales ? undefined : makeChordReference(7, ChordType.Major, 0) // G major root position
  );

  const setChordRootNote = (rootNote: ActualIndex) => {
    if (!currentChordRef) return;
    setCurrentChordRef({
      ...currentChordRef,
      rootNote,
    });
  };

  const setChordType = (id: NoteGroupingId) => {
    if (!currentChordRef) return;
    setCurrentChordRef({
      ...currentChordRef,
      id,
    });
  };

  const setChordInversion = (inversionIndex: InversionIndex) => {
    if (!currentChordRef) return;
    setCurrentChordRef({
      ...currentChordRef,
      inversionIndex,
    });
  };

  const value: MusicalSettings = {
    selectedNoteIndices,
    selectedMusicalKey,
    currentChordRef,
    setSelectedNoteIndices,
    setSelectedMusicalKey,
    setCurrentChordRef,
    setChordRootNote,
    setChordType,
    setChordInversion,
  };

  useEffect(() => {
    if (selectedNoteIndices.length === 0) return;
    const bassNoteIndex = selectedNoteIndices[0];
    const updatedIndices = ChordUtils.calculateChordNotesFromBassNote(
      bassNoteIndex,
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
