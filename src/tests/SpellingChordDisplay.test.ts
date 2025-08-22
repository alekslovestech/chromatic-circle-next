import { ixActualArray } from "@/types/IndexTypes";

import { MusicalDisplayFormatter } from "@/utils/formatters/MusicalDisplayFormatter";
import { ChordDisplayMode } from "@/types/SettingModes";

describe("SpellingChordDisplay - Chord display info", () => {
  // Helper function to make tests cleaner
  function testChordDisplayInfo(
    description: string,
    chordIndices: number[],
    expectedChordName: string
  ) {
    test(description, () => {
      const indices = ixActualArray(chordIndices);
      const chordMatch = MusicalDisplayFormatter.getMatchFromIndices(indices);
      const result = MusicalDisplayFormatter.getChordPresetDisplayInfo(
        indices,
        chordMatch.definition.id,
        chordMatch.inversionIndex,
        ChordDisplayMode.Symbols
      );

      expect(result.chordName).toBe(expectedChordName);
    });
  }

  describe("computeNotesFromChordPreset", () => {
    describe("Minor 3rds", () => {
      testChordDisplayInfo(
        "G minor 3rd",
        [7, 10], // G, Bb
        "m3"
      );
    });
    describe("Major triads", () => {
      testChordDisplayInfo(
        "G major triad in root position",
        [7, 11, 14], // G, B, D
        "G"
      );

      testChordDisplayInfo(
        "G major triad in first inversion",
        [11, 14, 19], // B, D, G
        "G/B"
      );
    });

    describe("Minor triads", () => {
      testChordDisplayInfo(
        "G minor triad in root position",
        [7, 10, 14], // G, Bb, D
        "Gm"
      );

      testChordDisplayInfo(
        "B minor triad in root position",
        [11, 14, 18], // B, D, F#
        "Bm"
      );

      testChordDisplayInfo(
        "Bb minor triad in root position",
        [10, 13, 17], // Bb, Db, F
        "B♭m"
      );

      testChordDisplayInfo(
        "C# minor triad in root position",
        [1, 4, 8], // C#, E, G#
        "C♯m"
      );
    });
  });

  //but for now we'll just use the preference
  describe("Augmented triads", () => {
    testChordDisplayInfo(
      "C aug in root position",
      [0, 4, 8], // C, E, G#
      "C+"
    );
    testChordDisplayInfo(
      "G# aug => Ab",
      [8, 12, 16], // Ab, C, E
      "A♭+"
    );
  });
});
