import { NoteInfo, NoteWithOctave } from "../../types/NoteInfo";
import { AccidentalType } from "../../types/AccidentalType";
import { ixOctaveOffset } from "../../types/IndexTypes";

/**
 * Utility functions for testing note spelling and staff notation.
 */
export class SpellingUtils {
  /**
   * Creates a NoteWithOctave for testing purposes.
   */
  static makeNoteWithOctave(
    noteName: string,
    accidental: AccidentalType,
    octaveOffsetAsNumber: number
  ): NoteWithOctave {
    const octaveOffset = ixOctaveOffset(octaveOffsetAsNumber);
    const noteInfo = new NoteInfo(noteName, accidental);
    return new NoteWithOctave(noteInfo, octaveOffset);
  }

  /**
   * Verifies that two arrays of NoteWithOctave are identical.
   * Compares note name, accidental, and octave offset for each note.
   */
  static verifyNoteWithOctaveArray(
    actual: NoteWithOctave[],
    expected: NoteWithOctave[]
  ): void {
    expect(actual).toHaveLength(expected.length);
    for (let i = 0; i < actual.length; i++) {
      expect(actual[i].noteName).toBe(expected[i].noteName);
      expect(actual[i].accidental).toBe(expected[i].accidental);
      expect(actual[i].octaveOffset).toBe(expected[i].octaveOffset);
    }
  }
}
