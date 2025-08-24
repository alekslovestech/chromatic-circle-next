import { TWELVE } from "@/types/constants/NoteConstants";
import { AccidentalType } from "@/types/enums/AccidentalType";
import { SpecialType } from "@/types/enums/SpecialType";
import { ChordType } from "@/types/enums/ChordType";
import { NoteGroupingType } from "@/types/enums/NoteGroupingType";

import { ChordDisplayInfo } from "@/types/interfaces/ChordDisplayInfo";
import { ChordMatch, makeChordMatch } from "@/types/interfaces/ChordMatch";

import { MusicalKey } from "@/types/Keys/MusicalKey";

import { NoteGroupingId } from "@/types/NoteGroupingId";
import { ChordDisplayMode } from "@/types/SettingModes";
import {
  ActualIndex,
  addOffsetToActual,
  InversionIndex,
  ixActual,
  ixInversion,
  ixOffset,
} from "@/types/IndexTypes";
import { NoteGrouping } from "@/types/NoteGrouping";
import { NoteGroupingLibrary } from "@/types/NoteGroupingLibrary";

import { NoteConverter } from "@/utils/NoteConverter";
import { IndexUtils } from "@/utils/IndexUtils";
import { SpellingUtils } from "@/utils/SpellingUtils";
import { ChordUtils } from "@/utils/ChordUtils";

import { NoteFormatter } from "./NoteFormatter";

export class MusicalDisplayFormatter {
  static getDisplayInfoFromIndices(
    indices: ActualIndex[],
    chordDisplayMode: ChordDisplayMode,
    musicalKey: MusicalKey
  ): ChordDisplayInfo {
    const chordMatch = this.getMatchFromIndices(indices);
    const noteGrouping = NoteGrouping.getNoteGroupingTypeFromNumNotes(
      indices.length
    );
    const chordName = this.deriveChordName(
      chordMatch,
      chordDisplayMode,
      musicalKey
    );
    const noteGroupingString = noteGrouping.toString();
    return { noteGroupingString, chordName };
  }

  static getChordPresetDisplayInfo(
    selectedNoteIndices: ActualIndex[],
    selectedChordType: NoteGroupingId,
    selectedInversionIndex: InversionIndex,
    chordDisplayMode: ChordDisplayMode
  ): ChordDisplayInfo {
    if (selectedNoteIndices.length === 0) {
      return { noteGroupingString: "None", chordName: "Ø" };
    }

    if (selectedNoteIndices.length === 2) {
      const chordTypeName = NoteGroupingLibrary.getId(
        selectedChordType,
        ChordDisplayMode.Letters_Short
      );
      return { noteGroupingString: "Interval", chordName: chordTypeName };
    }

    const rootNoteIndex = IndexUtils.rootNoteAtInversion(
      selectedNoteIndices,
      selectedInversionIndex
    );

    // Get spelled notes for root and bass using the new helper function
    const rootNoteWithOctave = SpellingUtils.computeFirstNoteFromChordPreset(
      rootNoteIndex,
      selectedChordType,
      ixInversion(0) // Root position
    );
    const rootSpelling = NoteFormatter.formatForDisplay(rootNoteWithOctave);

    const bassNoteWithOctave = SpellingUtils.computeFirstNoteFromChordPreset(
      rootNoteIndex,
      selectedChordType,
      selectedInversionIndex
    );
    const bassSpelling = NoteFormatter.formatForDisplay(bassNoteWithOctave);

    // Build chord name using existing library function
    const chordTypeName = NoteGroupingLibrary.getId(
      selectedChordType,
      chordDisplayMode
    );
    const chordName =
      rootSpelling === bassSpelling
        ? `${rootSpelling}${chordTypeName}`
        : `${rootSpelling}${chordTypeName}/${bassSpelling}`;

    const noteGrouping = NoteGrouping.getNoteGroupingTypeFromNumNotes(
      selectedNoteIndices.length
    );

    return {
      noteGroupingString: noteGrouping.toString(),
      chordName,
    };
  }

