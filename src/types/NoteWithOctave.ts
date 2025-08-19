import { AccidentalType } from "./enums/AccidentalType";
import {
  getAccidentalSignForDebug,
  getAccidentalSignForDisplay,
} from "./AccidentalTypeDisplay";
import { OctaveOffset } from "./IndexTypes";

// Class that combines NoteInfo with octave offset information
export class NoteWithOctave {
  constructor(
    public readonly noteName: string,
    public readonly accidental: AccidentalType,
    public readonly octaveOffset: OctaveOffset
  ) {}

  // Keep all the existing formatting methods
  formatNoteNameForDisplay(): string {
    const accidentalSign = getAccidentalSignForDisplay(this.accidental);
    return `${this.noteName}${accidentalSign}`;
  }

  formatNoteNameForDebug(): string {
    const accidentalSign = getAccidentalSignForDebug(this.accidental);
    return `${this.noteName}${accidentalSign}`;
  }

  formatWithOctaveForDisplay(baseOctave: number = 4): string {
    return `${this.formatNoteNameForDisplay()}${
      baseOctave + this.octaveOffset
    }`;
  }

  formatWithOctaveForDebug(baseOctave: number = 4): string {
    return `${this.formatNoteNameForDebug()}${baseOctave + this.octaveOffset}`;
  }

  formatForVexFlow(baseOctave: number = 4): string {
    return `${this.noteName}/${baseOctave + this.octaveOffset}`;
  }
}
