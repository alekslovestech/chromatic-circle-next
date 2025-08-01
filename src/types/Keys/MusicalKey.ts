import { IndexUtils } from "../../utils/IndexUtils";

import { AccidentalType } from "../AccidentalType";
import { addChromatic, ChromaticIndex, ixChromatic } from "../ChromaticIndex";
import { GreekModeDictionary } from "../GreekModes/GreekModeDictionary";
import { GreekModeInfo } from "../GreekModes/GreekModeInfo";
import { ScaleDegreeIndex } from "../GreekModes/ScaleDegreeType";
import { GreekModeType } from "../GreekModes/GreekModeType";
import { ScaleDegreeInfo } from "../GreekModes/ScaleDegreeInfo";
import { ActualIndex, ixActualArray } from "../IndexTypes";
import { KeySignature } from "../Keys/KeySignature";
import { isMajor, KeyType } from "../Keys/KeyType";
import { KeyNoteResolver } from "./KeyNoteResolver";
import { TWELVE } from "../NoteConstants";
import { NoteConverter } from "../NoteConverter";
import { NoteInfo } from "../NoteInfo";
import { KeyDisplayMode } from "../SettingModes";
import { ScalePlaybackMode } from "../ScalePlaybackMode";

export class MusicalKey {
  public readonly tonicString: string; // Root note (e.g., "C", "A")
  public readonly classicalMode: KeyType; // Major or minor scale
  public readonly greekMode: GreekModeType;
  public readonly keySignature: KeySignature;
  public readonly tonicIndex: ChromaticIndex;
  public readonly greekModeInfo: GreekModeInfo;

  private constructor(
    tonicAsString: string,
    classicalMode: KeyType,
    greekMode: GreekModeType
  ) {
    this.tonicString = NoteConverter.sanitizeNoteString(tonicAsString);
    this.classicalMode = classicalMode;
    this.greekMode = greekMode;
    this.keySignature = new KeySignature(tonicAsString, classicalMode);
    this.tonicIndex = NoteConverter.toChromaticIndex(this.tonicString);
    this.greekModeInfo = GreekModeDictionary.getModeInfo(greekMode);
  }

  public get scalePatternLength(): number {
    return this.greekModeInfo.scalePattern.getLength();
  }

  /**
   * Gets the offsets for a given scale degree.
   * @param scaleDegreeIndex The index in the scale pattern (0-6)
   * @param isTriad If true, returns offsets for root, third and fifth (for roman numeral triads)
   *               If false, returns just the root offset (for single note scale degrees)
   */
  public getOffsets(
    scaleDegreeIndex: ScaleDegreeIndex,
    scalePlaybackMode: ScalePlaybackMode
  ): number[] {
    switch (scalePlaybackMode) {
      case ScalePlaybackMode.Triad:
        return this.greekModeInfo.scalePattern.getOffsets135(scaleDegreeIndex);
      case ScalePlaybackMode.Seventh:
        return this.greekModeInfo.scalePattern.getOffsets1357(scaleDegreeIndex);
      case ScalePlaybackMode.DronedSingleNote:
        return this.greekModeInfo.scalePattern.getTonicDroneWithRootOffset(
          scaleDegreeIndex
        );
      default:
        return this.greekModeInfo.scalePattern.getRootOffset(scaleDegreeIndex);
    }
  }

  public getNoteIndicesForScaleDegree(
    scaleDegreeIndex: ScaleDegreeIndex,
    scalePlaybackMode: ScalePlaybackMode
  ): ActualIndex[] {
    const offsets = this.getOffsets(scaleDegreeIndex, scalePlaybackMode);
    const noteIndices = offsets.map((offset) => offset + this.tonicIndex);
    return ixActualArray(IndexUtils.fitChordToAbsoluteRange(noteIndices));
  }

  toString(): string {
    return `${this.tonicString} (${this.classicalMode} | ${this.greekMode})`;
  }

