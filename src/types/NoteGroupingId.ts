import { ChordType } from "./enums/ChordType";
import { IntervalType } from "./enums/IntervalType";
import { SpecialType } from "./enums/SpecialType";

export function isIntervalType(id: NoteGroupingId): boolean {
  return Object.values(IntervalType).includes(id as IntervalType);
}

export type NoteGroupingId = IntervalType | ChordType | SpecialType;
