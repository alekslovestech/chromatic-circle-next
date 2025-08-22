import { ScaleDegreeInfo } from "@/types/ScaleModes/ScaleDegreeInfo";

import {
  ixScaleDegree,
  ScaleDegreeIndex,
} from "@/types/ScaleModes/ScaleDegreeType";
import { AccidentalType } from "@/types/enums/AccidentalType";
import { AccidentalFormatter } from "./AccidentalFormatter";

export class ScaleDegreeFormatter {
  static formatForDisplay(scaleDegreeInfo: ScaleDegreeInfo): string {
    return (
      AccidentalFormatter.getAccidentalSignForDisplay(
        scaleDegreeInfo.accidentalPrefix
      ) + scaleDegreeInfo.scaleDegree.toString()
    );
  }

  static fromScaleDegreeIndex(
    scaleDegreeIndex: ScaleDegreeIndex,
    accidental: AccidentalType = AccidentalType.None
  ): ScaleDegreeInfo {
    return new ScaleDegreeInfo(ixScaleDegree(scaleDegreeIndex + 1), accidental);
  }
}
