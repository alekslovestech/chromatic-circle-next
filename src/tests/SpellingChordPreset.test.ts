import { StaffNotesUtils } from "../utils/StaffNotesUtils";
import { AccidentalType } from "../types/AccidentalType";
import { ChordType } from "../types/NoteGroupingTypes";
import { ixActual, ixInversion } from "../types/IndexTypes";
import { SpellingUtils } from "./utils/SpellingUtils";

describe("SpellingChordPreset - Chord preset-based note spelling", () => {
  describe("computeNotesFromChordPreset", () => {
    describe("white key root (G)", () => {
      test("generates major triad from G", () => {
        const result = StaffNotesUtils.computeNotesFromChordPreset(
          ixActual(7), // G
          ChordType.Major,
          ixInversion(0)
        );

        expect(result).toHaveLength(3);
        SpellingUtils.verifyNoteWithOctaveArray(result, [
          SpellingUtils.makeNoteWithOctave("G", AccidentalType.None, 0),
          SpellingUtils.makeNoteWithOctave("B", AccidentalType.None, 0),
          SpellingUtils.makeNoteWithOctave("D", AccidentalType.None, 1),
        ]);
      });

      test("generates minor triad from G", () => {
        const result = StaffNotesUtils.computeNotesFromChordPreset(
          ixActual(7), // G
          ChordType.Minor,
          ixInversion(0)
        );

        expect(result).toHaveLength(3);
        SpellingUtils.verifyNoteWithOctaveArray(result, [
          SpellingUtils.makeNoteWithOctave("G", AccidentalType.None, 0),
          SpellingUtils.makeNoteWithOctave("B", AccidentalType.Flat, 0),
          SpellingUtils.makeNoteWithOctave("D", AccidentalType.None, 1),
        ]);
      });

      test("generates diminished triad from G", () => {
        const result = StaffNotesUtils.computeNotesFromChordPreset(
          ixActual(7), // G
          ChordType.Diminished,
          ixInversion(0)
        );

        expect(result).toHaveLength(3);
        SpellingUtils.verifyNoteWithOctaveArray(result, [
          SpellingUtils.makeNoteWithOctave("G", AccidentalType.None, 0),
          SpellingUtils.makeNoteWithOctave("B", AccidentalType.Flat, 0),
          SpellingUtils.makeNoteWithOctave("D", AccidentalType.Flat, 1),
        ]);
      });

      test("generates augmented triad from G", () => {
        const result = StaffNotesUtils.computeNotesFromChordPreset(
          ixActual(7), // G
          ChordType.Augmented,
          ixInversion(0)
        );

        expect(result).toHaveLength(3);
        SpellingUtils.verifyNoteWithOctaveArray(result, [
          SpellingUtils.makeNoteWithOctave("G", AccidentalType.None, 0),
          SpellingUtils.makeNoteWithOctave("B", AccidentalType.None, 0),
          SpellingUtils.makeNoteWithOctave("D", AccidentalType.Sharp, 1),
        ]);
      });
    });

    describe("black key root (G#/Ab)", () => {
      test("generates major triad from G#/Ab", () => {
        const result = StaffNotesUtils.computeNotesFromChordPreset(
          ixActual(8), // G#/Ab
          ChordType.Major,
          ixInversion(0)
        );

        // Major chords from black keys prefer flat spellings: Ab major
        expect(result).toHaveLength(3);
        SpellingUtils.verifyNoteWithOctaveArray(result, [
          SpellingUtils.makeNoteWithOctave("A", AccidentalType.Flat, 0),
          SpellingUtils.makeNoteWithOctave("C", AccidentalType.None, 1),
          SpellingUtils.makeNoteWithOctave("E", AccidentalType.Flat, 1),
        ]);
      });

      test("generates minor triad from G#/Ab", () => {
        const result = StaffNotesUtils.computeNotesFromChordPreset(
          ixActual(8), // G#/Ab
          ChordType.Minor,
          ixInversion(0)
        );

        // Minor chords from black keys prefer sharp spellings: G# minor
        expect(result).toHaveLength(3);
        SpellingUtils.verifyNoteWithOctaveArray(result, [
          SpellingUtils.makeNoteWithOctave("G", AccidentalType.Sharp, 0),
          SpellingUtils.makeNoteWithOctave("B", AccidentalType.None, 0),
          SpellingUtils.makeNoteWithOctave("D", AccidentalType.Sharp, 1),
        ]);
      });

      test("generates diminished triad from G#/Ab", () => {
        const result = StaffNotesUtils.computeNotesFromChordPreset(
          ixActual(8), // G#/Ab
          ChordType.Diminished,
          ixInversion(0)
        );

        // Diminished chords from black keys prefer sharp spellings: G# dim
        expect(result).toHaveLength(3);
        SpellingUtils.verifyNoteWithOctaveArray(result, [
          SpellingUtils.makeNoteWithOctave("G", AccidentalType.Sharp, 0),
          SpellingUtils.makeNoteWithOctave("B", AccidentalType.None, 0),
          SpellingUtils.makeNoteWithOctave("D", AccidentalType.None, 1),
        ]);
      });

      test("generates augmented triad from G#/Ab", () => {
        const result = StaffNotesUtils.computeNotesFromChordPreset(
          ixActual(8), // G#/Ab
          ChordType.Augmented,
          ixInversion(0)
        );

        // Augmented chords from black keys prefer flat spellings: Ab aug
        expect(result).toHaveLength(3);
        SpellingUtils.verifyNoteWithOctaveArray(result, [
          SpellingUtils.makeNoteWithOctave("A", AccidentalType.Flat, 0),
          SpellingUtils.makeNoteWithOctave("C", AccidentalType.None, 1),
          SpellingUtils.makeNoteWithOctave("E", AccidentalType.None, 1),
        ]);
      });
    });
  });
});
