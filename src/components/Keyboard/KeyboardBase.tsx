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
    setChordRootNote,
    setChordBassNote, // Add this import
  } = useMusical();

  const handleKeyClick = useCallback(
    (clickedIndex: ActualIndex) => {
      if (inputMode === InputMode.Freeform) {
        // Freeform mode: directly toggle notes (no chord reference)
        const updatedIndices = IndexUtils.ToggleNewIndex(
          selectedNoteIndices,
          clickedIndex as ActualIndex
        );
        setSelectedNoteIndices(updatedIndices);
      } else if (currentChordRef) {
        // Chord mode: update via chord reference (reactive pattern)
        if (currentChordRef.inversionIndex === 0) {
          // Root position: clicked note becomes the new root note
          setChordRootNote(clickedIndex);
        } else {
          // Inversion: clicked note becomes the new bass note
          setChordBassNote(clickedIndex);
        }
        // Note: Don't call setSelectedNoteIndices here - let the useEffect handle it
      }
    },
    [
      inputMode,
      selectedNoteIndices,
      setSelectedNoteIndices, // Still needed for freeform mode
      currentChordRef,
      setChordRootNote,
      setChordBassNote,
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
