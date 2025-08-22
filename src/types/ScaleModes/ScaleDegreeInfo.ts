import { AccidentalType } from "@/types/enums/AccidentalType";

import {
  ScaleDegree,
  ScaleDegreeIndex,
  ixScaleDegreeIndex,
} from "./ScaleDegreeType";
export class ScaleDegreeInfo {
  private readonly _scaleDegree: ScaleDegree;
  public readonly accidentalPrefix: AccidentalType;

  public constructor(
    scaleDegree: ScaleDegree,
    accidental: AccidentalType = AccidentalType.None
  ) {
    this._scaleDegree = scaleDegree;
    this.accidentalPrefix = accidental;
  }

  get scaleDegree(): ScaleDegree {
    return this._scaleDegree;
  }

  get scaleDegreeIndex(): ScaleDegreeIndex {
    return ixScaleDegreeIndex(this._scaleDegree - 1);
  }
}
