import { ChromaticIndex } from "@/types/ChromaticIndex";
import { MusicalKey } from "@/types/Keys/MusicalKey";

interface KeyColors {
  primary: string;
  text: string;
  border: string;
}

export class VisualStateUtils {
  static getKeyColors(
    chromaticIndex: ChromaticIndex,
    isAdvanced: boolean,
    musicalKey: MusicalKey,
    monochromeMode: boolean,
    isRootNote: boolean,
    isBlack: boolean,
    isSelected: boolean,
    isSvg: boolean
  ): KeyColors {
    const isDiatonic = musicalKey.greekModeInfo.isDiatonicNote(
      chromaticIndex,
      musicalKey.tonicIndex
    );
    const stateColor = isAdvanced
      ? isDiatonic
        ? "Highlighted"
        : "Muted"
      : isBlack && !monochromeMode
      ? "Black"
      : "White";

    const borderColor = isRootNote
      ? "border-keys-borderRootNote"
      : "border-keys-borderColor";

    const selectedString = isSelected ? "Selected" : "";
    const primaryPrefix = isSvg ? "fill" : "bg";
    const textPrefix = isSvg ? "fill" : "text";

    return {
      primary: `${primaryPrefix}-keys-bg${stateColor}${selectedString}`,
      text: `${textPrefix}-keys-textOn${stateColor}`,
      border: borderColor,
    };
  }

  static getKeyVisualClasses(
    chromaticIndex: ChromaticIndex,
    isAdvanced: boolean,
    musicalKey: MusicalKey,
    monochromeMode: boolean,
    isBlack: boolean,
    isSelected: boolean,
    isSvg: boolean
  ): string[] {
    // Base colors for black/white keys
    const getFillClass = (isSvg: boolean, baseClass: string): string => {
      return isSvg ? `!fill-keys-bg${baseClass}` : `!bg-keys-bg${baseClass}`;
    };

    const isDiatonic = musicalKey.greekModeInfo.isDiatonicNote(
      chromaticIndex,
      musicalKey.tonicIndex
    );

    // State-based colors
    const stateColor = isAdvanced
      ? isDiatonic
        ? "highlighted"
        : "muted"
      : isBlack && !monochromeMode
      ? "Black"
      : "White";

    const stateFill = getFillClass(isSvg, `${stateColor}`);
    const stateText = `!text-keys-textOn${stateColor}`;

    // Selection state
    const selectedFill = isSelected ? getFillClass(isSvg, "selected") : "";
    const selectedText = isSelected ? "text-selected" : "";

    const commonClasses = [stateFill, selectedFill, stateText, selectedText];
    const borderClasses = isSvg
      ? ["stroke-gray-400", "stroke-1"]
      : ["border", "border-gray-400"];
    return [...commonClasses, ...borderClasses];
  }
}
