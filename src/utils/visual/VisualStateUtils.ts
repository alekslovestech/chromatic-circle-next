import { ChromaticIndex } from "@/types/ChromaticIndex";
import { MusicalKey } from "@/types/Keys/MusicalKey";

interface PureColors {
  background: string; // "keys-bgWhite"
  text: string; // "keys-textOnWhite"
  border: string; // "keys-borderColor"
}

interface KeyColors {
  primary: string; // "fill-keys-bgWhite" or "bg-keys-bgWhite"
  text: string; // "fill-keys-textOnWhite" or "text-keys-textOnWhite"
  border: string; // "border-keys-borderColor"
}

export class VisualStateUtils {
  // Step 1: Pure business logic (8 parameters → semantic colors)
  static getPureColors(
    chromaticIndex: ChromaticIndex,
    isAdvanced: boolean,
    musicalKey: MusicalKey,
    monochromeMode: boolean,
    isRootNote: boolean,
    isBlack: boolean,
    isSelected: boolean
  ): PureColors {
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

    const selectedString = isSelected ? "Selected" : "";

    return {
      background: `keys-bg${stateColor}${selectedString}`,
      text: `keys-textOn${stateColor}`,
      border: isRootNote ? "keys-borderRootNote" : "keys-borderColor",
    };
  }

  // Step 2: Rendering transformation (pure colors + isSvg → CSS classes)
  static computeColors(pureColors: PureColors, isSvg: boolean): KeyColors {
    const primaryPrefix = isSvg ? "fill" : "bg";
    const textPrefix = isSvg ? "fill" : "text";

    return {
      primary: `${primaryPrefix}-${pureColors.background}`,
      text: `${textPrefix}-${pureColors.text}`,
      border: `border-${pureColors.border}`,
    };
  }

  // Convenience method: Maintains existing API
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
    const pureColors = this.getPureColors(
      chromaticIndex,
      isAdvanced,
      musicalKey,
      monochromeMode,
      isRootNote,
      isBlack,
      isSelected
    );
    return this.computeColors(pureColors, isSvg);
  }
}
