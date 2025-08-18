import { NoteGroupingId } from "@/types/enums/NoteGroupingId";
import { SpecialType } from "@/types/enums/SpecialType";
import { ChordType } from "@/types/enums/ChordType";

import {
  ActualIndex,
  actualIndexToChromaticAndOctave,
  InversionIndex,
} from "@/types/IndexTypes";
import { MusicalKey } from "@/types/Keys/MusicalKey";
import { KeyNoteResolver } from "@/types/Keys/KeyNoteResolver";
import { NoteWithOctave } from "@/types/NoteInfo";
import { ChordUtils } from "@/utils/ChordUtils";
import { AccidentalPreferenceResolver } from "@/utils/AccidentalPreferenceResolver";

export class SpellingUtils {
  static computeNotesFromMusicalKey(
    actualIndices: ActualIndex[],
    selectedMusicalKey: MusicalKey
  ): NoteWithOctave[] {
    return actualIndices.map((actualIndex) =>
      KeyNoteResolver.resolveNoteInKeyWithOctave(
        selectedMusicalKey,
        actualIndex
      )
    );
  }

  static computeFirstNoteFromChordPreset(
    baseIndex: ActualIndex,
    selectedChordType: NoteGroupingId,
    selectedInversionIndex: InversionIndex
  ): NoteWithOctave {
    const chordIndices = ChordUtils.calculateChordNotesFromIndex(
      baseIndex,
      selectedChordType,
      selectedInversionIndex
    );

    const { chromaticIndex: rootChromaticIndex } =
      actualIndexToChromaticAndOctave(baseIndex);

    const accidentalPreference =
      AccidentalPreferenceResolver.getChordPresetSpellingPreference(
        selectedChordType,
        rootChromaticIndex
      );

    const noteInfo = KeyNoteResolver.resolveAbsoluteNoteWithOctave(
      chordIndices[0],
      accidentalPreference
    );
    return noteInfo;
  }

  static computeNotesFromChordPreset(
    baseIndex: ActualIndex,
    selectedChordType: NoteGroupingId,
    selectedInversionIndex: InversionIndex
  ): NoteWithOctave[] {
    // Calculate chord notes from the root
    const chordIndices = ChordUtils.calculateChordNotesFromIndex(
      baseIndex,
      selectedChordType,
      selectedInversionIndex
    );

    // Get the root chromatic index to determine spelling preference
    const { chromaticIndex: rootChromaticIndex } =
      actualIndexToChromaticAndOctave(baseIndex);

    const accidentalPreference =
      AccidentalPreferenceResolver.getChordPresetSpellingPreference(
        selectedChordType,
        rootChromaticIndex
      );

    return chordIndices.map((actualIndex) =>
      KeyNoteResolver.resolveAbsoluteNoteWithOctave(
        actualIndex,
        accidentalPreference
      )
    );
  }

  static isChordPresetKnown(
    selectedChordType: NoteGroupingId,
    isChordsOrIntervals: boolean
  ): boolean {
    return (
      isChordsOrIntervals &&
      selectedChordType !== SpecialType.None &&
      selectedChordType !== SpecialType.Note &&
      selectedChordType !== SpecialType.Freeform &&
      selectedChordType !== ChordType.Unknown
    );
  }

  // High-level orchestrator function that handles the logic flow
  static computeStaffNotes(
    selectedNoteIndices: ActualIndex[],
    selectedMusicalKey: MusicalKey,
    selectedChordType: NoteGroupingId,
    selectedInversionIndex: InversionIndex,
    isChordsOrIntervals: boolean
  ): NoteWithOctave[] {
    if (selectedNoteIndices.length === 0) return [];

    return this.isChordPresetKnown(selectedChordType, isChordsOrIntervals)
      ? this.computeNotesFromChordPreset(
          selectedNoteIndices[0],
          selectedChordType,
          selectedInversionIndex
        )
      : this.computeNotesFromMusicalKey(
          selectedNoteIndices,
          selectedMusicalKey
        );
  }
}
