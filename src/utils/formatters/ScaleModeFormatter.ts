import { KeyDisplayMode } from "@/types/SettingModes";
import { ScaleModeInfo } from "@/types/ScaleModes/ScaleModeInfo";
import { ixScaleDegreeIndex } from "@/types/ScaleModes/ScaleDegreeType";
import { ScaleDegreeInfo } from "@/types/ScaleModes/ScaleDegreeInfo";
import { ScaleDegreeFormatter } from "./ScaleDegreeFormatter";
import { RomanFormatter } from "./RomanFormatter";

export class ScaleModeFormatter {
  static formatAllScaleDegreesForDisplay(
    scaleModeInfo: ScaleModeInfo,
    keyTextMode: KeyDisplayMode
  ): string[] {
    return Array.from(
      { length: scaleModeInfo.scalePattern.getLength() },
      (_, i) => {
        const scaleDegreeInfo =
          scaleModeInfo.scalePattern.getScaleDegreeInfoFromPosition(
            ixScaleDegreeIndex(i)
          );
        return this.formatScaleDegreeForDisplay(
          scaleModeInfo,
          scaleDegreeInfo,
          keyTextMode
        );
      }
    );
  }

  static formatScaleDegreeForDisplay(
    scaleModeInfo: ScaleModeInfo,
    scaleDegreeInfo: ScaleDegreeInfo,
    keyTextMode: KeyDisplayMode
  ): string {
    if (keyTextMode === KeyDisplayMode.ScaleDegree) {
      return ScaleDegreeFormatter.formatForDisplay(scaleDegreeInfo);
    }
    if (keyTextMode === KeyDisplayMode.Roman) {
      const romanChord = RomanFormatter.fromScaleDegreeInfo(
        scaleDegreeInfo,
        scaleModeInfo
      );
      return RomanFormatter.getString(romanChord);
    }
    throw new Error("Unexpected key text mode");
  }
}
