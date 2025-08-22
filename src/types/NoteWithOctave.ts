import { AccidentalType } from "./enums/AccidentalType";
import { ixOctaveOffset, OctaveOffset } from "./IndexTypes";

// Class that combines NoteInfo with octave offset information
export class NoteWithOctave {
  constructor(
    public readonly noteName: string,
    public readonly accidental: AccidentalType,
    octaveOffset: number = 0 // Accept number, convert internally
  ) {
    this.octaveOffset = ixOctaveOffset(octaveOffset);
  }

  public readonly octaveOffset: OctaveOffset;
}
