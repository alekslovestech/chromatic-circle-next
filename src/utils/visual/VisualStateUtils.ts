import { ChromaticIndex } from "@/types/ChromaticIndex";
import { MusicalKey } from "@/types/Keys/MusicalKey";

interface KeyColors {
  primary: string; // "fill-keys-bgWhite" or "bg-keys-bgWhite"
  text: string; // "fill-keys-textOnWhite" or "text-keys-textOnWhite"
  border: string; // "border-keys-borderColor"
}

export class VisualStateUtils {
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
    // Determine state color based on context
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

    // Build CSS classes
    const primaryPrefix = isSvg ? "fill" : "bg";
    const textPrefix = this.getTextPrefix(isSvg);

    const primary = `${primaryPrefix}-keys-bg${stateColor}${selectedString}`;
    const border = `border-${
      isRootNote ? "keys-borderRootNote" : "keys-borderColor"
    }`;

    // Determine text color (with highlight override for selected white keys)
    const baseTextColor = `${textPrefix}-keys-textOn${stateColor}`;
    const text =
      !isBlack && isSelected
        ? this.getHighlightedTextColorClass(isSvg)
        : baseTextColor;

    return { primary, text, border };
  }

  // Get accidental color class
  static getAccidentalColorClass(
    isHighlighted: boolean,
    isSvg: boolean
  ): string {
    const prefix = this.getTextPrefix(isSvg);
    return isHighlighted
      ? `${prefix}-accidental-highlight`
      : `${prefix}-accidental-symbolFaded`;
  }

  // Get text color class for white keys when selected
  private static getHighlightedTextColorClass(isSvg: boolean): string {
    const prefix = this.getTextPrefix(isSvg);
    return `${prefix}-accidental-highlightOnSelected`;
  }

  private static getTextPrefix(isSvg: boolean): string {
    return isSvg ? "fill" : "text";
  }
}
