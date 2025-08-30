"use client";

import React, { createContext, useState, useContext, ReactNode } from "react";

import { ChordType } from "@/types/enums/ChordType";
import { makeChordReference } from "@/types/interfaces/ChordReference";

import { InversionIndex, ixInversion } from "@/types/IndexTypes";
import { NoteGroupingId } from "@/types/NoteGroupingId";
import { InputMode } from "@/types/SettingModes";

import { ChordUtils } from "@/utils/ChordUtils";

import { useMusical } from "./MusicalContext";
export interface ChordPresetSettings {
  inputMode: InputMode;
  selectedChordType: NoteGroupingId;
  selectedInversionIndex: InversionIndex; // Add this back
  setInputMode: (mode: InputMode) => void;
  setSelectedChordType: (type: NoteGroupingId) => void;
  setSelectedInversionIndex: (index: InversionIndex) => void; // Add this back
}

const ChordPresetContext = createContext<ChordPresetSettings | null>(null);

export const ChordPresetProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [inputMode, setInputMode] = useState<InputMode>(InputMode.ChordPresets);
  const [selectedChordType, setSelectedChordType] = useState<NoteGroupingId>(
    ChordType.Major
  );
  const {
    selectedNoteIndices,
    setSelectedNoteIndices,
    setCurrentChordRef,
    currentChordRef,
  } = useMusical();

  // Consolidated inversion change handler
  const handleInversionChange = (newInversionIndex: InversionIndex) => {
    // Only update chord-related state if we're in preset mode
    if (
      inputMode !== InputMode.Freeform &&
      selectedNoteIndices.length > 0 &&
      currentChordRef
    ) {
      // Use the root note from the existing chord reference
      const originalRootIndex = currentChordRef.rootNote;

      // Calculate new note indices for the new inversion
      const updatedIndices = ChordUtils.calculateChordNotesFromIndex(
        originalRootIndex,
        selectedChordType,
        newInversionIndex
      );

      // Create new chord reference with the same root
      const chordRef = makeChordReference(
        originalRootIndex,
        selectedChordType,
        newInversionIndex
      );

      // Update both states atomically
      setSelectedNoteIndices(updatedIndices);
      setCurrentChordRef(chordRef);
    }
  };

  const handleInputModeChange = (newMode: InputMode) => {
    setInputMode(newMode);

    const rootNoteIndex = selectedNoteIndices[0] || null;
    let newChordType: NoteGroupingId;

    switch (newMode) {
      case InputMode.IntervalPresets:
        newChordType = "Interval_Maj3" as NoteGroupingId;
        break;
      case InputMode.ChordPresets:
        newChordType = "Chord_Maj" as NoteGroupingId;
        break;
      case InputMode.SingleNote:
        newChordType = "Note" as NoteGroupingId;
        break;
      case InputMode.Freeform:
        newChordType = "Freeform" as NoteGroupingId;
        break;
      default:
        newChordType = selectedChordType;
    }
    setSelectedChordType(newChordType);

    if (newMode !== InputMode.Freeform) {
      const updatedIndices = ChordUtils.calculateUpdatedIndices(
        rootNoteIndex!,
        false,
        selectedNoteIndices,
        newChordType
      );
      setSelectedNoteIndices(updatedIndices);

      const chordRef = makeChordReference(rootNoteIndex!, newChordType, 0);
      setCurrentChordRef(chordRef);
    } else {
      // In freeform mode, clear the chord match
      setCurrentChordRef(undefined);
    }
  };

  // Replace the direct setters with wrapped ones
  const handleChordTypeChange = (newChordType: NoteGroupingId) => {
    setSelectedChordType(newChordType);

    // Update currentChordMatch if we're in preset mode
    if (inputMode !== InputMode.Freeform && selectedNoteIndices.length > 0) {
      const rootNoteIndex = selectedNoteIndices[0];
      const chordRef = makeChordReference(
        rootNoteIndex,
        newChordType,
        currentChordRef?.inversionIndex ?? ixInversion(0)
      );
      setCurrentChordRef(chordRef);
    }
  };

  const selectedInversionIndex =
    currentChordRef?.inversionIndex ?? ixInversion(0);

  const value: ChordPresetSettings = {
    inputMode,
    selectedChordType,
    selectedInversionIndex, // Add this
    setInputMode: handleInputModeChange,
    setSelectedChordType: handleChordTypeChange,
    setSelectedInversionIndex: handleInversionChange, // Add this
  };

  return (
    <ChordPresetContext.Provider value={value}>
      {children}
    </ChordPresetContext.Provider>
  );
};

export const useIsChordsOrIntervals = () => {
  const { inputMode } = useChordPresets();
  return (
    inputMode === InputMode.ChordPresets ||
    inputMode === InputMode.IntervalPresets
  );
};

export const useChordPresets = () => {
  const context = useContext(ChordPresetContext);
  if (!context) {
    throw new Error("useChordPreset must be used within a ChordPresetProvider");
  }
  return context;
};
