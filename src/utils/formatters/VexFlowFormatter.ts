import { AccidentalFormatter } from "@/utils/formatters/AccidentalFormatter";
import { NoteWithOctave } from "@/types/NoteWithOctave";
import { Factory, StaveNote } from "vexflow";

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
}
