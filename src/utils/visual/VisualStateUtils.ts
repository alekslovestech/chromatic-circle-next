import { ChromaticIndex } from "@/types/ChromaticIndex";
import { MusicalKey } from "@/types/Keys/MusicalKey";

interface KeyColors {
  primary: string;
  text: string;
}

export class VisualStateUtils {
  static getKeyColors(
    chromaticIndex: ChromaticIndex,
    isAdvanced: boolean,
    musicalKey: MusicalKey,
    //monochromeMode: boolean,
    isBlack: boolean,
    isSelected: boolean
  ): KeyColors {
    const isDiatonic = musicalKey.greekModeInfo.isDiatonicNote(
      chromaticIndex,
      musicalKey.tonicIndex
    );
    const stateColor = isAdvanced
      ? isDiatonic
        ? "Highlighted"
        : "Muted"
      : isBlack
      ? "Black"
      : "White";

    const selectedString = isSelected ? "Selected" : "";
    return {
      primary: `bg-keys-bg${stateColor}${selectedString}`,
      text: `text-keys-textOn${stateColor}`,
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
      : isBlack
      ? "Black"
      : "White";

    const stateFill = getFillClass(isSvg, `${stateColor}`);
    const stateText = `!text-keys-textOn${stateColor}`;

    // Selection state
    const selectedFill = isSelected ? getFillClass(isSvg, "selected") : "";
    const selectedText = isSelected ? "text-selected" : "";

    /*if (chromaticIndex === 1) {
      console.log({
        chromaticIndex,
        isAdvanced,
        isDiatonic,
        monochromeMode,
        isBlack,
        isSelected,
        isSvg,
      });
      console.log({
        stateFill,
        stateText,
        selectedFill,
        selectedText,
      });
    }*/
    const commonClasses = [stateFill, selectedFill, stateText, selectedText];
    const borderClasses = isSvg
      ? ["stroke-gray-400", "stroke-1"]
      : ["border", "border-gray-400"];
    return [...commonClasses, ...borderClasses];
  }
}
