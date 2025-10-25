import React from "react";

import { useIsScalePreviewMode } from "@/lib/hooks/useGlobalMode";

import { ActualIndex, actualToChromatic } from "@/types/IndexTypes";
import { KeyDisplayMode } from "@/types/enums/KeyDisplayMode";

import { IndexUtils } from "@/utils/IndexUtils";
import { LinearKeyboardUtils } from "@/utils/Keyboard/Linear/LinearKeyboardUtils";
import { VisualStateUtils } from "@/utils/visual/VisualStateUtils";
import { KeyboardUtils } from "@/utils/Keyboard/KeyboardUtils";

import { useMusical } from "@/contexts/MusicalContext";
import { useDisplay } from "@/contexts/DisplayContext";
import { track } from "@/lib/track";
import { useGlobalMode } from "@/lib/hooks/useGlobalMode";
import { useChordPresets } from "@/contexts/ChordPresetContext";
import { addChromatic, subChromatic } from "@/types/ChromaticIndex";
import { ACCIDENTAL_SYMBOL_STYLES } from "@/lib/design/AccidentalTypes";

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

  if (isSelected) baseClasses.push("selected"); //add for testing
  if (isShortKey) baseClasses.push("short");
  if (isScales) baseClasses.push("disabled");
  if (isBassNote) baseClasses.push("root-note");

  const id = KeyboardUtils.StringWithPaddedIndex("linearKey", actualIndex);
  const noteText = isScales
    ? KeyboardUtils.computeNoteTextForScalesMode(
        chromaticIndex,
        selectedMusicalKey,
        KeyDisplayMode.NoteNames
      )
    : KeyboardUtils.computeNoteTextForDefaultMode(
        chromaticIndex,
        isSelected,
        selectedMusicalKey,
        currentChordRef
      );

  const handleClick = () => {
    track("keyboard_interacted", {
      global_mode: globalMode,
      input_mode: inputMode,
      keyboard_ui: "linear",
    });
    onClick(actualIndex); //forward to keyboardbase
  };

  const nextIsBlack = IndexUtils.isBlackKey(addChromatic(chromaticIndex, 1));
  const prevIsBlack = IndexUtils.isBlackKey(subChromatic(chromaticIndex, 1));

  const allBaseClasses = baseClasses.join(" ");
  return (
    <div
      id={id}
      className={`${allBaseClasses} ${keyColors.primary} ${keyColors.text} !${keyColors.border}`}
      style={{ left }}
      onClick={handleClick}
    >
      {isShortKey ? "" : noteText}
      {nextIsBlack && <span className={ACCIDENTAL_SYMBOL_STYLES.sharp}>♯</span>}
      {prevIsBlack && <span className={ACCIDENTAL_SYMBOL_STYLES.flat}>♭</span>}
    </div>
  );
};
