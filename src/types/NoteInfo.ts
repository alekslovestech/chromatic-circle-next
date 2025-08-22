import { AccidentalType } from "./enums/AccidentalType";
import { AccidentalFormatter } from "@/utils/formatters/AccidentalTypeDisplay";

export class NoteInfo {
  constructor(
    public readonly noteName: string,
    public readonly accidental: AccidentalType
  ) {}

  formatNoteNameForDisplay(): string {
    const accidentalSign = AccidentalFormatter.getAccidentalSignForDisplay(
      this.accidental
    );
    return `${this.noteName}${accidentalSign}`;
  }

  formatNoteNameForDebug(): string {
    const accidentalSign = AccidentalFormatter.getAccidentalSignForDebug(
      this.accidental
    );
    return `${this.noteName}${accidentalSign}`;
  }
}
