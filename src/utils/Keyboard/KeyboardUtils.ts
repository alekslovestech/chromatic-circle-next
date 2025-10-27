import { KeyDisplayMode } from "@/types/enums/KeyDisplayMode";
import { AccidentalType } from "@/types/enums/AccidentalType";

import {
  addChromatic,
  ChromaticIndex,
  subChromatic,
} from "@/types/ChromaticIndex";
import { ActualIndex, chromaticToActual } from "@/types/IndexTypes";
import { MusicalKey } from "@/types/Keys/MusicalKey";

import { IndexUtils } from "@/utils/IndexUtils";
import { NoteFormatter } from "@/utils/formatters/NoteFormatter";
import { MusicalKeyFormatter } from "@/utils/formatters/MusicalKeyFormatter";
import { ChromaticNoteResolver } from "@/utils/resolvers/ChromaticNoteResolver";

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

  static computeNoteTextForDefaultMode(chromaticIndex: ChromaticIndex): string {
    if (IndexUtils.isBlackKey(chromaticIndex)) return "";
    const resolvedNote = ChromaticNoteResolver.resolveAbsoluteNote(
      chromaticIndex,
      AccidentalType.Sharp // Use sharp as default
    );
    return NoteFormatter.formatForDisplay(resolvedNote);
  }

  //returns true if the next or previous chromatic index is a black key
  static getAccidentalState(chromaticIndex: ChromaticIndex) {
    const nextIsBlack = IndexUtils.isBlackKey(addChromatic(chromaticIndex, 1));
    const prevIsBlack = IndexUtils.isBlackKey(subChromatic(chromaticIndex, 1));
    return { nextIsBlack, prevIsBlack };
  }

  static buildKeyClasses(
    baseClasses: string[],
    isSelected: boolean,
    isShortKey: boolean,
    isScales: boolean,
    isBassNote: boolean
  ): string {
    const classes = [...baseClasses];
    if (isSelected) classes.push("selected");
    if (isShortKey) classes.push("short");
    if (isScales) classes.push("disabled");
    if (isBassNote) classes.push("root-note");
    return classes.join(" ");
  }

  static getNoteText(
    isLinearKeyboard: boolean,
    chromaticIndex: ChromaticIndex,
    isScales: boolean,
    selectedMusicalKey: MusicalKey
  ): string {
    return isScales && !isLinearKeyboard
      ? KeyboardUtils.computeNoteTextForScalesMode(
          chromaticIndex,
          selectedMusicalKey,
          KeyDisplayMode.ScaleDegree
        )
      : KeyboardUtils.computeNoteTextForDefaultMode(chromaticIndex);
  }
}
