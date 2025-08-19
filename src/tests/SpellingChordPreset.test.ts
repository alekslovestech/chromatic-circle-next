import { AccidentalType } from "@/types/enums/AccidentalType";
import { ixActualArray, ixOctaveOffset } from "@/types/IndexTypes";

import { SpellingUtils } from "@/utils/SpellingUtils";

import { SpellingTestUtils } from "./utils/SpellingTestUtils";
import { MusicalDisplayFormatter } from "@/utils/formatters/MusicalDisplayFormatter";
import { NoteWithOctave } from "@/types/NoteWithOctave";

describe("SpellingChordPreset - Chord preset-based note spelling", () => {
  // Helper function to make tests cleaner
  function testChordSpelling(
    description: string,
    chordIndices: number[],
    expectedNotes: NoteWithOctave[]
  ) {
    test(description, () => {
      const indices = ixActualArray(chordIndices);
      const chordMatch = MusicalDisplayFormatter.getMatchFromIndices(indices);
      const result = SpellingUtils.computeNotesFromChordPreset(
        indices,
        chordMatch
      );

      expect(result).toHaveLength(expectedNotes.length);
      SpellingTestUtils.verifyNoteWithOctaveArray(result, expectedNotes);
    });
  }

  describe("computeNotesFromChordPreset", () => {
    describe("Major triads", () => {
      testChordSpelling(
        "G major triad in root position",
        [7, 11, 14], // G, B, D
        [
          new NoteWithOctave("G", AccidentalType.None, ixOctaveOffset(0)),
          new NoteWithOctave("B", AccidentalType.None, ixOctaveOffset(0)),
          new NoteWithOctave("D", AccidentalType.None, ixOctaveOffset(1)),
        ]
      );

      testChordSpelling(
        "G major triad in first inversion",
        [11, 14, 19], // B, D, G
        [
          new NoteWithOctave("B", AccidentalType.None, ixOctaveOffset(0)),
          new NoteWithOctave("D", AccidentalType.None, ixOctaveOffset(1)),
          new NoteWithOctave("G", AccidentalType.None, ixOctaveOffset(1)),
        ]
      );
    });

    describe("Minor triads", () => {
      testChordSpelling(
        "G minor triad in root position",
        [7, 10, 14], // G, Bb, D
        [
          new NoteWithOctave("G", AccidentalType.None, ixOctaveOffset(0)),
          new NoteWithOctave("B", AccidentalType.Flat, ixOctaveOffset(0)),
          new NoteWithOctave("D", AccidentalType.None, ixOctaveOffset(1)),
        ]
      );
    });
  });
});
