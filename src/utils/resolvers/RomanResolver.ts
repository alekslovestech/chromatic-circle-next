import { ChordType } from "@/types/enums/ChordType";
import { AccidentalType } from "@/types/enums/AccidentalType";

import { MusicalKey } from "@/types/Keys/MusicalKey";
import { RomanChord } from "@/types/RomanChord";
import { ParsedRomanString } from "@/types/interfaces/ParsedRomanString";
import { AbsoluteChord } from "@/types/AbsoluteChord";
import { addChromatic } from "@/types/ChromaticIndex";
import { AccidentalFormatter } from "@/utils/formatters/AccidentalFormatter";

/*const romanRegex: RegExp =
  /^(#|♯|b|♭)?(I|II|III|IV|V|VI|VII|i|ii|iii|iv|v|vi|vii)(\+|7|maj7|o|o7|dim|dim7|aug|ø7)?$/;*/
const accidentalRegex: RegExp = /#|♯|b|♭/;
const pureRomanRegex: RegExp = /I|II|III|IV|V|VI|VII|i|ii|iii|iv|v|vi|vii/;
const chordTypeRegex: RegExp = /\+|7|maj7|o|o7|dim|dim7|aug|ø7/;
const romanRegex: RegExp = new RegExp(
  `^(${accidentalRegex.source})?(${pureRomanRegex.source})(${chordTypeRegex.source})?(\/(${pureRomanRegex.source}))?$`
);

/**
 * Resolves Roman numeral chords to absolute chords in a given musical key.
 * This class provides functionality to convert Roman numeral notation (e.g., "I", "ii7", "♭III")
 * to actual chords in the context of a specific musical key.
 */
export class RomanResolver {
  /**
   * Resolves a Roman numeral string to an absolute chord in the context of a musical key.
   *
   * @param romanString - The Roman numeral string to resolve (e.g., "I", "ii7", "♭III")
   * @param musicalKey - The musical key to resolve the chord in
   * @returns An absolute chord representing the resolved Roman numeral
   * @throws Error if the Roman numeral string is invalid
   */
  static resolveAsAbsoluteChord(
    romanString: string,
    musicalKey: MusicalKey
  ): AbsoluteChord {
    const romanChord = RomanResolver.createRomanChordFromString(romanString);
    const scale = musicalKey.scaleModeInfo.getAbsoluteScaleNotes(
      musicalKey.tonicIndex
    );

    // Get the base chromatic index from the scale
    let chromaticIndex = scale[romanChord.scaleDegreeIndex];

    // Apply any accidentals
    const accidentalOffset =
      romanChord.accidental === AccidentalType.Flat
        ? -1
        : romanChord.accidental === AccidentalType.Sharp
        ? 1
        : 0;
    chromaticIndex = addChromatic(chromaticIndex, accidentalOffset);

    return new AbsoluteChord(chromaticIndex, romanChord.chordType);
  }

  /**
   * Creates a RomanChord object from a Roman numeral string.
   *
   * @param romanString - The Roman numeral string to parse (e.g., "I", "ii7", "♭III")
   * @returns A RomanChord object representing the parsed Roman numeral
   * @throws Error if the Roman numeral string is invalid
   */
  static createRomanChordFromString(romanString: string): RomanChord {
    const parsedRoman = this.splitRomanString(romanString);
    const accidental: AccidentalType = AccidentalFormatter.parseAccidentalType(
      parsedRoman.accidentalPrefix
    );

    const ordinal = RomanChord.fromRoman(parsedRoman.pureRoman);
    const isLowercase = RomanChord.isLowercaseRomanNumeral(
      parsedRoman.pureRoman
    );
    const chordType = RomanChord.determineChordType(
      isLowercase,
      parsedRoman.chordSuffix
    );
    const bassDegree = parsedRoman.bassRoman
      ? RomanChord.fromRoman(parsedRoman.bassRoman)
      : undefined;

    if (chordType === ChordType.Unknown) {
      throw new Error(`Invalid roman notation ${romanString}`);
    }

    return new RomanChord(ordinal, chordType, accidental, bassDegree);
  }

  static splitRomanString(romanString: string): ParsedRomanString {
    const match = romanString.match(romanRegex);
    if (match) {
      return {
        accidentalPrefix: match[1] || "",
        pureRoman: match[2],
        chordSuffix: match[3] || "",
        bassRoman: match[5] || undefined,
      };
    }

    throw new Error(`No match found for roman string: ${romanString}`);
  }
}
