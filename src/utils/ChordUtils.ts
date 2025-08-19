import { ixActualArray } from "../types/IndexTypes";
import { NoteGroupingLibrary } from "../types/NoteGroupingLibrary";
import { NoteGroupingId } from "../types/NoteGroupingId";
import {
  InversionIndex,
  ixInversion,
  ActualIndex,
  OffsetIndex,
  ixActual,
} from "../types/IndexTypes";

import { IndexUtils } from "./IndexUtils";

export class ChordUtils {
  static hasInversions = (id: NoteGroupingId): boolean => {
    const definition = NoteGroupingLibrary.getGroupingById(id);
    return definition?.offsets.length > 1;
  };

  static getOffsetsFromIdAndInversion(
    id: NoteGroupingId,
    inversionIndex: InversionIndex = ixInversion(0)
  ): OffsetIndex[] {
    const definition = NoteGroupingLibrary.getGroupingById(id);
    if (!definition) {
      console.warn(`No chord definition found for type: ${id}`);
      throw new Error(`Invalid chord type: ${id}`);
    }

    if (inversionIndex === 0) return definition.offsets;
    return definition.inversions[inversionIndex];
  }

  static calculateUpdatedIndices(
    newIndex: ActualIndex,
    isToggle: boolean,
    selectedNoteIndices: ActualIndex[],
    chordType: NoteGroupingId,
    inversionIndex: InversionIndex
  ): ActualIndex[] {
    if (isToggle)
      return IndexUtils.ToggleNewIndex(
        selectedNoteIndices,
        newIndex as ActualIndex
      );

    // New behavior: treat newIndex as the desired bass note
    return this.calculateChordNotesFromBassNote(
      newIndex,
      chordType,
      inversionIndex
    );
  }

  /**
   * Calculate chord notes where the clicked note becomes the bass note.
   * This is more intuitive than clicking on the root note.
   */
  static calculateChordNotesFromBassNote(
    bassIndex: ActualIndex,
    chordType: NoteGroupingId,
    inversionIndex: InversionIndex
  ): ActualIndex[] {
    // Get the offsets for this chord type and inversion
    const chordOffsets = this.getOffsetsFromIdAndInversion(
      chordType,
      inversionIndex
    );

    // The bass note is the first offset in the inversion
    const bassOffset = chordOffsets[0];

    // Calculate what root note would produce this bass note
    // bassIndex = rootIndex + bassOffset, so rootIndex = bassIndex - bassOffset
    const rootIndex = ixActual(bassIndex - bassOffset);

    // Now calculate the chord from this root, which will handle octave fitting
    return this.calculateChordNotesFromIndex(
      rootIndex,
      chordType,
      inversionIndex
    );
  }

  static calculateChordNotesFromIndex(
    rootIndex: ActualIndex,
    chordType: NoteGroupingId,
    inversionIndex: InversionIndex
  ): ActualIndex[] {
    const chordOffsets = ChordUtils.getOffsetsFromIdAndInversion(
      chordType,
      inversionIndex
    );
    const newNotes = chordOffsets.map(
      (offset: number) => (offset + rootIndex) as ActualIndex
    );
    return ixActualArray(IndexUtils.fitChordToAbsoluteRange(newNotes));
  }
}
