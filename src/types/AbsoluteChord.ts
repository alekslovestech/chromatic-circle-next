import { ChordType } from "@/types/enums/ChordType";

import { ChromaticIndex } from "@/types/ChromaticIndex";
import { NoteConverter } from "@/utils/NoteConverter";

export class AbsoluteChord {
  public readonly chromaticIndex: ChromaticIndex;
  public readonly chordType: ChordType;

  constructor(note: string | ChromaticIndex, quality: ChordType) {
    this.chromaticIndex =
      typeof note === "string" ? NoteConverter.toChromaticIndex(note) : note;
    this.chordType = quality;
  }
}
