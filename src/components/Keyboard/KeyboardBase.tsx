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
        !ChordUtils.hasInversions(selectedChordType)
      ) {
        return false;
      }
      // FIXED: We have inverted chord indices and know the current inversion
      const rootNote = ChordUtils.getRootNoteFromInvertedChord(
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
