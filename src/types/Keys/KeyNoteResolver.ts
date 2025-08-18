import { AccidentalType } from "../enums/AccidentalType";

import { ChromaticIndex } from "../ChromaticIndex";
import { ActualIndex, actualIndexToChromaticAndOctave } from "../IndexTypes";
import { NOTES_WITH_SHARP, NOTES_WITH_FLAT } from "../NoteConstants";
import { NoteInfo, NoteWithOctave } from "../NoteInfo";
import { MusicalKey } from "./MusicalKey";

export class KeyNoteResolver {
  static resolveNoteInKey(
    musicalKey: MusicalKey,
    chromaticIndex: ChromaticIndex
  ): NoteInfo {
    const defaultAccidental = musicalKey.getDefaultAccidental();
    const absoluteNote = this.resolveAbsoluteNote(
      chromaticIndex,
      defaultAccidental
    );
    return new NoteInfo(
      absoluteNote.noteName,
      musicalKey.keySignature.applyToNote(
        absoluteNote.noteName,
        absoluteNote.accidental
      )
    );
  }

  static resolveNoteInKeyWithOctave(
    musicalKey: MusicalKey,
    actualIndex: ActualIndex
  ): NoteWithOctave {
    const { chromaticIndex, octaveOffset } =
      actualIndexToChromaticAndOctave(actualIndex);
    const noteInfo = this.resolveNoteInKey(musicalKey, chromaticIndex);
    return new NoteWithOctave(noteInfo, octaveOffset);
  }

  static resolveAbsoluteNote(
    chromaticIndex: ChromaticIndex,
    accidentalPreference: AccidentalType
  ): NoteInfo {
    const notesArray = this.getNotesArray(accidentalPreference);
    return notesArray[chromaticIndex];
  }

  static resolveAbsoluteNoteWithOctave(
    actualIndex: ActualIndex,
    accidentalPreference: AccidentalType
  ): NoteWithOctave {
    const { chromaticIndex, octaveOffset } =
      actualIndexToChromaticAndOctave(actualIndex);
    const noteInfo = this.resolveAbsoluteNote(
      chromaticIndex,
      accidentalPreference
    );
    return new NoteWithOctave(noteInfo, octaveOffset);
  }

  private static getNotesArray = (preference: AccidentalType): NoteInfo[] =>
    preference === AccidentalType.Flat ? NOTES_WITH_FLAT : NOTES_WITH_SHARP;
}
