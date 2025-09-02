"use client";

import React, { createContext, useState, useContext, ReactNode } from "react";

import { makeChordReference } from "@/types/interfaces/ChordReference";

import { NoteGroupingId } from "@/types/NoteGroupingId";
import { SpecialType } from "@/types/enums/SpecialType";
import { InputMode } from "@/types/SettingModes";

import { ChordUtils } from "@/utils/ChordUtils";

import { useMusical } from "./MusicalContext";
export interface ChordPresetSettings {
  inputMode: InputMode;
  setInputMode: (mode: InputMode) => void;
}

const ChordPresetContext = createContext<ChordPresetSettings | null>(null);

export const ChordPresetProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [inputMode, setInputMode] = useState<InputMode>(InputMode.ChordPresets);
  const { selectedNoteIndices, setSelectedNoteIndices, setCurrentChordRef } =
    useMusical();

  const handleInputModeChange = (newMode: InputMode) => {
    setInputMode(newMode);

    const rootNoteIndex = selectedNoteIndices[0] || null;
    let newChordType: NoteGroupingId = SpecialType.None;

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
        console.assert(false, "Invalid input mode");
    }
    setCurrentChordRef(makeChordReference(rootNoteIndex!, newChordType));

    if (newMode !== InputMode.Freeform) {
      const updatedIndices = ChordUtils.calculateChordNotesFromBassNote(
        rootNoteIndex!,
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

  const value: ChordPresetSettings = {
    inputMode,
    setInputMode: handleInputModeChange,
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
