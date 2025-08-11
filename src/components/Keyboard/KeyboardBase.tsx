import { useCallback } from "react";
import { ActualIndex } from "@/types/IndexTypes";

import { InputMode } from "@/types/SettingModes";
import { IndexUtils } from "@/utils/IndexUtils";
import { ChordUtils } from "@/utils/ChordUtils";
import { useMusical } from "@/contexts/MusicalContext";
import { useChordPresets } from "@/contexts/ChordPresetContext";

export const CIRCLE_RADIUS = 5;
export const useKeyboardHandlers = () => {
  const { selectedInversionIndex, selectedChordType, inputMode } =
    useChordPresets();
  const { selectedNoteIndices, setSelectedNoteIndices } = useMusical();

  const handleKeyClick = useCallback(
    (newIndex: ActualIndex) => {
      const updatedIndices = ChordUtils.calculateUpdatedIndices(
        newIndex,
        inputMode === InputMode.Toggle,
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
        inputMode === InputMode.Toggle ||
        !ChordUtils.hasInversions(selectedChordType)
      ) {
        return false;
      }
      const rootNote = IndexUtils.rootNoteAtInversion(
        selectedNoteIndices,
        selectedInversionIndex
      );
      return index === rootNote;
    },
    [selectedNoteIndices, selectedInversionIndex, inputMode, selectedChordType]
  );

  return {
    handleKeyClick,
    checkIsRootNote,
  };
};
