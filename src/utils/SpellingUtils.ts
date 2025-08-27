import { NoteGroupingId } from "@/types/NoteGroupingId";
import { SpecialType } from "@/types/enums/SpecialType";
import { ChordType } from "@/types/enums/ChordType";
import { ChordMatch } from "@/types/interfaces/ChordMatch";

import {
  ActualIndex,
  actualToChromatic,
  InversionIndex,
} from "@/types/IndexTypes";
import { MusicalKey } from "@/types/Keys/MusicalKey";
import { NoteWithOctave } from "@/types/interfaces/NoteWithOctave";

import { ChordUtils } from "@/utils/ChordUtils";
import { IndexUtils } from "@/utils/IndexUtils";

import { AccidentalPreferenceResolver } from "@/utils/resolvers/AccidentalPreferenceResolver";
import { ActualNoteResolver } from "@/utils/resolvers/ActualNoteResolver";
import { NoteGroupingLibrary } from "@/types/NoteGroupingLibrary";

export class SpellingUtils {
  static computeSingleNoteFromChordPreset(
    targetNoteIndex: ActualIndex,
    chordIndices: ActualIndex[],
    chordMatch: ChordMatch
  ): NoteWithOctave {
    // Direct computation for single note - no array creation
    const rootIndex = IndexUtils.rootNoteAtInversion(
      chordIndices,
      chordMatch.inversionIndex
    );
    const rootChromaticIndex = actualToChromatic(rootIndex);
    const accidentalPreference =
      AccidentalPreferenceResolver.getChordPresetSpellingPreference(
        chordMatch.definition.id,
        rootChromaticIndex
      );
    return ActualNoteResolver.resolveAbsoluteNoteWithOctave(
      targetNoteIndex,
      accidentalPreference
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
    // Create a minimal ChordMatch for reuse
    const chordMatch: ChordMatch = {
      rootNote: baseIndex,
      definition: NoteGroupingLibrary.getGroupingById(selectedChordType),
      inversionIndex: selectedInversionIndex,
    };

    return this.computeSingleNoteFromChordPreset(
      chordIndices[0],
      chordIndices,
      chordMatch
    );
  }

  static computeNotesFromMusicalKey(
    actualIndices: ActualIndex[],
    selectedMusicalKey: MusicalKey
  ): NoteWithOctave[] {
    return actualIndices.map((actualIndex) =>
      ActualNoteResolver.resolveNoteInKeyWithOctave(
        selectedMusicalKey,
        actualIndex
      )
    );
  }

  static computeNotesFromChordPreset(
    chordIndices: ActualIndex[],
    chordMatch: ChordMatch
  ): NoteWithOctave[] {
    return chordIndices.map((actualIndex) =>
      this.computeSingleNoteFromChordPreset(
        actualIndex,
        chordIndices,
        chordMatch
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

  // Add a method that uses ChordMatch when available, falls back to reverse-engineering
  static computeNotesWithOptimalStrategy(
    selectedNoteIndices: ActualIndex[],
    selectedMusicalKey: MusicalKey,
    currentChordMatch?: ChordMatch
  ): NoteWithOctave[] {
    return currentChordMatch
      ? this.computeNotesFromChordPreset(selectedNoteIndices, currentChordMatch)
      : this.computeNotesFromMusicalKey(
          selectedNoteIndices,
          selectedMusicalKey
        );
  }
}
