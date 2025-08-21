import { AccidentalType } from "@/types/enums/AccidentalType";
import { NoteGroupingId } from "@/types/NoteGroupingId";
import { ChordType } from "@/types/enums/ChordType";
import { ChromaticIndex } from "@/types/ChromaticIndex";

export class AccidentalPreferenceResolver {
  static getChordPresetSpellingPreference(
    chordType: NoteGroupingId,
    rootChromaticIndex: ChromaticIndex
  ): AccidentalType {
    const isMinorQuality = this.isMinorQualityChord(chordType);

    return isMinorQuality
      ? this.getMinorChordAccidentalPreference(rootChromaticIndex)
      : this.getMajorChordAccidentalPreference(rootChromaticIndex);
  }

  private static getMinorChordAccidentalPreference(
    rootChromaticIndex: ChromaticIndex
  ): AccidentalType {
    const flatPreferenceNotes = [0, 3, 5, 7, 10]; // C, Eb, F, G, Bb
    return flatPreferenceNotes.includes(rootChromaticIndex)
      ? AccidentalType.Flat
      : AccidentalType.Sharp;
  }

  private static getMajorChordAccidentalPreference(
    rootChromaticIndex: ChromaticIndex
  ): AccidentalType {
    const flatPreferenceNotes = [0, 1, 3, 5, 8, 10]; // C, Db, Eb, F, Ab, Bb
    return flatPreferenceNotes.includes(rootChromaticIndex)
      ? AccidentalType.Flat
      : AccidentalType.Sharp;
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
