import { ChromaticIndex } from "@/types/ChromaticIndex";
import { ActualIndex, chromaticToActual } from "@/types/IndexTypes";
import { MusicalKey } from "@/types/Keys/MusicalKey";
import { NoteGroupingId } from "@/types/NoteGroupingId";

import { SpellingUtils } from "@/utils/SpellingUtils";
import { NoteFormatter } from "@/utils/formatters/NoteFormatter";

export class KeyboardUtils {
  static StringWithPaddedIndex(prefix: string, index: number): string {
    return `${prefix}${String(index).padStart(2, "0")}`;
  }

  static isSelectedEitherOctave(
    chromaticIndex: ChromaticIndex,
    selectedNoteIndices: ActualIndex[]
  ): boolean {
    const actualIndex0 = chromaticToActual(chromaticIndex, 0);
    const actualIndex1 = chromaticToActual(chromaticIndex, 1);
    return (
      selectedNoteIndices.includes(actualIndex0) ||
      selectedNoteIndices.includes(actualIndex1)
    );
  }

  // Computes the note text to display on a keyboard key based on chord context
  static computeNoteText(
    chromaticIndex: ChromaticIndex,
    isSelected: boolean,
    selectedNoteIndices: ActualIndex[],
    selectedMusicalKey: MusicalKey,
    selectedChordType: NoteGroupingId,
    isChordsOrIntervals: boolean
  ): string {
    return !isSelected
      ? ""
      : NoteFormatter.formatForDisplay(
          SpellingUtils.computeSpecificNoteInChordContext(
            chromaticToActual(chromaticIndex),
            selectedNoteIndices,
            selectedMusicalKey,
            selectedChordType,
            isChordsOrIntervals
          )
        );
  }
}
