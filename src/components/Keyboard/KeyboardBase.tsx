import { useCallback } from "react";
import { ActualIndex } from "@/types/IndexTypes";

import { InputMode } from "@/types/SettingModes";
import { ChordUtils } from "@/utils/ChordUtils";
import { useMusical } from "@/contexts/MusicalContext";
import { useChordPresets } from "@/contexts/ChordPresetContext";
import { IndexUtils } from "@/utils/IndexUtils";

export const CIRCLE_RADIUS = 5;
export const useKeyboardHandlers = () => {
  const { inputMode } = useChordPresets();
  const {
    selectedNoteIndices,
    setSelectedNoteIndices,
    currentChordRef,
    setChordRootNote, // Use the new setter
  } = useMusical();

  const handleKeyClick = useCallback(
    (newRootIndex: ActualIndex) => {
      if (inputMode === InputMode.Freeform) {
        const updatedIndices = IndexUtils.ToggleNewIndex(
          selectedNoteIndices,
          newRootIndex as ActualIndex
        );
        setSelectedNoteIndices(updatedIndices);
      } else if (currentChordRef) {
        // Add null check
        // Use the new ergonomic setter instead of makeChordReference
        setChordRootNote(newRootIndex);

        // Still need to update note indices
        const updatedChordRef = {
          ...currentChordRef,
          rootNote: newRootIndex,
        };
        const updatedIndices =
          ChordUtils.calculateChordNotesFromChordReference(updatedChordRef);
        setSelectedNoteIndices(updatedIndices);
      }
    },
    [
      inputMode,
      selectedNoteIndices,
      setSelectedNoteIndices,
      currentChordRef,
      setChordRootNote,
    ]
  );

  const checkIsRootNote = useCallback(
    (index: ActualIndex) => {
      if (
        inputMode === InputMode.Freeform ||
        !currentChordRef || // Check currentChordRef first
        !ChordUtils.hasInversions(currentChordRef.id)
      ) {
        return false;
      }
      return index === currentChordRef.rootNote;
    },
    [inputMode, currentChordRef]
  );

  return {
    handleKeyClick,
    checkIsRootNote,
  };
};
