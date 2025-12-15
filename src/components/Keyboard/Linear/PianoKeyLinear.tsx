import React from "react";

import {
  useIsScalePreviewMode,
  useGlobalMode,
} from "@/lib/hooks/useGlobalMode";

import { TYPOGRAPHY } from "@/lib/design/Typography";

import { ActualIndex, actualToChromatic } from "@/types/IndexTypes";
import { AccidentalType } from "@/types/enums/AccidentalType";
import { addChromatic, subChromatic } from "@/types/ChromaticIndex";
import { KeyboardUIType } from "@/types/enums/KeyboardUIType";
import {
  BLACK_KEY_WIDTH_RATIO,
  WHITE_KEYS_PER_2OCTAVES,
} from "@/types/constants/NoteConstants";

import { IndexUtils } from "@/utils/IndexUtils";
import { LinearKeyboardUtils } from "@/utils/Keyboard/Linear/LinearKeyboardUtils";
import { VisualStateUtils } from "@/utils/visual/VisualStateUtils";
import { KeyboardUtils } from "@/utils/Keyboard/KeyboardUtils";
import { AccidentalFormatter } from "@/utils/formatters/AccidentalFormatter";

import { useMusical } from "@/contexts/MusicalContext";
import { useDisplay } from "@/contexts/DisplayContext";
import { useChordPresets } from "@/contexts/ChordPresetContext";

interface PianoKeyProps {
  actualIndex: ActualIndex;
  isBassNote: boolean;
  onClick: (index: ActualIndex) => void;
}

export const PianoKeyLinear: React.FC<PianoKeyProps> = ({
  actualIndex,
  isBassNote,
  onClick,
}) => {
  const { selectedMusicalKey, selectedNoteIndices } = useMusical();
  const { monochromeMode } = useDisplay();
  const globalMode = useGlobalMode();
  const { inputMode } = useChordPresets();

  const isShortKey = IndexUtils.isBlackKey(actualIndex);
  const chromaticIndex = actualToChromatic(actualIndex);
  const left = LinearKeyboardUtils.getKeyPosition(actualIndex);

  const baseClasses = ["key-base"];
  const isSelected = selectedNoteIndices.includes(actualIndex);
  const isScales = useIsScalePreviewMode();

  const { nextIsBlack, prevIsBlack } =
    KeyboardUtils.getAccidentalState(chromaticIndex);

  // Check if adjacent black notes are selected (for highlighting accidentals)
  const prevChromaticIndex = subChromatic(chromaticIndex, 1);
  const nextChromaticIndex = addChromatic(chromaticIndex, 1);
  const prevBlackIsSelected =
    !isShortKey &&
    prevIsBlack &&
    selectedNoteIndices.some((idx) => {
      const idxChromatic = actualToChromatic(idx);
      return idxChromatic === prevChromaticIndex;
    });
  const nextBlackIsSelected =
    !isShortKey &&
    nextIsBlack &&
    selectedNoteIndices.some((idx) => {
      const idxChromatic = actualToChromatic(idx);
      return idxChromatic === nextChromaticIndex;
    });

  const widthRatio = isShortKey ? BLACK_KEY_WIDTH_RATIO : 1;
  const keyWidthAsPercent = `${(
    (widthRatio * 100) /
    WHITE_KEYS_PER_2OCTAVES
  ).toFixed(2)}%`;

  const keyColors = VisualStateUtils.getKeyColors(
    chromaticIndex,
    isScales,
    selectedMusicalKey,
    monochromeMode,
    isBassNote,
    isShortKey,
    isSelected,
    false
  );

  const allBaseClasses = KeyboardUtils.buildKeyClasses(
    baseClasses,
    isSelected,
    isShortKey,
    isScales,
    isBassNote
  );

  // Determine if white key text should be highlighted (when the white key itself is selected)
  const textColorClass =
    !isShortKey && isSelected
      ? VisualStateUtils.getHighlightedTextColorClass("text")
      : keyColors.text;

  const id = KeyboardUtils.StringWithPaddedIndex("linearKey", actualIndex);
  const noteText = KeyboardUtils.getNoteText(
    true,
    chromaticIndex,
    isScales,
    selectedMusicalKey
  );

  const handleClick = KeyboardUtils.createKeyboardClickHandler(
    globalMode,
    inputMode,
    KeyboardUIType.Linear,
    onClick,
    actualIndex
  );

  const renderAccidental = (
    accidental: AccidentalType,
    isHighlighted: boolean = false
  ) => {
    const isSharp = accidental === AccidentalType.Sharp;
    const colorClass = VisualStateUtils.getAccidentalColorClass(
      isHighlighted,
      "text"
    );
    return (
      <span
        className={`absolute ${
          isSharp ? "right-0.5" : "left-0.5"
        } top-2/3 -translate-y-1/2 ${
          TYPOGRAPHY.linearAccidental
        } ${colorClass}`}
      >
        {AccidentalFormatter.getAccidentalSignForDisplay(accidental)}
      </span>
    );
  };

  return (
    <div
      id={id}
      className={`${allBaseClasses} ${keyColors.primary} !${
        keyColors.border
      } absolute box-border flex ${
        isShortKey ? "h-[60%] -translate-x-1/2 z-[2]" : "h-full z-[1]"
      } ${isShortKey ? "" : "items-end"} shadow-linear-key`}
      style={{ left, width: keyWidthAsPercent }}
      onClick={handleClick}
    >
      {!isShortKey && (
        <div
          className={`${TYPOGRAPHY.linearNoteText} text-center w-full leading-none mb-0.5 ${textColorClass}`}
        >
          {noteText}
        </div>
      )}
      {prevIsBlack &&
        renderAccidental(AccidentalType.Flat, prevBlackIsSelected)}
      {nextIsBlack &&
        renderAccidental(AccidentalType.Sharp, nextBlackIsSelected)}
    </div>
  );
};
