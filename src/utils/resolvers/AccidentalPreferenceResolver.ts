import { AccidentalType } from "@/types/enums/AccidentalType";
import { ChordType } from "@/types/enums/ChordType";
import { ChordQuality } from "@/types/enums/ChordQuality";
import { IntervalType } from "@/types/enums/IntervalType";

import { NoteGroupingId } from "@/types/NoteGroupingId";
import { ChromaticIndex } from "@/types/ChromaticIndex";

import { IndexUtils } from "@/utils/IndexUtils";

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
      case ChordQuality.Minor_Interval:
        return IndexUtils.isBlackKey(rootChromaticIndex)
          ? AccidentalType.Sharp
          : AccidentalType.Flat;
      case ChordQuality.Major_Interval:
        return IndexUtils.isBlackKey(rootChromaticIndex)
          ? AccidentalType.Flat
          : AccidentalType.Sharp;

      case ChordQuality.Minor:
        return [0, 3, 5, 7, 10].includes(rootChromaticIndex)
          ? AccidentalType.Flat
          : AccidentalType.Sharp;
      case ChordQuality.Augmented:
        return [1, 3, 6, 8, 10].includes(rootChromaticIndex)
          ? AccidentalType.Flat
          : AccidentalType.Sharp;
      case ChordQuality.Major:
        return [0, 1, 3, 5, 8, 10].includes(rootChromaticIndex)
          ? AccidentalType.Flat
          : AccidentalType.Sharp;
      //optimal spelling not yet defined, or there's no preference
      default:
        return IndexUtils.isBlackKey(rootChromaticIndex)
          ? AccidentalType.Sharp
          : AccidentalType.Flat;
    }
  }

  private static getChordQuality(chordType: NoteGroupingId): ChordQuality {
    switch (chordType) {
      case IntervalType.Minor2:
      case IntervalType.Minor3:
      case IntervalType.Minor6:
      case IntervalType.Minor7:
      case IntervalType.Fourth:
        return ChordQuality.Minor_Interval;

      case IntervalType.Major2:
      case IntervalType.Major3:
      case IntervalType.Major6:
      case IntervalType.Major7:
      case IntervalType.Fifth:
        return ChordQuality.Major_Interval;

      case ChordType.Minor:
      case ChordType.Minor7:
      case ChordType.Minor6:
      case ChordType.Diminished:
      case ChordType.HalfDiminished:
      case ChordType.Diminished7:
      case ChordType.MinorMajor7:
      case ChordType.SpreadMinor:
      case ChordType.SpreadDiminished:
      case ChordType.MajFlat5:
        return ChordQuality.Minor;

      case ChordType.Augmented:
      case ChordType.AugMajor7:
      case ChordType.SpreadAugmented:
        return ChordQuality.Augmented;

      case ChordType.Major:
      case ChordType.Major7:
      case ChordType.Dominant7:
      case ChordType.Six:
      case ChordType.SpreadMajor:
        return ChordQuality.Major;

      default:
        return ChordQuality.Other;
    }
  }
}
