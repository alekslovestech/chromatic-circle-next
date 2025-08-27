import { TWELVE } from "@/types/constants/NoteConstants";
import { SpecialType } from "@/types/enums/SpecialType";
import { ChordType } from "@/types/enums/ChordType";

import { ChordDisplayInfo } from "@/types/interfaces/ChordDisplayInfo";
import {
  ChordReference,
  makeChordReference,
} from "@/types/interfaces/ChordReference";

import { MusicalKey } from "@/types/Keys/MusicalKey";

import { isIntervalType, NoteGroupingId } from "@/types/NoteGroupingId";
import { ChordDisplayMode } from "@/types/SettingModes";
import {
  ActualIndex,
  InversionIndex,
  ixActual,
  ixInversion,
} from "@/types/IndexTypes";
import { NoteGrouping } from "@/types/NoteGrouping";
import { NoteGroupingLibrary } from "@/types/NoteGroupingLibrary";

import { NoteConverter } from "@/utils/NoteConverter";
import { IndexUtils } from "@/utils/IndexUtils";
import { SpellingUtils } from "@/utils/SpellingUtils";

import { NoteFormatter } from "./NoteFormatter";

export class MusicalDisplayFormatter {
  static getDisplayInfoFromIndices(
    indices: ActualIndex[],
    chordDisplayMode: ChordDisplayMode,
    musicalKey: MusicalKey
  ): ChordDisplayInfo {
    const chordRef = this.getChordReferenceFromIndices(indices);
    const noteGrouping = NoteGrouping.getNoteGroupingTypeFromNumNotes(
      indices.length
    );

    let chordName = "";
    if (chordRef) {
      chordName =
        chordRef.id === ChordType.Unknown
          ? this.formatUnknownChordName(chordRef, musicalKey)
          : this.deriveChordNameFromReference(
              chordRef,
              chordDisplayMode,
              musicalKey
            );
    }

    return {
      noteGroupingString: noteGrouping.toString(),
      chordName,
    };
  }

  static getChordPresetDisplayInfo(
    selectedNoteIndices: ActualIndex[],
    chordRef: ChordReference,
    chordDisplayMode: ChordDisplayMode
  ): ChordDisplayInfo {
    if (selectedNoteIndices.length === 0) {
      return { noteGroupingString: "None", chordName: "Ø" };
    }

    if (selectedNoteIndices.length === 2) {
      const chordTypeName = NoteGroupingLibrary.getId(
        chordRef.id,
        ChordDisplayMode.Letters_Short
      );
      return { noteGroupingString: "Interval", chordName: chordTypeName };
    }

    const chordName = this.buildChordNameFromReference(
      chordRef,
      chordDisplayMode
    );

    const noteGrouping = NoteGrouping.getNoteGroupingTypeFromNumNotes(
      selectedNoteIndices.length
    );

    return {
      noteGroupingString: noteGrouping.toString(),
      chordName,
    };
  }

  private static buildChordNameFromReference(
    chordRef: ChordReference,
    chordDisplayMode: ChordDisplayMode
  ): string {
    // Get spelled notes for root and bass using ChordReference
    const rootNoteWithOctave = SpellingUtils.computeFirstNoteFromChordPreset(
      chordRef.rootNote,
      chordRef.id,
      ixInversion(0) // Root position
    );
    const rootSpelling = NoteFormatter.formatForDisplay(rootNoteWithOctave);

    const bassNoteWithOctave = SpellingUtils.computeFirstNoteFromChordPreset(
      chordRef.rootNote,
      chordRef.id,
      chordRef.inversionIndex
    );
    const bassSpelling = NoteFormatter.formatForDisplay(bassNoteWithOctave);

    // Build chord name using existing library function
    const chordTypeName = NoteGroupingLibrary.getId(
      chordRef.id,
      chordDisplayMode
    );

    return rootSpelling === bassSpelling
      ? `${rootSpelling}${chordTypeName}`
      : `${rootSpelling}${chordTypeName}/${bassSpelling}`;
  }

  // Backward compatibility wrapper (can be deprecated later)
  static getChordPresetDisplayInfoLegacy(
    selectedNoteIndices: ActualIndex[],
    selectedChordType: NoteGroupingId,
    selectedInversionIndex: InversionIndex,
    chordDisplayMode: ChordDisplayMode
  ): ChordDisplayInfo {
    // Create ChordReference from the old parameters
    const rootNoteIndex =
      selectedNoteIndices.length > 0
        ? IndexUtils.rootNoteAtInversion(
            selectedNoteIndices,
            selectedInversionIndex
          )
        : ixActual(0);

    const chordRef = makeChordReference(
      rootNoteIndex,
      selectedChordType,
      selectedInversionIndex
    );

    return this.getChordPresetDisplayInfo(
      selectedNoteIndices,
      chordRef,
      chordDisplayMode
    );
  }

  // We need to modify getChordReferenceFromIndices to preserve the bass note information
  static getChordReferenceFromIndices(
    indices: ActualIndex[]
  ): ChordReference | null {
    if (indices.length === 0) {
      return makeChordReference(0, SpecialType.None, 0);
    }

    const normalizedIndices = IndexUtils.normalizeIndices(indices);

    // Try to find in root position first (most common case)
    const rootPositionMatch = this.findRootPositionMatch(
      normalizedIndices,
      indices
    );
    if (rootPositionMatch) return rootPositionMatch;

    // Then try inversions
    const inversionMatch = this.findInversionMatch(normalizedIndices, indices);
    if (inversionMatch) return inversionMatch;

    // Fallback to unknown chord
    return this.createUnknownChordReference(indices);
  }

