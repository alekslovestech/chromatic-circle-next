import React from "react";

import {
  ActualIndex,
  actualIndexToChromaticAndOctave,
} from "@/types/IndexTypes";
import { KeyDisplayMode } from "@/types/SettingModes";
import { useGlobalMode, GlobalMode } from "@/lib/hooks";

import { IndexUtils } from "@/utils/IndexUtils";
import { isBlackKey } from "@/utils/Keyboard/KeyboardUtils";
import { LinearKeyboardUtils } from "@/utils/Keyboard/Linear/LinearKeyboardUtils";
import { VisualStateUtils } from "@/utils/visual/VisualStateUtils";

import { useMusical } from "@/contexts/MusicalContext";
import { useDisplay } from "@/contexts/DisplayContext";
import { TYPOGRAPHY } from "@/lib/design/Typography";

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
  const globalMode = useGlobalMode();
  const { selectedMusicalKey, selectedNoteIndices } = useMusical();
  const { monochromeMode } = useDisplay();

  const isShortKey = isBlackKey(actualIndex);
  const { chromaticIndex } = actualIndexToChromaticAndOctave(actualIndex);
  const left = LinearKeyboardUtils.getKeyPosition(actualIndex);

  const baseClasses = ["key-base", "piano-key"];
  const isSelected = selectedNoteIndices.includes(actualIndex);
  const isAdvanced = globalMode === GlobalMode.Advanced;

  const keyColors = VisualStateUtils.getKeyColors(
    chromaticIndex,
    isAdvanced,
    selectedMusicalKey,
    monochromeMode,
    isRootNote,
    isShortKey,
    isSelected,
    false
  );

  if (isShortKey) baseClasses.push("short");
  if (isAdvanced) baseClasses.push("disabled");

  const id = IndexUtils.StringWithPaddedIndex("linearKey", actualIndex);
  const noteText = selectedMusicalKey.getDisplayString(
    chromaticIndex,
    KeyDisplayMode.NoteNames
  );

  return (
    <div
      id={id}
      className={`${baseClasses.join(" ")} ${keyColors.primary} ${
        keyColors.text
      } !${keyColors.border} ${TYPOGRAPHY.keyboardText} ${
        isShortKey ? "!font-normal" : ""
      }`}
      style={{ left }}
      onClick={() => onClick(actualIndex)}
    >
      {noteText}
    </div>
  );
};
