import { Factory, StaveNote } from "vexflow";

import { MusicalKey } from "@/types/Keys/MusicalKey";
import { isMajor } from "@/types/enums/KeyType";

import { NoteWithOctave } from "@/types/NoteWithOctave";
import { AccidentalFormatter } from "@/utils/formatters/AccidentalFormatter";

export class VexFlowFormatter {
  static formatNote(note: NoteWithOctave, baseOctave: number = 4): string {
    return `${note.noteName}/${baseOctave + note.octaveOffset}`;
  }

  static createVexFlowNotesFromNoteWithOctaves = (
    notesWithOctaves: NoteWithOctave[],
    factory: Factory
  ): StaveNote[] => {
    const keys = notesWithOctaves.map((noteWithOctave, index) => ({
      key: VexFlowFormatter.formatNote(noteWithOctave),
      accidentalSign: AccidentalFormatter.getAccidentalSignForEasyScore(
        noteWithOctave.accidental
      ),
      index,
    }));

    const chordNote = factory.StaveNote({
      keys: keys.map((k) => k.key),
      duration: "w",
    });

    keys.forEach(({ accidentalSign, index }) => {
      if (accidentalSign) {
        chordNote.addModifier(
          factory.Accidental({ type: accidentalSign }),
          index
        );
      }
    });

    return [chordNote];
  };

  static getKeySignatureForVex(musicalKey: MusicalKey) {
    const pureKey = musicalKey.tonicString;
    const majorMinor = isMajor(musicalKey.classicalMode) ? "" : "m";
    return pureKey + majorMinor;
  }
}
