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
  const { inputMode } = useChordPresets();
  const {
    selectedNoteIndices,
    setSelectedNoteIndices,
    currentChordRef,
    setCurrentChordRef,
  } = useMusical();

  const handleKeyClick = useCallback(
    (newRootIndex: ActualIndex) => {
      let updatedIndices: ActualIndex[] = [];
      let updatedChordRef: ChordReference | undefined;
      if (inputMode === InputMode.Freeform) {
        updatedIndices = IndexUtils.ToggleNewIndex(
          selectedNoteIndices,
          newRootIndex as ActualIndex
        );
        setSelectedNoteIndices(updatedIndices);
      } //SingleNote, IntervalPresets, ChordPresets
      else {
        updatedChordRef = makeChordReference(
          newRootIndex,
          currentChordRef!.id,
          currentChordRef!.inversionIndex
        );
        setCurrentChordRef(updatedChordRef);

        updatedIndices =
          ChordUtils.calculateChordNotesFromChordReference(updatedChordRef);

        setSelectedNoteIndices(updatedIndices);
      }
    },
    [inputMode, selectedNoteIndices, setSelectedNoteIndices]
  );

  const checkIsRootNote = useCallback(
    (index: ActualIndex) => {
      if (
        inputMode === InputMode.Freeform ||
        !ChordUtils.hasInversions(currentChordRef!.id) ||
        !currentChordRef
      ) {
        return false;
      }
      // Use the rootNote directly from currentChordRef instead of trying to derive it
      return index === currentChordRef.rootNote;
    },
    [inputMode, currentChordRef]
  );

  return {
    handleKeyClick,
    checkIsRootNote,
  };
};
