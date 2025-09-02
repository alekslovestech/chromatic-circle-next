import {
  ChordReference,
  makeChordReference,
} from "@/types/interfaces/ChordReference";
import { NoteWithOctave } from "@/types/interfaces/NoteWithOctave";

import { NoteGroupingId } from "@/types/NoteGroupingId";

import {
  ActualIndex,
  actualToChromatic,
  InversionIndex,
} from "@/types/IndexTypes";
import { MusicalKey } from "@/types/Keys/MusicalKey";

import { ChordUtils } from "@/utils/ChordUtils";
import { AccidentalPreferenceResolver } from "@/utils/resolvers/AccidentalPreferenceResolver";
import { ActualNoteResolver } from "@/utils/resolvers/ActualNoteResolver";

export class SpellingUtils {
  static computeSingleNoteFromChordPreset(
    targetNoteIndex: ActualIndex,
    chordRef: ChordReference
  ): NoteWithOctave {
    const rootIndex = chordRef.rootNote;
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
    const chordRef = makeChordReference(
      baseIndex,
      selectedChordType,
      selectedInversionIndex
    );

    const chordIndices =
      ChordUtils.calculateChordNotesFromChordReference(chordRef);

    return this.computeSingleNoteFromChordPreset(chordIndices[0], chordRef);
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
      this.computeSingleNoteFromChordPreset(actualIndex, chordRef)
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
