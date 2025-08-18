import { AccidentalType } from "./enums/AccidentalType";
import {
  getAccidentalSignForDebug,
  getAccidentalSignForDisplay,
} from "./AccidentalTypeDisplay";
import { OctaveOffset } from "./IndexTypes";

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

// Class that combines NoteInfo with octave offset information
export class NoteWithOctave {
  constructor(
    public readonly noteInfo: NoteInfo,
    public readonly octaveOffset: OctaveOffset
  ) {}

  // Convenience getters that delegate to noteInfo
  get noteName(): string {
    return this.noteInfo.noteName;
  }

  get accidental(): AccidentalType {
    return this.noteInfo.accidental;
  }

  // Convenience methods that delegate to noteInfo
  formatNoteNameForDisplay(): string {
    return this.noteInfo.formatNoteNameForDisplay();
  }

  formatNoteNameForDebug(): string {
    return this.noteInfo.formatNoteNameForDebug();
  }

  // Methods that include octave information
  formatWithOctaveForDisplay(baseOctave: number = 4): string {
    return `${this.formatNoteNameForDisplay()}${
      baseOctave + this.octaveOffset
    }`;
  }

  formatWithOctaveForDebug(baseOctave: number = 4): string {
    return `${this.formatNoteNameForDebug()}${baseOctave + this.octaveOffset}`;
  }

  // VexFlow specific formatting - converts to absolute octave
  formatForVexFlow(baseOctave: number = 4): string {
    return `${this.noteName}/${baseOctave + this.octaveOffset}`;
  }
}
