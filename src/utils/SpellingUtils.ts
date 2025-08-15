import {
  ActualIndex,
  actualIndexToChromaticAndOctave,
  InversionIndex,
  ixInversion,
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
import { ChordUtils, IChordDisplayInfo } from "@/utils/ChordUtils";
import { AccidentalType } from "@/types/AccidentalType";
import { isBlackKey } from "./Keyboard/KeyboardUtils";
import { NoteGrouping } from "@/types/NoteGrouping";
import { ChordDisplayMode } from "@/types/SettingModes";
import { IndexUtils } from "./IndexUtils";
import { NoteGroupingLibrary } from "@/types/NoteGroupingLibrary";

export class SpellingUtils {
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

  private static getSpellingPreference(
    chordType: NoteGroupingId,
    rootChromaticIndex: ChromaticIndex
  ): AccidentalType {
    const isMinorQuality = ChordUtils.isMinorQualityChord(chordType);
    const isBlackKeyRoot = isBlackKey(rootChromaticIndex);
    return isBlackKeyRoot === isMinorQuality
      ? AccidentalType.Sharp
      : AccidentalType.Flat;
  }

  private static computeFirstNoteFromChordPreset = (
    baseIndex: ActualIndex,
    selectedChordType: NoteGroupingId,
    selectedInversionIndex: InversionIndex
  ): NoteWithOctave => {
    const chordIndices = ChordUtils.calculateChordNotesFromIndex(
      baseIndex,
      selectedChordType,
      selectedInversionIndex
    );

    const { chromaticIndex: rootChromaticIndex } =
      actualIndexToChromaticAndOctave(baseIndex);

    const accidentalPreference = this.getSpellingPreference(
      selectedChordType,
      rootChromaticIndex
    );

    const { chromaticIndex, octaveOffset } = actualIndexToChromaticAndOctave(
      chordIndices[0]
    );

    const noteInfo = KeyNoteResolver.resolveAbsoluteNote(
      chromaticIndex,
      accidentalPreference
    );
    return new NoteWithOctave(noteInfo, octaveOffset);
  };

  static computeNotesFromChordPreset = (
    baseIndex: ActualIndex,
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

    const accidentalPreference = this.getSpellingPreference(
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

  /**
   * Get display info for chord presets using proper spelling
   */
  static getChordPresetDisplayInfo(
    selectedNoteIndices: ActualIndex[],
    selectedChordType: NoteGroupingId,
    selectedInversionIndex: InversionIndex,
    chordDisplayMode: ChordDisplayMode
  ): IChordDisplayInfo {
    if (selectedNoteIndices.length === 0) {
      return { noteGroupingString: "None", chordName: "Ø" };
    }

    const rootNoteIndex = IndexUtils.rootNoteAtInversion(
      selectedNoteIndices,
      selectedInversionIndex
    );

    // Get spelled notes for root and bass using the new helper function
    const rootSpelling = this.computeFirstNoteFromChordPreset(
      rootNoteIndex,
      selectedChordType,
      ixInversion(0) // Root position
    ).formatNoteNameForDisplay();

    const bassSpelling = this.computeFirstNoteFromChordPreset(
      rootNoteIndex,
      selectedChordType,
      selectedInversionIndex
    ).formatNoteNameForDisplay();

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
