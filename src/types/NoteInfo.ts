import { AccidentalType } from "./enums/AccidentalType";
import {
  getAccidentalSignForDebug,
  getAccidentalSignForDisplay,
} from "./AccidentalTypeDisplay";

export class NoteInfo {
  constructor(
    public readonly noteName: string,
    public readonly accidental: AccidentalType
  ) {}

  formatNoteNameForDisplay(): string {
    const accidentalSign = getAccidentalSignForDisplay(this.accidental);
    return `${this.noteName}${accidentalSign}`;
  }

  formatNoteNameForDebug(): string {
    const accidentalSign = getAccidentalSignForDebug(this.accidental);
    return `${this.noteName}${accidentalSign}`;
  }
}
