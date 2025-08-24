import { ChordType } from "@/types/enums/ChordType";
import { RomanChord } from "@/types/RomanChord";
import { ScaleDegreeInfo } from "@/types/ScaleModes/ScaleDegreeInfo";
import { ScaleModeInfo } from "@/types/ScaleModes/ScaleModeInfo";
import { RomanNumeralString } from "@/types/RomanTypes";
import { AccidentalFormatter } from "./AccidentalFormatter";

export class RomanFormatter {
  static formatForDisplay(
    scaleDegreeInfo: ScaleDegreeInfo,
    scaleModeInfo: ScaleModeInfo
  ): string {
    const romanChord = this.fromScaleDegreeInfo(scaleDegreeInfo, scaleModeInfo);
    const accidentalString = AccidentalFormatter.getAccidentalSignForDisplay(
      romanChord.accidental
    );
    const romanNumeralString = this.getScaleDegreeAsRomanString(romanChord);
    const chordPostfix = this.getChordTypePostfix(romanChord.chordType);

    return `${accidentalString}${romanNumeralString}${chordPostfix}`;
  }

  private static fromScaleDegreeInfo(
    scaleDegreeInfo: ScaleDegreeInfo,
    scaleModeInfo: ScaleModeInfo
  ): RomanChord {
    const offsets = scaleModeInfo.getTriadOffsets(scaleDegreeInfo);
    const chordType = scaleModeInfo.determineChordType(offsets);

    return new RomanChord(
      scaleDegreeInfo.scaleDegree,
      chordType,
      scaleDegreeInfo.accidentalPrefix
    );
  }

  private static getScaleDegreeAsRomanString(
    romanChord: RomanChord
  ): RomanNumeralString {
    const scaleDegreeIndex = romanChord.scaleDegreeIndex;
    const isLowercase =
      romanChord.chordType === ChordType.Minor ||
      romanChord.chordType === ChordType.Diminished;
    return isLowercase
      ? this.LOWER_ROMAN_NUMERALS[scaleDegreeIndex]
      : this.UPPER_ROMAN_NUMERALS[scaleDegreeIndex];
  }

  private static UPPER_ROMAN_NUMERALS: RomanNumeralString[] = [
    "I",
    "II",
    "III",
    "IV",
    "V",
    "VI",
    "VII",
  ];
  private static LOWER_ROMAN_NUMERALS: RomanNumeralString[] = [
    "i",
    "ii",
    "iii",
    "iv",
    "v",
    "vi",
    "vii",
  ];

  private static getChordTypePostfix(chordType: ChordType): string {
    switch (chordType) {
      case ChordType.Diminished:
        return "°";
      case ChordType.Augmented:
        return "+";
      case ChordType.Minor:
      case ChordType.Major:
      case ChordType.Dominant7:
      case ChordType.Minor7:
      case ChordType.Major7:
      case ChordType.Diminished7:
      case ChordType.HalfDiminished:
        return "";
      default:
        return "";
    }
  }
}
