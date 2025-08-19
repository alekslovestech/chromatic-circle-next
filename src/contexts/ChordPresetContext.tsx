"use client";

import React, { createContext, useState, useContext, ReactNode } from "react";

import { InversionIndex, ixInversion } from "@/types/IndexTypes";
import { NoteGroupingId } from "@/types/NoteGroupingId";
import { InputMode } from "@/types/SettingModes";
import { ChordUtils } from "@/utils/ChordUtils";

import { useMusical } from "./MusicalContext";

export interface ChordPresetSettings {
  inputMode: InputMode;
  selectedChordType: NoteGroupingId;
  selectedInversionIndex: InversionIndex;
  setInputMode: (mode: InputMode) => void;
  setSelectedChordType: (type: NoteGroupingId) => void;
  setSelectedInversionIndex: (index: InversionIndex) => void;
}

const ChordPresetContext = createContext<ChordPresetSettings | null>(null);

export const ChordPresetProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [inputMode, setInputMode] = useState<InputMode>(InputMode.SingleNote);
  const [selectedChordType, setSelectedChordType] = useState<NoteGroupingId>(
    "Note" as NoteGroupingId
  );
  const [selectedInversionIndex, setSelectedInversionIndex] =
    useState<InversionIndex>(ixInversion(0));

  const { selectedNoteIndices, setSelectedNoteIndices } = useMusical();

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
    setSelectedInversionIndex(ixInversion(0));

    if (newMode !== InputMode.Freeform) {
      const updatedIndices = ChordUtils.calculateUpdatedIndices(
        rootNoteIndex!,
        false,
        selectedNoteIndices,
        newChordType,
        ixInversion(0)
      );
      setSelectedNoteIndices(updatedIndices);
    }
  };

  const value: ChordPresetSettings = {
    inputMode,
    selectedChordType,
    selectedInversionIndex,
    setInputMode: handleInputModeChange,
    setSelectedChordType,
    setSelectedInversionIndex,
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
