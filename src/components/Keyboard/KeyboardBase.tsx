import { useCallback } from "react";
import { ActualIndex } from "@/types/IndexTypes";

import { InputMode } from "@/types/SettingModes";
import { ChordUtils } from "@/utils/ChordUtils";
import { useMusical } from "@/contexts/MusicalContext";
import { useChordPresets } from "@/contexts/ChordPresetContext";
import {
  ChordReference,
  makeChordReference,
} from "@/types/interfaces/ChordReference";
import { IndexUtils } from "@/utils/IndexUtils";

export const CIRCLE_RADIUS = 5;
export const useKeyboardHandlers = () => {
  const { selectedInversionIndex, selectedChordType, inputMode } =
    useChordPresets();
  const {
    selectedNoteIndices,
    setSelectedNoteIndices,
    currentChordRef,
    setCurrentChordRef,
  } = useMusical();

  const handleKeyClick = useCallback(
    (newIndex: ActualIndex) => {
      let updatedIndices: ActualIndex[] = [];
      let updatedChordRef: ChordReference | undefined;
      if (inputMode === InputMode.Freeform) {
        updatedIndices = IndexUtils.ToggleNewIndex(
          selectedNoteIndices,
          newIndex as ActualIndex
        );
      } //SingleNote, IntervalPresets, ChordPresets
      else {
        updatedChordRef = makeChordReference(
          newIndex,
          currentChordRef!.id,
          currentChordRef!.inversionIndex
        );
        updatedIndices = ChordUtils.calculateChordNotesFromBassNote(
          newIndex,
          selectedChordType,
          selectedInversionIndex
        );
      }
      setCurrentChordRef(updatedChordRef);
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
