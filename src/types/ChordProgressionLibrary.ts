import { ChordProgression } from "@/types/ChordProgression";
import { ChordProgressionType } from "@/types/enums/ChordProgressionType";

class ChordProgressionLibrarySingleton {
  private static instance: ChordProgressionLibrarySingleton;

  private constructor() {}

  public static getInstance(): ChordProgressionLibrarySingleton {
    if (!ChordProgressionLibrarySingleton.instance) {
      ChordProgressionLibrarySingleton.instance =
        new ChordProgressionLibrarySingleton();
    }
    return ChordProgressionLibrarySingleton.instance;
  }

  public getProgression(type: ChordProgressionType): ChordProgression {
    switch (type) {
      case ChordProgressionType.Perfect_Cadence:
        return new ChordProgression(["V", "I"], "Perfect (Authentic) Cadence");

      case ChordProgressionType.Plagal_Cadence:
        return new ChordProgression(["IV", "I"], "Plagal Cadence");

      case ChordProgressionType.LetItBe:
        return new ChordProgression(["I", "V", "vi", "IV"], "Let It Be");

      case ChordProgressionType.WithOrWithoutYou:
        return new ChordProgression(["I", "♭VII", "IV"], "With or Without You");

      case ChordProgressionType.Something:
        return new ChordProgression(
          ["I", "Imaj7", "I7", "IV", "iv", "I"],
          "Something"
        );

      default:
        throw new Error(`Unknown chord progression type: ${type}`);
    }
  }
}

export const ChordProgressionLibrary =
  ChordProgressionLibrarySingleton.getInstance();