  // Add a new method that also returns the original bass note
  static getChordReferenceWithBassFromIndices(indices: ActualIndex[]): {
    chordRef: ChordReference | null;
    bassNote: ActualIndex | null;
  } {
    const chordRef = this.getChordReferenceFromIndices(indices);
    const bassNote = indices.length > 0 ? indices[0] : null; // Assuming indices are sorted with bass note first

    return { chordRef, bassNote };
  }

  private static findRootPositionMatch(
    normalizedIndices: number[],
    originalIndices: ActualIndex[]
  ): ChordReference | null {
    const allIds = NoteGroupingLibrary.getAllIds();

    for (const id of allIds) {
      const definition = NoteGroupingLibrary.getGroupingById(id);
      if (!definition) continue;

      const inversionIndices = IndexUtils.normalizeIndices(definition.offsets);

      if (IndexUtils.areIndicesEqual(inversionIndices, normalizedIndices)) {
        return this.createChordReferenceIndices(
          originalIndices,
          id,
          ixInversion(0)
        );
      }
    }

    return null;
  }

  private static findInversionMatch(
    normalizedIndices: number[],
    originalIndices: ActualIndex[]
  ): ChordReference | null {
    const allIds = NoteGroupingLibrary.getAllIds();

    for (const id of allIds) {
      const definition = NoteGroupingLibrary.getGroupingById(id);
      if (!definition) continue;

      for (let i = 1 as InversionIndex; i < definition.inversions.length; i++) {
        const inversionIndices = IndexUtils.normalizeIndices(
          definition.inversions[i]
        );

        if (IndexUtils.areIndicesEqual(inversionIndices, normalizedIndices)) {
          return this.createChordReferenceIndices(originalIndices, id, i);
        }
      }
    }

    return null;
  }

  private static createChordReferenceIndices(
    indices: ActualIndex[],
    id: NoteGroupingId,
    inversionIndex: InversionIndex
  ): ChordReference {
    const rootNoteAtInversion = IndexUtils.rootNoteAtInversion(
      indices,
      inversionIndex
    );
    const rootNoteIndex = ixActual(rootNoteAtInversion % TWELVE);
    return makeChordReference(rootNoteIndex, id, inversionIndex);
  }

  // Modified method that can take an optional bass note
  static deriveChordNameFromReference(
    chordRef: ChordReference,
    displayMode: ChordDisplayMode,
    selectedMusicalKey: MusicalKey,
    bassNote?: ActualIndex // Optional bass note override
  ): string {
    const selectedAccidental = selectedMusicalKey.getDefaultAccidental();
    const rootNoteName = NoteConverter.getNoteTextFromActualIndex(
      chordRef.rootNote,
      selectedAccidental
    );

    if (chordRef.id === SpecialType.None) return "Ø";
    if (chordRef.id === ChordType.Unknown) return `${rootNoteName}(?)`;

    if (isIntervalType(chordRef.id))
      return NoteGroupingLibrary.getId(chordRef.id, displayMode);

    const chordTypeName = NoteGroupingLibrary.getId(chordRef.id, displayMode);

    // Root position case
    if (chordRef.inversionIndex === 0) return `${rootNoteName}${chordTypeName}`;

    // Inversion case - use provided bass note or calculate it
    const actualBassNote =
      bassNote ?? this.calculateBassNoteFromReference(chordRef);
    const bassNoteName = NoteConverter.getNoteTextFromActualIndex(
      ixActual(actualBassNote % TWELVE),
      selectedAccidental
    );

    return `${rootNoteName}${chordTypeName}/${bassNoteName}`;
  }

  private static calculateBassNoteFromReference(
    chordRef: ChordReference
  ): ActualIndex {
    const definition = NoteGroupingLibrary.getGroupingById(chordRef.id);
    if (!definition || chordRef.inversionIndex === 0) {
      return chordRef.rootNote;
    }

    const inversionOffsets = definition.inversions[chordRef.inversionIndex];
    const bassOffset = inversionOffsets[0]; // First note in inversion is the bass

    // Handle negative offsets properly
    let bassNote = chordRef.rootNote + bassOffset;
    while (bassNote < 0) bassNote += TWELVE;

    return ixActual(bassNote % TWELVE);
  }

  // New method for creating unknown chord references
  private static createUnknownChordReference(
    indices: ActualIndex[]
  ): ChordReference {
    if (indices.length === 0) {
      return makeChordReference(0, ChordType.Unknown, 0);
    }

    // Use the lowest note as the root for unknown chords
    const sortedIndices = [...indices].sort((a, b) => a - b);
    const rootIndex = sortedIndices[0];

    return makeChordReference(rootIndex, ChordType.Unknown, 0);
  }

  // Enhanced method for deriving chord names that handles unknown chords better
  private static formatUnknownChordName(
    chordRef: ChordReference,
    selectedMusicalKey: MusicalKey
  ): string {
    const selectedAccidental = selectedMusicalKey.getDefaultAccidental();
    const rootNoteName = NoteConverter.getNoteTextFromActualIndex(
      chordRef.rootNote,
      selectedAccidental
    );

    return `${rootNoteName}(?)`;
  }
}
