import {
  ActualIndex,
  InversionIndex,
  ixActual,
  ixInversion,
} from "@/types/IndexTypes";
import { NoteGrouping } from "@/types/NoteGrouping";

export interface ChordMatch {
  rootNote: ActualIndex;
  definition: NoteGrouping;
  inversionIndex: InversionIndex;
}

export function makeChordMatch(
  rootNote: number,
  definition: NoteGrouping,
  inversionIndex: number
): ChordMatch {
  return {
    rootNote: ixActual(rootNote),
    definition,
    inversionIndex: ixInversion(inversionIndex),
  };
}