  static getMatchFromIndices(indices: ActualIndex[]): ChordMatch {
    if (indices.length === 0) {
      return makeChordMatch(
        0,
        NoteGroupingLibrary.getGroupingById(SpecialType.None),
        0
      );
    }

    const normalizedIndices = IndexUtils.normalizeIndices(indices);
    const allIds = NoteGroupingLibrary.getAllIds();

    // Check all note grouping types in root position first
    for (const id of allIds) {
      const definition = NoteGroupingLibrary.getGroupingById(id);
      const inversionIndices = IndexUtils.normalizeIndices(definition.offsets);

      if (IndexUtils.areIndicesEqual(inversionIndices, normalizedIndices)) {
        const rootNoteIndex = ixActual(
          IndexUtils.rootNoteAtInversion(indices, ixInversion(0)) % TWELVE
        );
        return makeChordMatch(rootNoteIndex, definition, 0);
      }
    }

    // Then check all inversions for each type
    for (const id of allIds) {
      const definition = NoteGroupingLibrary.getGroupingById(id);
      for (let i = 1 as InversionIndex; i < definition.inversions.length; i++) {
        const inversionIndices = IndexUtils.normalizeIndices(
          definition.inversions[i]
        );
        if (IndexUtils.areIndicesEqual(inversionIndices, normalizedIndices)) {
          const rootNoteAtInversion = IndexUtils.rootNoteAtInversion(
            indices,
            i
          );
          const rootNoteIndex = ixActual(rootNoteAtInversion % TWELVE);
          return makeChordMatch(rootNoteIndex, definition, i);
        }
      }
    }

    return this.createUnknownChord(indices);
  }

  static deriveChordName(
    chordMatch: ChordMatch,
    displayMode: ChordDisplayMode,
    selectedMusicalKey: MusicalKey
  ): string {
    const selectedAccidental = selectedMusicalKey.getDefaultAccidental();
    const isUnknownChord = chordMatch.definition.id === ChordType.Unknown;
    const bassNoteIndex = this.getBassNoteIndex(chordMatch, isUnknownChord);
    const chordNameRoot = this.getChordNameRoot(
      chordMatch,
      selectedAccidental,
      isUnknownChord,
      displayMode
    );
    const noteGroupingType = this.getNoteGroupingType(
      chordMatch,
      isUnknownChord
    );

    // Format the chord name based on the note grouping type
    switch (noteGroupingType) {
      case NoteGroupingType.None:
        return "Ø";
      case NoteGroupingType.Note:
        return chordNameRoot;
      case NoteGroupingType.Interval:
        return NoteGroupingLibrary.getId(chordMatch.definition.id, displayMode);
      default:
        if (bassNoteIndex !== chordMatch.rootNote) {
          const bassNoteName = NoteConverter.getNoteTextFromActualIndex(
            bassNoteIndex,
            selectedAccidental
          );
          return `${chordNameRoot}/${bassNoteName}`;
        }
        return chordNameRoot;
    }
  }

  private static getNoteGroupingType(
    chordMatch: ChordMatch,
    isUnknownChord: boolean
  ): NoteGroupingType {
    return isUnknownChord
      ? NoteGroupingType.Chord
      : chordMatch.definition.getNoteGroupingType();
  }

  private static createUnknownChord(indices: ActualIndex[]): ChordMatch {
    const firstIndex = indices.length > 0 ? indices[0] : 0;
    const offsets = indices.map((index) => ixOffset(index - firstIndex));
    const definition = new NoteGrouping(
      ChordType.Unknown,
      "",
      "",
      "",
      -1,
      offsets,
      false
    );
    return makeChordMatch(firstIndex, definition, 0);
  }

  private static getBassNoteIndex(
    chordMatch: ChordMatch,
    isUnknownChord: boolean
  ): ActualIndex {
    if (isUnknownChord || chordMatch.definition.offsets.length === 0) {
      return chordMatch.rootNote;
    }

    const offsets = ChordUtils.getOffsetsFromIdAndInversion(
      chordMatch.definition.id,
      chordMatch.inversionIndex
    );
    return addOffsetToActual(chordMatch.rootNote, offsets[0]);
  }

  private static getChordNameRoot(
    chordMatch: ChordMatch,
    selectedAccidental: AccidentalType,
    isUnknownChord: boolean,
    displayMode: ChordDisplayMode
  ): string {
    const rootNoteName = NoteConverter.getNoteTextFromActualIndex(
      chordMatch.rootNote,
      selectedAccidental
    );
    const idWithoutRoot = isUnknownChord
      ? "(?)"
      : NoteGroupingLibrary.getId(chordMatch.definition.id, displayMode);
    return `${rootNoteName}${idWithoutRoot}`;
  }
}
