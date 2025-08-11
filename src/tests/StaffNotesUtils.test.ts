import { StaffNotesUtils } from "../utils/StaffNotesUtils";
import { DEFAULT_MUSICAL_KEY, MusicalKey } from "../types/Keys/MusicalKey";
import { NoteWithOctave } from "../types/NoteInfo";
import { AccidentalType } from "../types/AccidentalType";
import { KeyType } from "../types/Keys/KeyType";
import { ChordType, SpecialType } from "../types/NoteGroupingTypes";
import {
  ixActualArray,
  ixInversion,
  ixOctaveOffset,
  OctaveOffset,
} from "../types/IndexTypes";

function verifyNoteWithOctave(
  actual: NoteWithOctave,
  expectedNoteName: string,
  expectedAccidental: AccidentalType,
  expectedOctaveOffset: number
) {
  const octaveOffset = ixOctaveOffset(expectedOctaveOffset);
  expect(actual.noteName).toBe(expectedNoteName);
  expect(actual.accidental).toBe(expectedAccidental);
  expect(actual.octaveOffset).toBe(octaveOffset);
}

describe("StaffNotesUtils", () => {
  describe("computeNotesWithOctaves", () => {
    test("converts single note (white key) index to NoteWithOctave in C major", () => {
      const result = StaffNotesUtils.computeNotesWithOctaves(
        ixActualArray([7]), // G note
        DEFAULT_MUSICAL_KEY
      );

      expect(result).toHaveLength(1);
      verifyNoteWithOctave(
        result[0],
        "G",
        AccidentalType.None,
        ixOctaveOffset(0)
      );
    });

    test("converts single note (black key) index to NoteWithOctave in C major", () => {
      const result = StaffNotesUtils.computeNotesWithOctaves(
        ixActualArray([8]), // G# note
        DEFAULT_MUSICAL_KEY
      );

      expect(result).toHaveLength(1);
      verifyNoteWithOctave(
        result[0],
        "G",
        AccidentalType.Sharp,
        ixOctaveOffset(0)
      );
    });

    test("converts single note (black, next octave) index to NoteWithOctave in C major", () => {
      const result = StaffNotesUtils.computeNotesWithOctaves(
        ixActualArray([13]), // C# note
        DEFAULT_MUSICAL_KEY
      );

      expect(result).toHaveLength(1);
      verifyNoteWithOctave(
        result[0],
        "C",
        AccidentalType.Sharp,
        ixOctaveOffset(1)
      );
    });

    test("converts multiple note indices to NoteWithOctaves in C major", () => {
      const result = StaffNotesUtils.computeNotesWithOctaves(
        ixActualArray([7, 11, 14]), // G, B, D (G major triad)
        DEFAULT_MUSICAL_KEY
      );

      expect(result).toHaveLength(3);
      verifyNoteWithOctave(result[0], "G", AccidentalType.None, 0);
      verifyNoteWithOctave(
        result[1],
        "B",
        AccidentalType.None,
        ixOctaveOffset(0)
      );
      verifyNoteWithOctave(
        result[2],
        "D",
        AccidentalType.None,
        ixOctaveOffset(1)
      );
    });

    test("applies key signature correctly in D major", () => {
      const dMajor = MusicalKey.fromClassicalMode("D", KeyType.Major);
      const result = StaffNotesUtils.computeNotesWithOctaves(
        ixActualArray([9, 13]), // A, C# in A major
        dMajor
      );

      expect(result).toHaveLength(2);
      verifyNoteWithOctave(
        result[0],
        "A",
        AccidentalType.None,
        ixOctaveOffset(0)
      );
      verifyNoteWithOctave(result[1], "C", AccidentalType.None, 1); // C# is in key signature
    });

    test("returns empty array for empty input", () => {
      const result = StaffNotesUtils.computeNotesWithOctaves(
        ixActualArray([]),
        DEFAULT_MUSICAL_KEY
      );

      expect(result).toEqual([]);
    });
  });

  describe("isChordPresetKnown", () => {
    test("returns true for known chord types when chords/intervals are active", () => {
      expect(StaffNotesUtils.isChordPresetKnown(ChordType.Major, true)).toBe(
        true
      );
      expect(StaffNotesUtils.isChordPresetKnown(ChordType.Minor, true)).toBe(
        true
      );
    });

    test("returns false when chords/intervals are not active", () => {
      expect(StaffNotesUtils.isChordPresetKnown(ChordType.Major, false)).toBe(
        false
      );
    });

    test("returns false for special types even when chords/intervals are active", () => {
      expect(StaffNotesUtils.isChordPresetKnown(SpecialType.None, true)).toBe(
        false
      );
      expect(StaffNotesUtils.isChordPresetKnown(SpecialType.Note, true)).toBe(
        false
      );
      expect(
        StaffNotesUtils.isChordPresetKnown(SpecialType.Freeform, true)
      ).toBe(false);
      expect(StaffNotesUtils.isChordPresetKnown(ChordType.Unknown, true)).toBe(
        false
      );
    });
  });

  describe("computeNotesFromChordPreset", () => {
    test("generates major triad from root note", () => {
      const result = StaffNotesUtils.computeNotesFromChordPreset(
        ixActualArray([7]), // C
        ChordType.Major,
        ixInversion(0),
        DEFAULT_MUSICAL_KEY
      );

      expect(result).toHaveLength(3);
      verifyNoteWithOctave(result[0], "G", AccidentalType.None, 0); // G
      verifyNoteWithOctave(result[1], "B", AccidentalType.None, 0); // B
      verifyNoteWithOctave(result[2], "D", AccidentalType.None, 1); // D
    });

    //TODO: test fails as it should, make it green later.
    test("generates minor triad from root note", () => {
      const result = StaffNotesUtils.computeNotesFromChordPreset(
        ixActualArray([7]), // C
        ChordType.Minor,
        ixInversion(0),
        DEFAULT_MUSICAL_KEY
      );

      expect(result).toHaveLength(3);
      verifyNoteWithOctave(result[0], "G", AccidentalType.None, 0); // G
      verifyNoteWithOctave(result[1], "B", AccidentalType.Flat, 0); // Bb
      verifyNoteWithOctave(result[2], "D", AccidentalType.None, 0); // D
    });
  });

  describe("computeStaffNotes", () => {
    test("uses chord preset when chord is known", () => {
      const result = StaffNotesUtils.computeStaffNotes(
        ixActualArray([7]), // C
        DEFAULT_MUSICAL_KEY,
        ChordType.Major,
        ixInversion(0),
        true // chords/intervals active
      );

      expect(result).toHaveLength(3); // Major triad
      verifyNoteWithOctave(result[0], "G", AccidentalType.None, 0);
      verifyNoteWithOctave(result[1], "B", AccidentalType.None, 0);
      verifyNoteWithOctave(result[2], "D", AccidentalType.None, 1);
    });

    test("uses raw notes when chord preset is not known", () => {
      const result = StaffNotesUtils.computeStaffNotes(
        ixActualArray([7, 8]), // C, C#
        DEFAULT_MUSICAL_KEY,
        SpecialType.Freeform, // Not a known chord
        ixInversion(0),
        true
      );

      expect(result).toHaveLength(2); // Raw notes
      verifyNoteWithOctave(result[0], "G", AccidentalType.None, 0);
      verifyNoteWithOctave(result[1], "G", AccidentalType.Sharp, 0);
    });

    test("uses raw notes when chords/intervals are not active", () => {
      const result = StaffNotesUtils.computeStaffNotes(
        ixActualArray([7]), // C
        DEFAULT_MUSICAL_KEY,
        ChordType.Major,
        ixInversion(0),
        false // chords/intervals not active
      );

      expect(result).toHaveLength(1); // Just the raw note
      verifyNoteWithOctave(result[0], "G", AccidentalType.None, 0);
    });

    test("returns empty array for empty input", () => {
      const result = StaffNotesUtils.computeStaffNotes(
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
      const result = StaffNotesUtils.computeNotesWithOctaves(
        ixActualArray([7]), // C
        DEFAULT_MUSICAL_KEY
      );

      expect(result[0].formatForVexFlow()).toBe("G/4");
    });

    test("NoteWithOctave with accidental formats correctly", () => {
      const result = StaffNotesUtils.computeNotesWithOctaves(
        ixActualArray([8]), // C#
        DEFAULT_MUSICAL_KEY
      );

      expect(result[0].formatForVexFlow()).toBe("G/4");
      expect(result[0].accidental).toBe(AccidentalType.Sharp);
    });
  });
});
