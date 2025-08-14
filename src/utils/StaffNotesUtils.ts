import {
  ActualIndex,
  actualIndexToChromaticAndOctave,
  InversionIndex,
} from "@/types/IndexTypes";
import { ChromaticIndex } from "@/types/ChromaticIndex";
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
import { isBlackKey } from "./Keyboard/KeyboardUtils";

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

  private static getChordSpellingPreferenceForRoot(
    chordType: NoteGroupingId,
    rootChromaticIndex: ChromaticIndex
  ): AccidentalType {
    // For white key roots, use the general chord spelling preference
    if (!isBlackKey(rootChromaticIndex)) {
      return this.getChordSpellingPreference(chordType);
    }

    // For black key roots, major-quality chords prefer flats, minor/diminished prefer sharps
    return ChordUtils.isMinorQualityChord(chordType)
      ? AccidentalType.Sharp
      : AccidentalType.Flat;
  }

  private static getChordSpellingPreference(
    chordType: NoteGroupingId
  ): AccidentalType {
    return ChordUtils.isMinorQualityChord(chordType)
      ? AccidentalType.Flat
      : AccidentalType.Sharp;
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

    // Get the root chromatic index to determine spelling preference
    const { chromaticIndex: rootChromaticIndex } =
      actualIndexToChromaticAndOctave(baseIndex);

    // Use root-note-aware spelling logic for black keys
    const accidentalPreference = this.getChordSpellingPreferenceForRoot(
      selectedChordType,
      rootChromaticIndex
    );

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
