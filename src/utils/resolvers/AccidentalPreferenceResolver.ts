import { AccidentalType } from "@/types/enums/AccidentalType";
import { ChordType } from "@/types/enums/ChordType";
import { ChordQuality } from "@/types/enums/ChordQuality";

import { NoteGroupingId } from "@/types/NoteGroupingId";
import { ChromaticIndex } from "@/types/ChromaticIndex";

export class AccidentalPreferenceResolver {
  static getChordPresetSpellingPreference(
    chordType: NoteGroupingId,
    rootChromaticIndex: ChromaticIndex
  ): AccidentalType {
    const chordQuality = this.getChordQuality(chordType);

    return this.getChordAccidentalPreference(chordQuality, rootChromaticIndex);
  }

  private static getChordAccidentalPreference(
    chordQuality: ChordQuality,
    rootChromaticIndex: ChromaticIndex
  ): AccidentalType {
    switch (chordQuality) {
      case ChordQuality.Minor:
        return [0, 3, 5, 7, 10].includes(rootChromaticIndex)
          ? AccidentalType.Flat
          : AccidentalType.Sharp;
      case ChordQuality.Augmented:
        return [1, 3, 6, 10].includes(rootChromaticIndex)
          ? AccidentalType.Flat
          : AccidentalType.Sharp;
      default:
        return [0, 1, 3, 5, 8, 10].includes(rootChromaticIndex)
          ? AccidentalType.Flat
          : AccidentalType.Sharp;
    }
  }

  private static getChordQuality(chordType: NoteGroupingId): ChordQuality {
    switch (chordType) {
      case ChordType.Minor:
      case ChordType.Diminished:
      case ChordType.Minor7:
      case ChordType.HalfDiminished:
      case ChordType.Diminished7:
      case ChordType.Minor6:
      case ChordType.SpreadMinor:
      case ChordType.SpreadDiminished:
        return ChordQuality.Minor;
      case ChordType.Augmented:
      case ChordType.AugMajor7:
      case ChordType.SpreadAugmented:
        return ChordQuality.Augmented;
      default:
        return ChordQuality.Major;
    }
  }
}
