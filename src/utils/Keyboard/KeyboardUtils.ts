import { ChromaticIndex } from "@/types/ChromaticIndex";
import { ActualIndex, chromaticToActual } from "@/types/IndexTypes";
import { MusicalKey } from "@/types/Keys/MusicalKey";
import { NoteGroupingId } from "@/types/NoteGroupingId";
import { KeyDisplayMode } from "@/types/SettingModes";

import { SpellingUtils } from "@/utils/SpellingUtils";
import { NoteFormatter } from "@/utils/formatters/NoteFormatter";
import { IndexUtils } from "@/utils/IndexUtils";
import { MusicalKeyFormatter } from "@/utils/formatters/MusicalKeyFormatter";

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
  static computeNoteTextForScalesMode(
    chromaticIndex: ChromaticIndex,
    selectedMusicalKey: MusicalKey
  ): string {
    const isDiatonic = selectedMusicalKey.greekModeInfo.isDiatonicNote(
      chromaticIndex,
      selectedMusicalKey.tonicIndex
    );

    return !isDiatonic
      ? ""
      : MusicalKeyFormatter.getDisplayString(
          selectedMusicalKey,
          chromaticIndex,
          KeyDisplayMode.NoteNames
        );
  }

  static computeNoteTextForDefaultMode(
    chromaticIndex: ChromaticIndex,
    isSelected: boolean,
    selectedNoteIndices: ActualIndex[],
    selectedMusicalKey: MusicalKey,
    selectedChordType: NoteGroupingId,
    isChordsOrIntervals: boolean
  ): string {
    const isBlackKey = IndexUtils.isBlackKey(chromaticIndex);

    // White keys: always show note text using key signature
    if (!isBlackKey) {
      return MusicalKeyFormatter.getDisplayString(
        selectedMusicalKey,
        chromaticIndex,
        KeyDisplayMode.NoteNames
      );
    }

    // Black keys: only show when selected, using chord context spelling
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
