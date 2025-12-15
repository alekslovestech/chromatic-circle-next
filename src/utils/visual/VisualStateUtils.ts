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
    isScales: boolean,
    musicalKey: MusicalKey,
    monochromeMode: boolean,
    isRootNote: boolean,
    isBlack: boolean,
    isSelected: boolean
  ): PureColors {
    const isDiatonic = musicalKey.scaleModeInfo.isDiatonicNote(
      chromaticIndex,
      musicalKey.tonicIndex
    );

    const stateColor = isScales
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
    isScales: boolean,
    musicalKey: MusicalKey,
    monochromeMode: boolean,
    isRootNote: boolean,
    isBlack: boolean,
    isSelected: boolean,
    isSvg: boolean
  ): KeyColors {
    const pureColors = this.getPureColors(
      chromaticIndex,
      isScales,
      musicalKey,
      monochromeMode,
      isRootNote,
      isBlack,
      isSelected
    );
    const baseColors = this.computeColors(pureColors, isSvg);

    // Override text color if white key is selected (highlighted)
    const textColor =
      !isBlack && isSelected
        ? this.getHighlightedTextColorClass(isSvg ? "fill" : "text")
        : baseColors.text;

    return {
      ...baseColors,
      text: textColor,
    };
  }

  // Get text color class for white keys when selected
  static getHighlightedTextColorClass(prefix: "fill" | "text"): string {
    return `${prefix}-accidental-highlightOnSelected`;
  }

  // Get accidental color class
  static getAccidentalColorClass(
    isHighlighted: boolean,
    prefix: "fill" | "text"
  ): string {
    return isHighlighted
      ? `${prefix}-accidental-highlight`
      : `${prefix}-accidental-symbolFaded`;
  }
}
