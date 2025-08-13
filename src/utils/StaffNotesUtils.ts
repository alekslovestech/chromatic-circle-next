// src/utils/StaffNotesUtils.ts
import {
  ActualIndex,
  actualIndexToChromaticAndOctave,
  InversionIndex,
} from "@/types/IndexTypes";
import { MusicalKey } from "@/types/Keys/MusicalKey";
import { KeyNoteResolver } from "@/types/Keys/KeyNoteResolver";
import { NoteWithOctave } from "@/types/NoteInfo";
import {
  NoteGroupingId,
  ChordType,
  SpecialType,
} from "@/types/NoteGroupingTypes";
import { IndexUtils } from "@/utils/IndexUtils";
import { ChordUtils } from "@/utils/ChordUtils";

export class StaffNotesUtils {
  static computeNotesWithOctaves = (
    actualIndices: ActualIndex[],
    selectedMusicalKey: MusicalKey
  ): NoteWithOctave[] => {
    return actualIndices.map((actualIndex) => {
      const { chromaticIndex, octaveOffset } =
        actualIndexToChromaticAndOctave(actualIndex);
      const noteInfo = KeyNoteResolver.resolveNoteInKey(
        selectedMusicalKey,
        chromaticIndex
      );
      return new NoteWithOctave(noteInfo, octaveOffset);
    });
  };

  static computeNotesFromChordPreset = (
    baseIndex: ActualIndex, //the lowest index of the chord
    selectedChordType: NoteGroupingId,
    selectedInversionIndex: InversionIndex,
    selectedMusicalKey: MusicalKey
  ): NoteWithOctave[] => {
    /*
    // Get the root note (considering current inversion)
    const rootNote = IndexUtils.rootNoteAtInversion(
      selectedNoteIndices,
      selectedInversionIndex
    ); */

    // Calculate chord notes from the root
    const chordIndices = ChordUtils.calculateChordNotesFromIndex(
      baseIndex,
      selectedChordType,
      selectedInversionIndex
    );

    // Convert to NoteWithOctave[] - reuse existing method
    return this.computeNotesWithOctaves(chordIndices, selectedMusicalKey);
  };

  // Pure function - no context dependencies!
  static isChordPresetKnown = (
    selectedChordType: NoteGroupingId,
    isChordsOrIntervals: boolean
  ): boolean => {
    return (
      isChordsOrIntervals &&
      selectedChordType !== SpecialType.None &&
      selectedChordType !== SpecialType.Note &&
      selectedChordType !== SpecialType.Freeform &&
      selectedChordType !== ChordType.Unknown
    );
  };

  // High-level orchestrator function that handles the logic flow
  static computeStaffNotes = (
    selectedNoteIndices: ActualIndex[],
    selectedMusicalKey: MusicalKey,
    selectedChordType: NoteGroupingId,
    selectedInversionIndex: InversionIndex,
    isChordsOrIntervals: boolean
  ): NoteWithOctave[] => {
    if (selectedNoteIndices.length === 0) return [];

    return this.isChordPresetKnown(selectedChordType, isChordsOrIntervals)
      ? this.computeNotesFromChordPreset(
          selectedNoteIndices[0],
          selectedChordType,
          selectedInversionIndex,
          selectedMusicalKey
        )
      : this.computeNotesWithOctaves(selectedNoteIndices, selectedMusicalKey);
  };
}
