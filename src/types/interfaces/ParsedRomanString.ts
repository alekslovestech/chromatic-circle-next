export interface ParsedRomanString {
  accidentalPrefix: string;
  pureRoman: string;
  chordSuffix: string;
  bassRoman: string | undefined;
}

export function createParsedRomanString(
  accidentalPrefix: string,
  pureRoman: string,
  chordSuffix: string,
  bassRoman: string | undefined
): ParsedRomanString {
  return { accidentalPrefix, pureRoman, chordSuffix, bassRoman };
}
