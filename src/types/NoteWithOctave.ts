import { AccidentalType } from "./enums/AccidentalType";
import { OctaveOffset } from "./IndexTypes";

// Class that combines NoteInfo with octave offset information
export class NoteWithOctave {
  constructor(
    public readonly noteName: string,
    public readonly accidental: AccidentalType,
    public readonly octaveOffset: OctaveOffset
  ) {}
}
