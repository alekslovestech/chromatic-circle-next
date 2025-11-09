import { MusicalKey } from "@/types/Keys/MusicalKey";
import { AbsoluteChord } from "@/types/AbsoluteChord";
import { RomanResolver } from "@/utils/resolvers/RomanResolver";

// Represents a chord progression
export class ChordProgression {
  progression: string[]; // Sequence of Roman numerals
  name: string; // Name of the chord progression (can also remain unnamed)

  get length(): number {
    return this.progression.length;
  }

  constructor(progression: string[], name: string | undefined) {
    this.progression = progression;
    this.name = name || "Unknown"; // Initialize the name of the progression
  }

  getChordAtIndex(index: number, musicalKey: MusicalKey): AbsoluteChord {
    return this.resolvedChords(musicalKey)[index];
  }

  // Derive concrete chords from the Roman numerals
  resolvedChords(musicalKey: MusicalKey): AbsoluteChord[] {
    const resolvedChords = this.progression.map((roman) => {
      const absoluteChord = RomanResolver.resolveAsAbsoluteChord(
        roman,
        musicalKey
      );
      return absoluteChord;
    });
    return resolvedChords;
  }
}
