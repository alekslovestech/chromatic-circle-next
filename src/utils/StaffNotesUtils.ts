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
import { ChordUtils } from "@/utils/ChordUtils";
import { AccidentalType } from "@/types/AccidentalType";

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

  /**
   * Creates NoteWithOctave[] using chord-aware spelling that ignores musical key context.
   * Uses consistent chord spelling rules (e.g., minor thirds always use flats).
   */
  private static computeNotesWithChordSpelling = (
    actualIndices: ActualIndex[],
    chordType: NoteGroupingId
  ): NoteWithOctave[] => {
    return actualIndices.map((actualIndex) => {
      const { chromaticIndex, octaveOffset } =
        actualIndexToChromaticAndOctave(actualIndex);

      // Use chord-specific spelling rules instead of key context
      const accidentalPreference = this.getChordSpellingPreference(chordType);
      const noteInfo = KeyNoteResolver.resolveAbsoluteNote(
        chromaticIndex,
        accidentalPreference
      );
      return new NoteWithOctave(noteInfo, octaveOffset);
    });
  };

  /**
   * Determines the accidental preference for chord spelling based on chord type.
   * Minor-quality chords prefer flats, major-quality chords prefer sharps/naturals.
   */
  private static getChordSpellingPreference(
    chordType: NoteGroupingId
  ): AccidentalType {
    // For chord spelling, prefer flats for minor-quality chords
    // This ensures Gm = G-Bb-D instead of G-A#-D
    switch (chordType) {
      case ChordType.Minor:
      case ChordType.Diminished:
      case ChordType.Minor7:
      case ChordType.HalfDiminished:
      case ChordType.Diminished7:
      case ChordType.Minor6:
      case ChordType.SpreadMinor:
      case ChordType.SpreadDiminished:
        return AccidentalType.Flat;

      // Major-quality and other chords can use sharp preference
      default:
        return AccidentalType.Sharp;
    }
  }

  static computeNotesFromChordPreset = (
    baseIndex: ActualIndex, //the lowest index of the chord
    selectedChordType: NoteGroupingId,
    selectedInversionIndex: InversionIndex
  ): NoteWithOctave[] => {
    // Calculate chord notes from the root
    const chordIndices = ChordUtils.calculateChordNotesFromIndex(
      baseIndex,
      selectedChordType,
      selectedInversionIndex
    );

    // Use chord-specific spelling instead of key-based spelling
    const accidentalPreference =
      this.getChordSpellingPreference(selectedChordType);

    return chordIndices.map((actualIndex) => {
      const { chromaticIndex, octaveOffset } =
        actualIndexToChromaticAndOctave(actualIndex);

      const noteInfo = KeyNoteResolver.resolveAbsoluteNote(
        chromaticIndex,
        accidentalPreference
      );
      return new NoteWithOctave(noteInfo, octaveOffset);
    });
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
          selectedInversionIndex
        )
      : this.computeNotesWithOctaves(selectedNoteIndices, selectedMusicalKey);
  };
}
