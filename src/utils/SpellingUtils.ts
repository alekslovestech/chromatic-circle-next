import { NoteGroupingId } from "@/types/NoteGroupingId";

import {
  ActualIndex,
  actualToChromatic,
  InversionIndex,
} from "@/types/IndexTypes";
import { MusicalKey } from "@/types/Keys/MusicalKey";
import { NoteWithOctave } from "@/types/interfaces/NoteWithOctave";

import { ChordUtils } from "@/utils/ChordUtils";

import { AccidentalPreferenceResolver } from "@/utils/resolvers/AccidentalPreferenceResolver";
import { ActualNoteResolver } from "@/utils/resolvers/ActualNoteResolver";
import {
  ChordReference,
  makeChordReference,
} from "@/types/interfaces/ChordReference";

export class SpellingUtils {
  static computeSingleNoteFromChordPreset(
    targetNoteIndex: ActualIndex,
    chordIndices: ActualIndex[],
    chordRef: ChordReference
  ): NoteWithOctave {
    // Direct computation for single note - no array creation
    const rootIndex = ChordUtils.bassNoteAtInversion(
      chordIndices,
      chordRef.inversionIndex
    );
    const rootChromaticIndex = actualToChromatic(rootIndex);
    const accidentalPreference =
      AccidentalPreferenceResolver.getChordPresetSpellingPreference(
        chordRef.id,
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

    const chordRef = makeChordReference(
      baseIndex,
      selectedChordType,
      selectedInversionIndex
    );

    return this.computeSingleNoteFromChordPreset(
      chordIndices[0],
      chordIndices,
      chordRef
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
    chordRef: ChordReference
  ): NoteWithOctave[] {
    return chordIndices.map((actualIndex) =>
      this.computeSingleNoteFromChordPreset(actualIndex, chordIndices, chordRef)
    );
  }

  static computeNotesWithOptimalStrategy(
    selectedNoteIndices: ActualIndex[],
    selectedMusicalKey: MusicalKey,
    currentChordRef?: ChordReference
  ): NoteWithOctave[] {
    return currentChordRef
      ? this.computeNotesFromChordPreset(selectedNoteIndices, currentChordRef)
      : this.computeNotesFromMusicalKey(
          selectedNoteIndices,
          selectedMusicalKey
        );
  }
}
