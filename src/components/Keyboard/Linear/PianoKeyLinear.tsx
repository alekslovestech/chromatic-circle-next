import React from "react";

import { useIsScalePreviewMode } from "@/lib/hooks/useGlobalMode";

import {
  ActualIndex,
  actualIndexToChromaticAndOctave,
} from "@/types/IndexTypes";
import { KeyDisplayMode } from "@/types/SettingModes";

import { IndexUtils } from "@/utils/IndexUtils";
import { LinearKeyboardUtils } from "@/utils/Keyboard/Linear/LinearKeyboardUtils";
import { VisualStateUtils } from "@/utils/visual/VisualStateUtils";
import { KeyboardUtils } from "@/utils/Keyboard/KeyboardUtils";

import { useMusical } from "@/contexts/MusicalContext";
import { useDisplay } from "@/contexts/DisplayContext";
import {
  useChordPresets,
  useIsChordsOrIntervals,
} from "@/contexts/ChordPresetContext";

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
  const { selectedChordType } = useChordPresets();
  const isChordsOrIntervals = useIsChordsOrIntervals();

  const isShortKey = IndexUtils.isBlackKey(actualIndex);
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
        selectedNoteIndices,
        selectedMusicalKey,
        selectedChordType,
        isChordsOrIntervals
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
