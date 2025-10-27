import { PolarMath } from "./PolarMath";

import { ChromaticIndex } from "@/types/ChromaticIndex";
import { AccidentalType } from "@/types/enums/AccidentalType";
import { TWELVE } from "@/types/constants/NoteConstants";
import {
  CartesianPoint,
  CartesianPointPair,
} from "@/types/interfaces/CartesianPoint";

import { ACCIDENTAL_SYMBOL_STYLES } from "@/lib/design/AccidentalTypes";

export class ArcPathVisualizer {
  public static getTextPoint(
    chromaticIndex: ChromaticIndex,
    outerRadius: number,
    innerRadius: number
  ): CartesianPoint {
    const middleAngle = PolarMath.NoteIndexToMiddleAngle(chromaticIndex);
    return PolarMath.getCartesianFromPolar(
      (innerRadius + outerRadius) * 0.5,
      middleAngle
    );
  }

  public static getAccidentalPositions(
    chromaticIndex: ChromaticIndex,
    outerRadius: number,
    innerRadius: number
  ): CartesianPointPair {
    const HALF_KEY_ANGLE =
      (ACCIDENTAL_SYMBOL_STYLES.angleCoefficient * Math.PI) / TWELVE;
    const middleAngle = PolarMath.NoteIndexToMiddleAngle(chromaticIndex);
    const radius =
      innerRadius +
      (outerRadius - innerRadius) * ACCIDENTAL_SYMBOL_STYLES.radialOffset;

    return {
      sharp: PolarMath.getCartesianFromPolar(
        radius,
        middleAngle + HALF_KEY_ANGLE
      ),
      flat: PolarMath.getCartesianFromPolar(
        radius,
        middleAngle - HALF_KEY_ANGLE
      ),
    };
  }

  public static getTextPointAccidental(
    chromaticIndex: ChromaticIndex,
    outerRadius: number,
    innerRadius: number,
    accidental: AccidentalType
  ): CartesianPoint {
    const positions = this.getAccidentalPositions(
      chromaticIndex,
      outerRadius,
      innerRadius
    );
    return accidental === AccidentalType.Sharp
      ? positions.sharp
      : positions.flat;
  }

  public static getArcPathData(
    chromaticIndex: ChromaticIndex,
    outerRadius: number,
    innerRadius: number
  ): string {
    const [outerStart, outerEnd, innerEnd, innerStart] = this.getArcPoints(
      chromaticIndex,
      outerRadius,
      innerRadius
    );

    // Create SVG path: move to outer start, arc to outer end, line to inner end, arc to inner start, close path
    return [
      `M ${outerStart.x} ${outerStart.y}`, // Move to start
      `A ${outerRadius} ${outerRadius} 0 0 1 ${outerEnd.x} ${outerEnd.y}`, // Outer arc
      `L ${innerEnd.x} ${innerEnd.y}`, // Line to inner
      `A ${innerRadius} ${innerRadius} 0 0 0 ${innerStart.x} ${innerStart.y}`, // Inner arc
      "Z", // Close path
    ].join(" ");
  }

  private static getArcPoints(
    chromaticIndex: ChromaticIndex,
    outerRadius: number,
    innerRadius: number
  ): CartesianPoint[] {
    const { startAngle, endAngle } =
      PolarMath.NoteIndexToAngleRange(chromaticIndex);
    // Convert angles to cartesian coordinates
    const outerStart = PolarMath.getCartesianFromPolar(
      outerRadius,
      startAngle,
      true
    );
    const outerEnd = PolarMath.getCartesianFromPolar(
      outerRadius,
      endAngle,
      true
    );
    const innerStart = PolarMath.getCartesianFromPolar(
      innerRadius,
      startAngle,
      true
    );
    const innerEnd = PolarMath.getCartesianFromPolar(
      innerRadius,
      endAngle,
      true
    );

    return [outerStart, outerEnd, innerEnd, innerStart];
  }
}
