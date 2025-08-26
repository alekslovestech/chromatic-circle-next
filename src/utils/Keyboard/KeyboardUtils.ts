import { KeyDisplayMode } from "@/types/enums/KeyDisplayMode";

import { ChromaticIndex } from "@/types/ChromaticIndex";
import { ActualIndex, chromaticToActual } from "@/types/IndexTypes";
import { MusicalKey } from "@/types/Keys/MusicalKey";
import { NoteGroupingId } from "@/types/NoteGroupingId";

import { SpellingUtils } from "@/utils/SpellingUtils";
import { NoteFormatter } from "@/utils/formatters/NoteFormatter";
import { IndexUtils } from "@/utils/IndexUtils";
import { MusicalKeyFormatter } from "@/utils/formatters/MusicalKeyFormatter";
import { MusicalDisplayFormatter } from "../formatters/MusicalDisplayFormatter";
import { ActualNoteResolver } from "../resolvers/ActualNoteResolver";

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
    selectedMusicalKey: MusicalKey,
    keyDisplayMode: KeyDisplayMode
  ): string {
    const isDiatonic = selectedMusicalKey.scaleModeInfo.isDiatonicNote(
      chromaticIndex,
      selectedMusicalKey.tonicIndex
    );

    return !isDiatonic
      ? ""
      : MusicalKeyFormatter.formatNoteForDisplay(
          selectedMusicalKey,
          chromaticIndex,
          keyDisplayMode
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
      return MusicalKeyFormatter.formatNoteForDisplay(
        selectedMusicalKey,
        chromaticIndex,
        KeyDisplayMode.NoteNames
      );
    }

    // Black keys: only show when selected
    if (!isSelected) return "";

    const isChordPresetKnown = SpellingUtils.isChordPresetKnown(
      selectedChordType,
      isChordsOrIntervals
    );

    const targetNoteIndex = chromaticToActual(chromaticIndex);

    if (isChordPresetKnown) {
      const chordMatch =
        MusicalDisplayFormatter.getMatchFromIndices(selectedNoteIndices);
      const spelledNote = SpellingUtils.computeSingleNoteFromChordPreset(
        targetNoteIndex,
        selectedNoteIndices,
        chordMatch
      );
      return NoteFormatter.formatForDisplay(spelledNote);
    } else {
      const spelledNote = ActualNoteResolver.resolveNoteInKeyWithOctave(
        selectedMusicalKey,
        targetNoteIndex
      );
      return NoteFormatter.formatForDisplay(spelledNote);
    }
  }
}
