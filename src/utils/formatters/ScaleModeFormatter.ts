import { KeyDisplayMode } from "@/types/SettingModes";
import { ScaleModeInfo } from "@/types/ScaleModes/ScaleModeInfo";
import { ixScaleDegreeIndex } from "@/types/ScaleModes/ScaleDegreeType";
import { ScaleDegreeInfo } from "@/types/ScaleModes/ScaleDegreeInfo";
import { ScaleDegreeFormatter } from "./ScaleDegreeFormatter";
import { RomanChord } from "@/types/RomanChord";

export class ScaleModeFormatter {
  static getDisplayStrings(
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
        return this.getDisplayString(
          scaleModeInfo,
          scaleDegreeInfo,
          keyTextMode
        );
      }
    );
  }

  static getDisplayString(
    scaleModeInfo: ScaleModeInfo,
    scaleDegreeInfo: ScaleDegreeInfo,
    keyTextMode: KeyDisplayMode
  ): string {
    if (keyTextMode === KeyDisplayMode.ScaleDegree) {
      return ScaleDegreeFormatter.formatForDisplay(scaleDegreeInfo);
    }
    if (keyTextMode === KeyDisplayMode.Roman) {
      const romanChord = RomanChord.fromScaleDegreeInfo(
        scaleDegreeInfo,
        scaleModeInfo
      );
      return romanChord.getString();
    }
    throw new Error("Unexpected key text mode");
  }
}
