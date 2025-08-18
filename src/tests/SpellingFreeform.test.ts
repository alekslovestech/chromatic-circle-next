import { DEFAULT_MUSICAL_KEY, MusicalKey } from "@/types/Keys/MusicalKey";
import { AccidentalType } from "@/types/AccidentalTypeDisplay";
import { KeyType } from "@/types/Keys/KeyType";
import { ChordType, SpecialType } from "@/types/enums/NoteGroupingId";
import { ixActualArray, ixInversion } from "@/types/IndexTypes";

import { SpellingUtils } from "@/utils/SpellingUtils";
import { SpellingTestUtils } from "./utils/SpellingTestUtils";

describe("SpellingFreeform - Key-based note spelling", () => {
  describe("computeNotesWithOctaves", () => {
    test("converts single note (white key) index to NoteWithOctave in C major", () => {
      const result = SpellingUtils.computeNotesFromMusicalKey(
        ixActualArray([7]), // G note
        DEFAULT_MUSICAL_KEY
      );

      expect(result).toHaveLength(1);
      SpellingTestUtils.verifyNoteWithOctaveArray(result, [
        SpellingTestUtils.makeNoteWithOctave("G", AccidentalType.None, 0),
      ]);
    });

    test("converts single note (black key) index to NoteWithOctave in C major", () => {
      const result = SpellingUtils.computeNotesFromMusicalKey(
        ixActualArray([8]), // G# note
        DEFAULT_MUSICAL_KEY
      );

      expect(result).toHaveLength(1);
      SpellingTestUtils.verifyNoteWithOctaveArray(result, [
        SpellingTestUtils.makeNoteWithOctave("G", AccidentalType.Sharp, 0),
      ]);
    });

    test("converts single note (black, next octave) index to NoteWithOctave in C major", () => {
      const result = SpellingUtils.computeNotesFromMusicalKey(
        ixActualArray([13]), // C# note
        DEFAULT_MUSICAL_KEY
      );

      expect(result).toHaveLength(1);
      SpellingTestUtils.verifyNoteWithOctaveArray(result, [
        SpellingTestUtils.makeNoteWithOctave("C", AccidentalType.Sharp, 1),
      ]);
    });

    test("converts multiple note indices to NoteWithOctaves in C major", () => {
      const result = SpellingUtils.computeNotesFromMusicalKey(
        ixActualArray([7, 11, 14]), // G, B, D (G major triad)
        DEFAULT_MUSICAL_KEY
      );

      expect(result).toHaveLength(3);
      SpellingTestUtils.verifyNoteWithOctaveArray(result, [
        SpellingTestUtils.makeNoteWithOctave("G", AccidentalType.None, 0),
        SpellingTestUtils.makeNoteWithOctave("B", AccidentalType.None, 0),
        SpellingTestUtils.makeNoteWithOctave("D", AccidentalType.None, 1),
      ]);
    });

    test("applies key signature correctly in D major", () => {
      const dMajor = MusicalKey.fromClassicalMode("D", KeyType.Major);
      const result = SpellingUtils.computeNotesFromMusicalKey(
        ixActualArray([9, 13]), // A, C# in D major
        dMajor
      );

      expect(result).toHaveLength(2);
      SpellingTestUtils.verifyNoteWithOctaveArray(result, [
        SpellingTestUtils.makeNoteWithOctave("A", AccidentalType.None, 0),
        SpellingTestUtils.makeNoteWithOctave("C", AccidentalType.None, 1),
      ]);
    });

    test("returns empty array for empty input", () => {
      const result = SpellingUtils.computeNotesFromMusicalKey(
        ixActualArray([]),
        DEFAULT_MUSICAL_KEY
      );

      expect(result).toEqual([]);
    });
  });

  describe("computeStaffNotes with freeform notes", () => {
    test("uses raw notes when freeform type is specified", () => {
      const result = SpellingUtils.computeStaffNotes(
        ixActualArray([7, 8]), // G, G#
        DEFAULT_MUSICAL_KEY,
        SpecialType.Freeform, // Not a known chord
        ixInversion(0),
        true
      );

      expect(result).toHaveLength(2); // Raw notes
      SpellingTestUtils.verifyNoteWithOctaveArray(result, [
        SpellingTestUtils.makeNoteWithOctave("G", AccidentalType.None, 0),
        SpellingTestUtils.makeNoteWithOctave("G", AccidentalType.Sharp, 0),
      ]);
    });

    test("uses raw notes when chords/intervals are not active", () => {
      const result = SpellingUtils.computeStaffNotes(
        ixActualArray([7]), // G
        DEFAULT_MUSICAL_KEY,
        ChordType.Major,
        ixInversion(0),
        false // chords/intervals not active
      );

      expect(result).toHaveLength(1); // Just the raw note
      SpellingTestUtils.verifyNoteWithOctaveArray(result, [
        SpellingTestUtils.makeNoteWithOctave("G", AccidentalType.None, 0),
      ]);
    });

    test("returns empty array for empty input", () => {
      const result = SpellingUtils.computeStaffNotes(
        ixActualArray([]),
        DEFAULT_MUSICAL_KEY,
        ChordType.Major,
        ixInversion(0),
        true
      );

      expect(result).toEqual([]);
    });
  });

  describe("VexFlow formatting", () => {
    test("NoteWithOctave formats correctly for VexFlow", () => {
      const result = SpellingUtils.computeNotesFromMusicalKey(
        ixActualArray([7]), // G
        DEFAULT_MUSICAL_KEY
      );

      expect(result[0].formatForVexFlow()).toBe("G/4");
    });

    test("NoteWithOctave with accidental formats correctly", () => {
      const result = SpellingUtils.computeNotesFromMusicalKey(
        ixActualArray([8]), // G#
        DEFAULT_MUSICAL_KEY
      );

      expect(result[0].formatForVexFlow()).toBe("G/4");
      expect(result[0].accidental).toBe(AccidentalType.Sharp);
    });
  });
});
