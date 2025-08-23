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
}
