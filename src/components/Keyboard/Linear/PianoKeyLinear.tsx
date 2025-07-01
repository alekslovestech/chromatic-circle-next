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
import { useGlobal, GlobalMode } from "@/contexts/GlobalContext";

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
  const { globalMode } = useGlobal();
  const { selectedMusicalKey, selectedNoteIndices } = useMusical();
  const { monochromeMode } = useDisplay();

  const isShortKey = isBlackKey(actualIndex);
  const { chromaticIndex } = actualIndexToChromaticAndOctave(actualIndex);
  const left = LinearKeyboardUtils.getKeyPosition(actualIndex);

  const baseClasses = ["key-base", "piano-key"];
  const isSelected = selectedNoteIndices.includes(actualIndex);
  const isAdvanced = globalMode === GlobalMode.Advanced;

  //console.log(`isRootNote: ${isRootNote} should be used somewhere`);

  const keyColors = VisualStateUtils.getKeyColors(
    chromaticIndex,
    isAdvanced,
    selectedMusicalKey,
    monochromeMode,
    isRootNote,
    isShortKey,
    isSelected
  );

  if (isShortKey) baseClasses.push("short");
  if (isAdvanced) baseClasses.push("disabled");

  if (actualIndex === 1) {
    //console.log(`1: baseClasses = ${baseClasses}`);
    //console.log(`1: visualClasses = ${visualClasses}`);
    console.log(
      `1: keyColors.primary = ${keyColors.primary}, keyColors.text = ${keyColors.text}`
    );
  }
  const id = IndexUtils.StringWithPaddedIndex("linearKey", actualIndex);
  const noteText = selectedMusicalKey.getDisplayString(
    chromaticIndex,
    KeyDisplayMode.NoteNames
  );

  return (
    <div
      id={id}
      //className={[...baseClasses, ...visualClasses].join(" ")}
      className={`${baseClasses.join(" ")} ${keyColors.primary} ${
        keyColors.text
      } !${keyColors.border}`}
      style={{ left }}
      onClick={() => onClick(actualIndex)}
    >
      {noteText}
    </div>
  );
};
