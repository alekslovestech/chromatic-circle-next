import React from "react";

import {
  ActualIndex,
  actualIndexToChromaticAndOctave,
} from "@/types/IndexTypes";
import { KeyDisplayMode } from "@/types/SettingModes";

import { IndexUtils } from "@/utils/IndexUtils";
import { isBlackKey } from "@/utils/Keyboard/KeyboardUtils";
import { LinearKeyboardUtils } from "@/utils/Keyboard/Linear/LinearKeyboardUtils";
import { VisualStateUtils } from "@/utils/visual/VisualStateUtils";

import { useMusical } from "@/contexts/MusicalContext";
import { useDisplay } from "@/contexts/DisplayContext";
import { useIsScalePreviewMode } from "@/lib/hooks/useGlobalMode";

interface PianoKeyProps {
  actualIndex: ActualIndex;
  isRootNote: boolean;
  onClick: (index: ActualIndex) => void;
}

export const PianoKeyLinear: React.FC<PianoKeyProps> = ({
  actualIndex,
  isRootNote,
  onClick,
}) => {
  const { selectedMusicalKey, selectedNoteIndices } = useMusical();
  const { monochromeMode } = useDisplay();

  const isShortKey = isBlackKey(actualIndex);
  const { chromaticIndex } = actualIndexToChromaticAndOctave(actualIndex);
  const left = LinearKeyboardUtils.getKeyPosition(actualIndex);

  const baseClasses = ["key-base", "piano-key"];
  const isSelected = selectedNoteIndices.includes(actualIndex);
  const isScales = useIsScalePreviewMode();

  const keyColors = VisualStateUtils.getKeyColors(
    chromaticIndex,
    isScales,
    selectedMusicalKey,
    monochromeMode,
    isRootNote,
    isShortKey,
    isSelected,
    false
  );

  if (isShortKey) baseClasses.push("short");
  if (isScales) baseClasses.push("disabled");

  const id = IndexUtils.StringWithPaddedIndex("linearKey", actualIndex);
  const noteText = selectedMusicalKey.getDisplayString(
    chromaticIndex,
    KeyDisplayMode.NoteNames
  );

  const allBaseClasses = baseClasses.join(" ");
  return (
    <div
      id={id}
      className={`${allBaseClasses} ${keyColors.primary} ${keyColors.text} !${keyColors.border}`}
      style={{ left }}
      onClick={() => onClick(actualIndex)}
    >
      {noteText}
    </div>
  );
};
