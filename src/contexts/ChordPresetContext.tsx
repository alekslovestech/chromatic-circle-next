"use client";

import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from "react";

import { ChordType } from "@/types/enums/ChordType";
import { InversionIndex, ixInversion } from "@/types/IndexTypes";
import { NoteGroupingId } from "@/types/NoteGroupingId";
import { InputMode } from "@/types/SettingModes";

import { ChordUtils } from "@/utils/ChordUtils";

import { useMusical } from "./MusicalContext";
import { makeChordMatch } from "@/types/interfaces/ChordMatch";
import { NoteGroupingLibrary } from "@/types/NoteGroupingLibrary";

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
  const [inputMode, setInputMode] = useState<InputMode>(InputMode.ChordPresets);
  const [selectedChordType, setSelectedChordType] = useState<NoteGroupingId>(
    ChordType.Major
  );
  const [selectedInversionIndex, setSelectedInversionIndex] =
    useState<InversionIndex>(ixInversion(0));

  const { selectedNoteIndices, setSelectedNoteIndices, setCurrentChordMatch } =
    useMusical();

  // Add this useEffect to update currentChordMatch when notes change
  useEffect(() => {
    // Update currentChordMatch when selectedNoteIndices changes in preset mode
    if (inputMode !== InputMode.Freeform && selectedNoteIndices.length > 0) {
      const rootNoteIndex = selectedNoteIndices[0];
      const chordMatch = makeChordMatch(
        rootNoteIndex,
        NoteGroupingLibrary.getGroupingById(selectedChordType),
        selectedInversionIndex
      );
      setCurrentChordMatch(chordMatch);
    } else if (inputMode === InputMode.Freeform) {
      setCurrentChordMatch(undefined);
    }
  }, [
    selectedNoteIndices,
    inputMode,
    selectedChordType,
    selectedInversionIndex,
  ]);

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
        newChordType
      );
      setSelectedNoteIndices(updatedIndices);

      // Also set the ChordMatch directly - no reverse engineering needed!
      const chordMatch = makeChordMatch(
        rootNoteIndex!,
        NoteGroupingLibrary.getGroupingById(newChordType),
        0
      );
      setCurrentChordMatch(chordMatch);
    } else {
      // In freeform mode, clear the chord match
      setCurrentChordMatch(undefined);
    }
  };

  // Replace the direct setters with wrapped ones
  const handleChordTypeChange = (newChordType: NoteGroupingId) => {
    setSelectedChordType(newChordType);

    // Update currentChordMatch if we're in preset mode
    if (inputMode !== InputMode.Freeform && selectedNoteIndices.length > 0) {
      const rootNoteIndex = selectedNoteIndices[0];
      const chordMatch = makeChordMatch(
        rootNoteIndex,
        NoteGroupingLibrary.getGroupingById(newChordType),
        selectedInversionIndex
      );
      setCurrentChordMatch(chordMatch);
    }
  };

  const handleInversionChange = (newInversionIndex: InversionIndex) => {
    setSelectedInversionIndex(newInversionIndex);

    // Update currentChordMatch if we're in preset mode
    if (inputMode !== InputMode.Freeform && selectedNoteIndices.length > 0) {
      const rootNoteIndex = selectedNoteIndices[0];
      const chordMatch = makeChordMatch(
        rootNoteIndex,
        NoteGroupingLibrary.getGroupingById(selectedChordType),
        newInversionIndex
      );
      setCurrentChordMatch(chordMatch);
    }
  };

  // Export the wrapped setters instead
  const value: ChordPresetSettings = {
    inputMode,
    selectedChordType,
    selectedInversionIndex,
    setInputMode: handleInputModeChange,
    setSelectedChordType: handleChordTypeChange,
    setSelectedInversionIndex: handleInversionChange,
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
