import { ScaleDegreeInfo } from "@/types/ScaleModes/ScaleDegreeInfo";

import { AccidentalFormatter } from "./AccidentalFormatter";

export class ScaleDegreeFormatter {
  static formatForDisplay(scaleDegreeInfo: ScaleDegreeInfo): string {
    return (
      AccidentalFormatter.getAccidentalSignForDisplay(
        scaleDegreeInfo.accidentalPrefix
      ) + scaleDegreeInfo.scaleDegree.toString()
    );
  }
}
