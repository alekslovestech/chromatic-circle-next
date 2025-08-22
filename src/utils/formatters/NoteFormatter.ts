import { NoteWithOctave } from "@/types/NoteWithOctave";
import { AccidentalFormatter } from "./AccidentalFormatter";

export class NoteFormatter {
  static formatForDisplay(note: NoteWithOctave | null): string {
    if (!note) return "";
    const accidentalSign = AccidentalFormatter.getAccidentalSignForDisplay(
      note.accidental
    );
    return `${note.noteName}${accidentalSign}`;
  }

  static formatForDebug(note: NoteWithOctave): string {
    const accidentalSign = AccidentalFormatter.getAccidentalSignForDebug(
      note.accidental
    );
    return `${note.noteName}${accidentalSign}`;
  }

  static formatWithOctaveForDisplay(
    note: NoteWithOctave,
    baseOctave: number = 4
  ): string {
    return `${this.formatForDisplay(note)}${baseOctave + note.octaveOffset}`;
  }

  static formatWithOctaveForDebug(
    note: NoteWithOctave,
    baseOctave: number = 4
  ): string {
    return `${this.formatForDebug(note)}${baseOctave + note.octaveOffset}`;
  }
}
