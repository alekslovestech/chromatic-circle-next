import { AccidentalType } from "@/types/enums/AccidentalType";
import { ixActualArray } from "@/types/IndexTypes";

import { SpellingUtils } from "@/utils/SpellingUtils";

import { SpellingTestUtils } from "./utils/SpellingTestUtils";
import { MusicalDisplayFormatter } from "@/utils/MusicalDisplayFormatter";

describe("SpellingChordPreset - Chord preset-based note spelling", () => {
  // Helper function to make tests cleaner
  function testChordSpelling(
    description: string,
    chordIndices: number[],
    expectedNotes: Array<{
      note: string;
      accidental: AccidentalType;
      octave: number;
    }>
  ) {
    test(description, () => {
      const indices = ixActualArray(chordIndices);
      const chordMatch = MusicalDisplayFormatter.getMatchFromIndices(indices);
      const result = SpellingUtils.computeNotesFromChordPreset(
        indices,
        chordMatch
      );

      expect(result).toHaveLength(expectedNotes.length);
      SpellingTestUtils.verifyNoteWithOctaveArray(
        result,
        expectedNotes.map((n) =>
          SpellingTestUtils.makeNoteWithOctave(n.note, n.accidental, n.octave)
        )
      );
    });
  }

  describe("computeNotesFromChordPreset", () => {
    describe("Major triads", () => {
      testChordSpelling(
        "G major triad in root position",
        [7, 11, 14], // G, B, D
        [
          { note: "G", accidental: AccidentalType.None, octave: 0 },
          { note: "B", accidental: AccidentalType.None, octave: 0 },
          { note: "D", accidental: AccidentalType.None, octave: 1 },
        ]
      );

      testChordSpelling(
        "G major triad in first inversion",
        [11, 14, 19], // B, D, G
        [
          { note: "B", accidental: AccidentalType.None, octave: 0 },
          { note: "D", accidental: AccidentalType.None, octave: 1 },
          { note: "G", accidental: AccidentalType.None, octave: 1 },
        ]
      );
    });

    describe("Minor triads", () => {
      testChordSpelling(
        "G minor triad in root position",
        [7, 10, 14], // G, Bb, D
        [
          { note: "G", accidental: AccidentalType.None, octave: 0 },
          { note: "B", accidental: AccidentalType.Flat, octave: 0 },
          { note: "D", accidental: AccidentalType.None, octave: 1 },
        ]
      );
    });
  });
});
