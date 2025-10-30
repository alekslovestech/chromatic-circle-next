import React from "react";

import {
  useIsScalePreviewMode,
  useGlobalMode,
} from "@/lib/hooks/useGlobalMode";

import { ACCIDENTAL_SYMBOL_STYLES } from "@/lib/design/AccidentalTypes";
import { TYPOGRAPHY } from "@/lib/design/Typography";

import { ActualIndex, actualToChromatic } from "@/types/IndexTypes";
import { AccidentalType } from "@/types/enums/AccidentalType";
import { KeyboardUIType } from "@/types/enums/KeyboardUIType";

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

  const baseClasses = ["key-base", "piano-key"];
  const isSelected = selectedNoteIndices.includes(actualIndex);
  const isScales = useIsScalePreviewMode();

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

  const renderAccidental = (accidental: AccidentalType) => {
    const isSharp = accidental === AccidentalType.Sharp;
    return (
      <span
        className={`absolute ${
          isSharp ? "right-0.5" : "left-0.5"
        } top-2/3 -translate-y-1/2 ${TYPOGRAPHY.linearAccidental}`}
      >
        {AccidentalFormatter.getAccidentalSignForDisplay(accidental)}
      </span>
    );
  };

  const { nextIsBlack, prevIsBlack } =
    KeyboardUtils.getAccidentalState(chromaticIndex);

  return (
    <div
      id={id}
      className={`${allBaseClasses} ${keyColors.primary} ${keyColors.text} !${
        keyColors.border
      } flex ${isShortKey ? "" : "items-end"}`}
      style={{ left }}
      onClick={handleClick}
    >
      {!isShortKey && (
        <div
          className={`${TYPOGRAPHY.linearNoteText} text-center w-full leading-none mb-0.5`}
        >
          {noteText}
        </div>
      )}
      {prevIsBlack && renderAccidental(AccidentalType.Flat)}
      {nextIsBlack && renderAccidental(AccidentalType.Sharp)}
    </div>
  );
};
