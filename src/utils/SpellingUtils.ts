import { NoteGroupingId } from "@/types/NoteGroupingId";
import { SpecialType } from "@/types/enums/SpecialType";
import { ChordType } from "@/types/enums/ChordType";
import { ChordMatch } from "@/types/interfaces/ChordMatch";

import {
  ActualIndex,
  actualIndexToChromaticAndOctave,
  InversionIndex,
} from "@/types/IndexTypes";
import { MusicalKey } from "@/types/Keys/MusicalKey";
import { NoteWithOctave } from "@/types/NoteWithOctave";

import { ChordUtils } from "@/utils/ChordUtils";
import { IndexUtils } from "@/utils/IndexUtils";

import { AccidentalPreferenceResolver } from "@/utils/resolvers/AccidentalPreferenceResolver";
import { ActualNoteResolver } from "@/utils/resolvers/ActualNoteResolver";

import { MusicalDisplayFormatter } from "@/utils/formatters/MusicalDisplayFormatter";

export class SpellingUtils {
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

  static computeSpecificNoteInChordContext(
    targetNoteIndex: ActualIndex,
    selectedNoteIndices: ActualIndex[], // The full chord
    selectedMusicalKey: MusicalKey,
    selectedChordType: NoteGroupingId,
    isChordsOrIntervals: boolean,
    isScalesMode?: boolean
  ): NoteWithOctave | null {
    if (selectedNoteIndices.length === 0) return null;

    // Use the same decision logic as computeStaffNotes
    const isChordPresetKnown = isScalesMode
      ? false
      : this.isChordPresetKnown(selectedChordType, isChordsOrIntervals);

    let spelledNotes: NoteWithOctave[];

    if (isChordPresetKnown) {
      const chordMatch =
        MusicalDisplayFormatter.getMatchFromIndices(selectedNoteIndices);
      spelledNotes = this.computeNotesFromChordPreset(
        selectedNoteIndices,
        chordMatch
      );
    } else {
      spelledNotes = this.computeNotesFromMusicalKey(
        selectedNoteIndices,
        selectedMusicalKey
      );
    }

    // Find the spelled note that corresponds to our target note
    // We need to match by chromatic equivalence since octaves might differ
    const { chromaticIndex: targetChromatic } =
      actualIndexToChromaticAndOctave(targetNoteIndex);

    for (let i = 0; i < selectedNoteIndices.length; i++) {
      const { chromaticIndex: chordNoteChromatic } =
        actualIndexToChromaticAndOctave(selectedNoteIndices[i]);
      if (chordNoteChromatic === targetChromatic) {
        return spelledNotes[i];
      }
    }

    return null; // Target note not found in the chord
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

    const noteInfo = ActualNoteResolver.resolveAbsoluteNoteWithOctave(
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
      ActualNoteResolver.resolveAbsoluteNoteWithOctave(
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
    isChordsOrIntervals: boolean,
    isScalesMode?: boolean // Add this parameter
  ): NoteWithOctave[] {
    if (selectedNoteIndices.length === 0) return [];

    // In scales mode, always use key-based spelling regardless of chord presets
    const isChordPresetKnown = isScalesMode
      ? false
      : this.isChordPresetKnown(selectedChordType, isChordsOrIntervals);

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
