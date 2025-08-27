import {
  ActualIndex,
  InversionIndex,
  ixActual,
  ixInversion,
} from "../IndexTypes";
import { NoteGroupingId } from "../NoteGroupingId";

export interface ChordReference {
  rootNote: ActualIndex;
  id: NoteGroupingId;
  inversionIndex: InversionIndex;
}

export function makeChordReference(
  rootNote: number,
  id: NoteGroupingId,
  inversionIndex: number
): ChordReference {
  return {
    rootNote: ixActual(rootNote),
    id,
    inversionIndex: ixInversion(inversionIndex),
  };
}
