import { ChordType } from "@/types/enums/ChordType";
import { RomanChord } from "@/types/RomanChord";
import { ScaleDegreeInfo } from "@/types/ScaleModes/ScaleDegreeInfo";
import { ScaleModeInfo } from "@/types/ScaleModes/ScaleModeInfo";
import { AccidentalFormatter } from "./AccidentalFormatter";

export class RomanFormatter {
  /**
   * Creates a Roman chord from a scale degree info using a scale pattern.
   * @param scaleDegreeInfo The scale degree info containing the scale degree and accidental
   * @param scalePattern The scale pattern to use for determining the chord type
   * @returns A new Roman chord with the correct chord type based on the scale pattern
   */
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

  static formatForDisplay(
    scaleDegreeInfo: ScaleDegreeInfo,
    scaleModeInfo: ScaleModeInfo
  ): string {
    const romanChord = this.fromScaleDegreeInfo(scaleDegreeInfo, scaleModeInfo);
    const accidentalString = AccidentalFormatter.getAccidentalSignForDisplay(
      romanChord.accidental
    );
    const romanNumeralString = RomanChord.getScaleDegreeAsRomanString(
      romanChord.scaleDegreeIndex,
      romanChord.chordType === ChordType.Minor ||
        romanChord.chordType === ChordType.Diminished
    );
    const chordPostfix = RomanChord.getChordTypePostfix(romanChord.chordType);

    return `${accidentalString}${romanNumeralString}${chordPostfix}`;
  }
}
