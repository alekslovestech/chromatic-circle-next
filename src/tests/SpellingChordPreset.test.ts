import { AccidentalType } from "@/types/AccidentalTypeDisplay";
import { ChordType } from "@/types/enums/NoteGroupingId";
import { ixActual, ixInversion } from "@/types/IndexTypes";

import { SpellingUtils } from "@/utils/SpellingUtils";

import { SpellingTestUtils } from "./utils/SpellingTestUtils";

describe("SpellingChordPreset - Chord preset-based note spelling", () => {
  describe("computeNotesFromChordPreset", () => {
    describe("white key root (G)", () => {
      test("generates major triad from G in root position", () => {
        const result = SpellingUtils.computeNotesFromChordPreset(
          ixActual(7), // G
          ChordType.Major,
          ixInversion(0)
        );

        expect(result).toHaveLength(3);
        SpellingTestUtils.verifyNoteWithOctaveArray(result, [
          SpellingTestUtils.makeNoteWithOctave("G", AccidentalType.None, 0),
          SpellingTestUtils.makeNoteWithOctave("B", AccidentalType.None, 0),
          SpellingTestUtils.makeNoteWithOctave("D", AccidentalType.None, 1),
        ]);
      });

      test("generates major triad from G in first inversion", () => {
        const result = SpellingUtils.computeNotesFromChordPreset(
          ixActual(7), // G
          ChordType.Major,
          ixInversion(1)
        );

        expect(result).toHaveLength(3);
        SpellingTestUtils.verifyNoteWithOctaveArray(result, [
          SpellingTestUtils.makeNoteWithOctave("B", AccidentalType.None, 0),
          SpellingTestUtils.makeNoteWithOctave("D", AccidentalType.None, 1),
          SpellingTestUtils.makeNoteWithOctave("G", AccidentalType.None, 1),
        ]);
      });

      test("generates major triad from G in second inversion", () => {
        const result = SpellingUtils.computeNotesFromChordPreset(
          ixActual(7), // G
          ChordType.Major,
          ixInversion(2)
        );

        expect(result).toHaveLength(3);
        SpellingTestUtils.verifyNoteWithOctaveArray(result, [
          SpellingTestUtils.makeNoteWithOctave("D", AccidentalType.None, 0),
          SpellingTestUtils.makeNoteWithOctave("G", AccidentalType.None, 0),
          SpellingTestUtils.makeNoteWithOctave("B", AccidentalType.None, 0),
        ]);
      });

      test("generates minor triad from G in root position", () => {
        const result = SpellingUtils.computeNotesFromChordPreset(
          ixActual(7), // G
          ChordType.Minor,
          ixInversion(0)
        );

        expect(result).toHaveLength(3);
        SpellingTestUtils.verifyNoteWithOctaveArray(result, [
          SpellingTestUtils.makeNoteWithOctave("G", AccidentalType.None, 0),
          SpellingTestUtils.makeNoteWithOctave("B", AccidentalType.Flat, 0),
          SpellingTestUtils.makeNoteWithOctave("D", AccidentalType.None, 1),
        ]);
      });

      test("generates minor triad from G in first inversion", () => {
        const result = SpellingUtils.computeNotesFromChordPreset(
          ixActual(7), // G
          ChordType.Minor,
          ixInversion(1)
        );

        expect(result).toHaveLength(3);
        SpellingTestUtils.verifyNoteWithOctaveArray(result, [
          SpellingTestUtils.makeNoteWithOctave("B", AccidentalType.Flat, 0),
          SpellingTestUtils.makeNoteWithOctave("D", AccidentalType.None, 1),
          SpellingTestUtils.makeNoteWithOctave("G", AccidentalType.None, 1),
        ]);
      });

      test("generates minor triad from G in second inversion", () => {
        const result = SpellingUtils.computeNotesFromChordPreset(
          ixActual(7), // G
          ChordType.Minor,
          ixInversion(2)
        );

        expect(result).toHaveLength(3);
        SpellingTestUtils.verifyNoteWithOctaveArray(result, [
          SpellingTestUtils.makeNoteWithOctave("D", AccidentalType.None, 0),
          SpellingTestUtils.makeNoteWithOctave("G", AccidentalType.None, 0),
          SpellingTestUtils.makeNoteWithOctave("B", AccidentalType.Flat, 0),
        ]);
      });

      test("generates diminished triad from G", () => {
        const result = SpellingUtils.computeNotesFromChordPreset(
          ixActual(7), // G
          ChordType.Diminished,
          ixInversion(0)
        );

        expect(result).toHaveLength(3);
        SpellingTestUtils.verifyNoteWithOctaveArray(result, [
          SpellingTestUtils.makeNoteWithOctave("G", AccidentalType.None, 0),
          SpellingTestUtils.makeNoteWithOctave("B", AccidentalType.Flat, 0),
          SpellingTestUtils.makeNoteWithOctave("D", AccidentalType.Flat, 1),
        ]);
      });

      test("generates augmented triad from G", () => {
        const result = SpellingUtils.computeNotesFromChordPreset(
          ixActual(7), // G
          ChordType.Augmented,
          ixInversion(0)
        );

        expect(result).toHaveLength(3);
        SpellingTestUtils.verifyNoteWithOctaveArray(result, [
          SpellingTestUtils.makeNoteWithOctave("G", AccidentalType.None, 0),
          SpellingTestUtils.makeNoteWithOctave("B", AccidentalType.None, 0),
          SpellingTestUtils.makeNoteWithOctave("D", AccidentalType.Sharp, 1),
        ]);
      });
    });

    describe("black key root (G#/Ab)", () => {
      test("generates major triad from G#/Ab", () => {
        const result = SpellingUtils.computeNotesFromChordPreset(
          ixActual(8), // G#/Ab
          ChordType.Major,
          ixInversion(0)
        );

        // Major chords from black keys prefer flat spellings: Ab major
        expect(result).toHaveLength(3);
        SpellingTestUtils.verifyNoteWithOctaveArray(result, [
          SpellingTestUtils.makeNoteWithOctave("A", AccidentalType.Flat, 0),
          SpellingTestUtils.makeNoteWithOctave("C", AccidentalType.None, 1),
          SpellingTestUtils.makeNoteWithOctave("E", AccidentalType.Flat, 1),
        ]);
      });

      test("generates minor triad from G#/Ab", () => {
        const result = SpellingUtils.computeNotesFromChordPreset(
          ixActual(8), // G#/Ab
          ChordType.Minor,
          ixInversion(0)
        );

        // Minor chords from black keys prefer sharp spellings: G# minor
        expect(result).toHaveLength(3);
        SpellingTestUtils.verifyNoteWithOctaveArray(result, [
          SpellingTestUtils.makeNoteWithOctave("G", AccidentalType.Sharp, 0),
          SpellingTestUtils.makeNoteWithOctave("B", AccidentalType.None, 0),
          SpellingTestUtils.makeNoteWithOctave("D", AccidentalType.Sharp, 1),
        ]);
      });

      test("generates first inversion minor triad from G#/Ab", () => {
        const result = SpellingUtils.computeNotesFromChordPreset(
          ixActual(8), // G#/Ab
          ChordType.Minor,
          ixInversion(1)
        );

        expect(result).toHaveLength(3);
        SpellingTestUtils.verifyNoteWithOctaveArray(result, [
          SpellingTestUtils.makeNoteWithOctave("B", AccidentalType.None, 0),
          SpellingTestUtils.makeNoteWithOctave("D", AccidentalType.Sharp, 1),
          SpellingTestUtils.makeNoteWithOctave("G", AccidentalType.Sharp, 1),
        ]);
      });

      test("generates second inversion minor triad from G#/Ab", () => {
        const result = SpellingUtils.computeNotesFromChordPreset(
          ixActual(8), // G#/Ab
          ChordType.Minor,
          ixInversion(2)
        );

        expect(result).toHaveLength(3);
        SpellingTestUtils.verifyNoteWithOctaveArray(result, [
          SpellingTestUtils.makeNoteWithOctave("D", AccidentalType.Sharp, 0),
          SpellingTestUtils.makeNoteWithOctave("G", AccidentalType.Sharp, 0),
          SpellingTestUtils.makeNoteWithOctave("B", AccidentalType.None, 0),
        ]);
      });

      test("generates diminished triad from G#/Ab", () => {
        const result = SpellingUtils.computeNotesFromChordPreset(
          ixActual(8), // G#/Ab
          ChordType.Diminished,
          ixInversion(0)
        );

        // Diminished chords from black keys prefer sharp spellings: G# dim
        expect(result).toHaveLength(3);
        SpellingTestUtils.verifyNoteWithOctaveArray(result, [
          SpellingTestUtils.makeNoteWithOctave("G", AccidentalType.Sharp, 0),
          SpellingTestUtils.makeNoteWithOctave("B", AccidentalType.None, 0),
          SpellingTestUtils.makeNoteWithOctave("D", AccidentalType.None, 1),
        ]);
      });

      test("generates first inversion diminished triad from G#/Ab", () => {
        const result = SpellingUtils.computeNotesFromChordPreset(
          ixActual(8), // G#/Ab
          ChordType.Diminished,
          ixInversion(1)
        );

        expect(result).toHaveLength(3);
        SpellingTestUtils.verifyNoteWithOctaveArray(result, [
          SpellingTestUtils.makeNoteWithOctave("B", AccidentalType.None, 0),
          SpellingTestUtils.makeNoteWithOctave("D", AccidentalType.None, 1),
          SpellingTestUtils.makeNoteWithOctave("G", AccidentalType.Sharp, 1),
        ]);
      });

      test("generates second inversion diminished triad from G#/Ab", () => {
        const result = SpellingUtils.computeNotesFromChordPreset(
          ixActual(8), // G#/Ab
          ChordType.Diminished,
          ixInversion(2)
        );

        expect(result).toHaveLength(3);
        SpellingTestUtils.verifyNoteWithOctaveArray(result, [
          SpellingTestUtils.makeNoteWithOctave("D", AccidentalType.None, 0),
          SpellingTestUtils.makeNoteWithOctave("G", AccidentalType.Sharp, 0),
          SpellingTestUtils.makeNoteWithOctave("B", AccidentalType.None, 0),
        ]);
      });

      test("generates augmented triad from G#/Ab", () => {
        const result = SpellingUtils.computeNotesFromChordPreset(
          ixActual(8), // G#/Ab
          ChordType.Augmented,
          ixInversion(0)
        );

        // Augmented chords from black keys prefer flat spellings: Ab aug
        expect(result).toHaveLength(3);
        SpellingTestUtils.verifyNoteWithOctaveArray(result, [
          SpellingTestUtils.makeNoteWithOctave("A", AccidentalType.Flat, 0),
          SpellingTestUtils.makeNoteWithOctave("C", AccidentalType.None, 1),
          SpellingTestUtils.makeNoteWithOctave("E", AccidentalType.None, 1),
        ]);
      });

      test("generates second inversion augmented triad from G#/Ab", () => {
        const result = SpellingUtils.computeNotesFromChordPreset(
          ixActual(8), // G#/Ab
          ChordType.Augmented,
          ixInversion(2)
        );

        expect(result).toHaveLength(3);
        SpellingTestUtils.verifyNoteWithOctaveArray(result, [
          SpellingTestUtils.makeNoteWithOctave("E", AccidentalType.None, 0),
          SpellingTestUtils.makeNoteWithOctave("A", AccidentalType.Flat, 0),
          SpellingTestUtils.makeNoteWithOctave("C", AccidentalType.None, 1),
        ]);
      });
    });
  });
});
