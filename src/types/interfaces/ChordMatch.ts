import { ActualIndex, InversionIndex } from "@/types/IndexTypes";
import { NoteGrouping } from "@/types/NoteGrouping";

export interface ChordMatch {
  rootNote: ActualIndex;
  definition: NoteGrouping;
  inversionIndex: InversionIndex;
}
