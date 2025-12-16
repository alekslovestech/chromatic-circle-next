import { TWELVE } from "@/types/constants/NoteConstants";
import {
  addChromatic,
  ChromaticIndex,
  subChromatic,
} from "@/types/ChromaticIndex";

export class BlackKeyUtils {
  static isBlackKey(chromaticIndex: ChromaticIndex): boolean {
    return [1, 3, 6, 8, 10].includes(chromaticIndex % TWELVE);
  }

  static getAdjacentChromaticIndices(chromaticIndex: ChromaticIndex): {
    prev: ChromaticIndex;
    next: ChromaticIndex;
    prevIsBlack: boolean;
    nextIsBlack: boolean;
  } {
    const prev = subChromatic(chromaticIndex, 1);
    const next = addChromatic(chromaticIndex, 1);
    return {
      prev,
      next,
      prevIsBlack: this.isBlackKey(prev),
      nextIsBlack: this.isBlackKey(next),
    };
  }

  // Returns true if the next or previous chromatic index is a black key
  static getAccidentalState(chromaticIndex: ChromaticIndex) {
    const { prevIsBlack, nextIsBlack } =
      this.getAdjacentChromaticIndices(chromaticIndex);
    return { prevIsBlack, nextIsBlack };
  }
}

