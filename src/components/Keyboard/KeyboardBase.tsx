import { useCallback } from "react";
import { ActualIndex } from "@/types/IndexTypes";

import { InputMode } from "@/types/SettingModes";
import { ChordUtils } from "@/utils/ChordUtils";
import { useMusical } from "@/contexts/MusicalContext";
import { useChordPresets } from "@/contexts/ChordPresetContext";

export const CIRCLE_RADIUS = 5;
export const useKeyboardHandlers = () => {
  const { selectedInversionIndex, selectedChordType, inputMode } =
    useChordPresets();
  const { selectedNoteIndices, setSelectedNoteIndices, currentChordRef } =
    useMusical();

  const handleKeyClick = useCallback(
    (newIndex: ActualIndex) => {
      const updatedIndices = ChordUtils.calculateUpdatedIndices(
        newIndex,
        inputMode === InputMode.Freeform,
        selectedNoteIndices,
        selectedChordType,
        selectedInversionIndex
      );
      setSelectedNoteIndices(updatedIndices);
    },
    [
      inputMode,
      selectedNoteIndices,
      selectedChordType,
      selectedInversionIndex,
      setSelectedNoteIndices,
    ]
  );

  const checkIsRootNote = useCallback(
    (index: ActualIndex) => {
      if (
        inputMode === InputMode.Freeform ||
        !ChordUtils.hasInversions(selectedChordType) ||
        !currentChordRef
      ) {
        return false;
      }
      // Use the rootNote directly from currentChordRef instead of trying to derive it
      return index === currentChordRef.rootNote;
    },
    [inputMode, selectedChordType, currentChordRef] // Remove selectedNoteIndices and selectedInversionIndex
  );

  return {
    handleKeyClick,
    checkIsRootNote,
  };
};