  static fromClassicalMode(
    tonicAsString: string,
    classicalMode: KeyType
  ): MusicalKey {
    const greekMode = isMajor(classicalMode)
      ? GreekModeType.Ionian
      : GreekModeType.Aeolian;
    return new MusicalKey(tonicAsString, classicalMode, greekMode);
  }

  static fromGreekMode(
    tonicAsString: string,
    greekMode: GreekModeType
  ): MusicalKey {
    const classicalMode = [
      GreekModeType.Ionian,
      GreekModeType.Lydian,
      //   GreekModeType.Mixolydian,
    ].includes(greekMode)
      ? KeyType.Major
      : KeyType.Minor;
    return new MusicalKey(tonicAsString, classicalMode, greekMode);
  }

  getOppositeKey(): MusicalKey {
    const newMode = isMajor(this.classicalMode) ? KeyType.Minor : KeyType.Major;
    const newTonicAsString = this.findKeyWithTonicIndex(
      this.tonicIndex,
      newMode
    );
    return MusicalKey.fromClassicalMode(newTonicAsString, newMode);
  }

  getTransposedKey(amount: number): MusicalKey {
    const newTonicIndex = addChromatic(this.tonicIndex, amount);
    const newTonicAsString = this.findKeyWithTonicIndex(
      newTonicIndex,
      this.classicalMode
    );
    return MusicalKey.fromGreekMode(newTonicAsString, this.greekMode);
  }

  getCanonicalIonianKey(): MusicalKey {
    const ionianTonicIndex = this.greekModeInfo.getIonianTonicIndex(
      this.tonicIndex
    );
    const ionianTonicString = this.findKeyWithTonicIndex(
      ionianTonicIndex,
      KeyType.Major
    );
    return MusicalKey.fromGreekMode(ionianTonicString, GreekModeType.Ionian);
  }

  getDefaultAccidental(): AccidentalType {
    return this.keySignature.getDefaultAccidental();
  }

  public getScaleDegreeInfoFromChromatic(
    chromaticIndex: ChromaticIndex
  ): ScaleDegreeInfo | null {
    return this.greekModeInfo.getScaleDegreeInfoFromChromatic(
      chromaticIndex,
      this.tonicIndex
    );
  }

  getNoteInfoFromChromatic(chromaticIndex: ChromaticIndex): NoteInfo {
    return KeyNoteResolver.resolveAbsoluteNote(
      chromaticIndex,
      this.getDefaultAccidental()
    );
  }

  private findKeyWithTonicIndex(
    tonicIndex: ChromaticIndex,
    mode: KeyType
  ): string {
    const keyList = KeySignature.getKeyList(mode);
    const tonicAsString = keyList.find(
      (key) => NoteConverter.toChromaticIndex(key) === tonicIndex
    );
    return tonicAsString!;
  }

  getDisplayString(
    chromaticIndex: ChromaticIndex,
    keyTextMode: KeyDisplayMode
  ): string {
    const scaleDegreeInfo =
      this.getScaleDegreeInfoFromChromatic(chromaticIndex);
    if (keyTextMode === KeyDisplayMode.NoteNames) {
      const noteInfo = KeyNoteResolver.resolveAbsoluteNote(
        chromaticIndex,
        this.getDefaultAccidental()
      );
      return noteInfo.formatNoteNameForDisplay();
    }
    if (!scaleDegreeInfo) return "";

    return this.greekModeInfo.getDisplayString(scaleDegreeInfo, keyTextMode);
  }

  getDisplayStringArray(keyTextMode: KeyDisplayMode): string[] {
    return Array.from({ length: TWELVE }, (_, i) =>
      this.getDisplayString(ixChromatic(i), keyTextMode)
    );
  }
}

export const DEFAULT_MUSICAL_KEY = MusicalKey.fromClassicalMode(
  "C",
  KeyType.Major
);
