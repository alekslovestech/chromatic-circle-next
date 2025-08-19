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
import { NoteWithOctave } from "@/types/NoteWithOctave";
import { ChordUtils } from "@/utils/ChordUtils";
import { AccidentalPreferenceResolver } from "@/utils/AccidentalPreferenceResolver";
import { IndexUtils } from "@/utils/IndexUtils";
import { MusicalDisplayFormatter } from "./formatters/MusicalDisplayFormatter";
import { ChordMatch } from "@/types/interfaces/ChordMatch";

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
    chordIndices: ActualIndex[], // The chord indices we already have
    chordMatch: ChordMatch
  ): NoteWithOctave[] {
    // Use the existing utility to find the root note from the chord indices
    const rootIndex = IndexUtils.rootNoteAtInversion(
      chordIndices,
      chordMatch.inversionIndex
    );

    // Get the root chromatic index to determine spelling preference
    const { chromaticIndex: rootChromaticIndex } =
      actualIndexToChromaticAndOctave(rootIndex);

    const accidentalPreference =
      AccidentalPreferenceResolver.getChordPresetSpellingPreference(
        chordMatch.definition.id,
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
    isChordsOrIntervals: boolean
  ): NoteWithOctave[] {
    if (selectedNoteIndices.length === 0) return [];

    const isChordPresetKnown = this.isChordPresetKnown(
      selectedChordType,
      isChordsOrIntervals
    );
    const chordMatch =
      MusicalDisplayFormatter.getMatchFromIndices(selectedNoteIndices);
    return isChordPresetKnown
      ? this.computeNotesFromChordPreset(
          selectedNoteIndices, // Pass the chord indices we already have
          chordMatch
        )
      : this.computeNotesFromMusicalKey(
          selectedNoteIndices,
          selectedMusicalKey
        );
  }
}
