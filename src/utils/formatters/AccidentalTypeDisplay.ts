import { AccidentalType } from "../../types/enums/AccidentalType";

export class AccidentalFormatter {
  //mostly used in for text on keyboards / accidental toggle
  static getAccidentalSignForDisplay(accidental: AccidentalType): string {
    switch (accidental) {
      case AccidentalType.None:
        return "";
      case AccidentalType.Natural:
        return "♮";
      case AccidentalType.Sharp:
        return "♯";
      case AccidentalType.Flat:
        return "♭";
      default:
        return "";
    }
  }

  static getAccidentalSignForDebug(accidental: AccidentalType): string {
    switch (accidental) {
      case AccidentalType.None:
        return "";
      case AccidentalType.Natural:
        return "♮";
      case AccidentalType.Sharp:
        return "#";
      case AccidentalType.Flat:
        return "b";
      default:
        return "";
    }
  }

  //mostly used in StaffRenderer / EasyScore format
  static getAccidentalSignForEasyScore = (
    accidental: AccidentalType
  ): string => {
    switch (accidental) {
      case AccidentalType.None:
        return "";
      case AccidentalType.Natural:
        return "n";
      case AccidentalType.Sharp:
        return "#";
      case AccidentalType.Flat:
        return "b";
      default:
        return "";
    }
  };
}

export const getOppositeAccidental = (
  prevAccidental: AccidentalType
): AccidentalType => {
  if (prevAccidental === AccidentalType.Sharp) return AccidentalType.Flat;
  if (prevAccidental === AccidentalType.Flat) return AccidentalType.Sharp;
  return prevAccidental; //no change
};
