import React from "react";

import {
  useIsScalePreviewMode,
  useGlobalMode,
} from "@/lib/hooks/useGlobalMode";

import { ACCIDENTAL_SYMBOL_STYLES } from "@/lib/design/AccidentalTypes";
import { track } from "@/lib/track";

import { ActualIndex, actualToChromatic } from "@/types/IndexTypes";
import { AccidentalType } from "@/types/enums/AccidentalType";

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
  const { selectedMusicalKey, selectedNoteIndices, currentChordRef } =
    useMusical();
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

  const handleClick = () => {
    track("keyboard_interacted", {
      global_mode: globalMode,
      input_mode: inputMode,
      keyboard_ui: "linear",
    });
    onClick(actualIndex); //forward to keyboardbase
  };

  const renderAccidental = (accidental: AccidentalType) => {
    const alignment = accidental === AccidentalType.Sharp ? "right" : "left";
    return (
      <span
        className={`absolute ${alignment}-[2px] top-2/3 -translate-y-1/2 
        ${ACCIDENTAL_SYMBOL_STYLES.fontSizeLinear}`}
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
      className={`${allBaseClasses} ${keyColors.primary} ${keyColors.text} !${keyColors.border}`}
      style={{ left }}
      onClick={handleClick}
    >
      {noteText}
      {nextIsBlack && renderAccidental(AccidentalType.Sharp)}
      {prevIsBlack && renderAccidental(AccidentalType.Flat)}
    </div>
  );
};
