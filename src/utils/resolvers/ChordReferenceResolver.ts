import { ChordReference } from "@/types/interfaces/ChordReference";
import { NoteGroupingLibrary } from "@/types/NoteGroupingLibrary";
import { ChordMatch } from "@/types/interfaces/ChordMatch";
import { NoteGrouping } from "@/types/NoteGrouping";
import { ChordType } from "@/types/enums/ChordType";
import { ixOffset } from "@/types/IndexTypes";

export class ChordReferenceResolver {
  static resolveToChordMatch(reference: ChordReference): ChordMatch {
    const definition = NoteGroupingLibrary.getGroupingById(reference.id);

    if (!definition) {
      // Handle unknown chords by creating a minimal definition
      if (reference.id === ChordType.Unknown) {
        return this.createUnknownChordMatch(reference);
      }
      throw new Error(`No chord definition found for id: ${reference.id}`);
    }

    return {
      rootNote: reference.rootNote,
      definition,
      inversionIndex: reference.inversionIndex,
    };
  }

  // New method to handle unknown chords properly
  private static createUnknownChordMatch(
    reference: ChordReference
  ): ChordMatch {
    // Create a minimal NoteGrouping for unknown chords
    const unknownDefinition = new NoteGrouping(
      ChordType.Unknown,
      "(?)",
      "(?)",
      "Unknown",
      -1,
      [ixOffset(0)], // Just root note
      false,
      false
    );

    return {
      rootNote: reference.rootNote,
      definition: unknownDefinition,
      inversionIndex: reference.inversionIndex,
    };
  }

  static fromChordMatch(chordMatch: ChordMatch): ChordReference {
    return {
      rootNote: chordMatch.rootNote,
      id: chordMatch.definition.id,
      inversionIndex: chordMatch.inversionIndex,
    };
  }
}
