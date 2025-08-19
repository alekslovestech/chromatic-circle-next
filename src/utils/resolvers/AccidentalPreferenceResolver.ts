import { AccidentalType } from "@/types/enums/AccidentalType";
import { NoteGroupingId } from "@/types/NoteGroupingId";
import { ChordType } from "@/types/enums/ChordType";
import { ChromaticIndex } from "@/types/ChromaticIndex";

import { IndexUtils } from "@/utils/IndexUtils";

export class AccidentalPreferenceResolver {
  static getChordPresetSpellingPreference(
    chordType: NoteGroupingId,
    rootChromaticIndex: ChromaticIndex
  ): AccidentalType {
    const isMinorQuality = this.isMinorQualityChord(chordType);
    const isBlackKeyRoot = IndexUtils.isBlackKey(rootChromaticIndex);
    return isBlackKeyRoot === isMinorQuality
      ? AccidentalType.Sharp
      : AccidentalType.Flat;
  }

  private static isMinorQualityChord(chordType: NoteGroupingId): boolean {
    return [
      ChordType.Minor,
      ChordType.Diminished,
      ChordType.Minor7,
      ChordType.HalfDiminished,
      ChordType.Diminished7,
      ChordType.Minor6,
      ChordType.SpreadMinor,
      ChordType.SpreadDiminished,
    ].includes(chordType as ChordType);
  }
}
