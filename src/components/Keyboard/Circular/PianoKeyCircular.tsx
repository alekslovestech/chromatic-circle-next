"use client";
import React from "react";

import { ChromaticIndex } from "@/types/ChromaticIndex";
import { ActualIndex, chromaticToActual } from "@/types/IndexTypes";
import { AccidentalType } from "@/types/enums/AccidentalType";
import { KeyDisplayMode } from "@/types/enums/KeyDisplayMode";

import { useIsScalePreviewMode } from "@/lib/hooks/useGlobalMode";
import { track } from "@/lib/track";
import { useGlobalMode } from "@/lib/hooks/useGlobalMode";
import { ACCIDENTAL_SYMBOL_STYLES } from "@/lib/design/AccidentalTypes";

import { CartesianPoint } from "@/utils/Keyboard/Circular/PolarMath";
import { AccidentalFormatter } from "@/utils/formatters/AccidentalFormatter";
import { ArcPathVisualizer } from "@/utils/Keyboard/Circular/ArcPathVisualizer";
import { IndexUtils } from "@/utils/IndexUtils";
import { VisualStateUtils } from "@/utils/visual/VisualStateUtils";
import { KeyboardUtils } from "@/utils/Keyboard/KeyboardUtils";

import { useMusical } from "@/contexts/MusicalContext";
import { useDisplay } from "@/contexts/DisplayContext";
import { useChordPresets } from "@/contexts/ChordPresetContext";

interface CircularKeyProps {
  chromaticIndex: ChromaticIndex;
  isBassNote: boolean;
  outerRadius: number;
  innerRadius: number;
  onClick: (index: ActualIndex) => void;
}

export const PianoKeyCircular: React.FC<CircularKeyProps> = ({
  chromaticIndex,
  isBassNote,
  outerRadius,
  innerRadius,
  onClick,
}) => {
  const { selectedMusicalKey, selectedNoteIndices, currentChordRef } =
    useMusical();
  const { monochromeMode } = useDisplay();
  const globalMode = useGlobalMode();
  const { inputMode } = useChordPresets();
  const pathData = ArcPathVisualizer.getArcPathData(
    chromaticIndex,
    outerRadius,
    innerRadius
  );
  const textPoint = ArcPathVisualizer.getTextPoint(
    chromaticIndex,
    outerRadius,
    innerRadius
  );

  const baseClasses = ["key-base", "pie-slice-key"];
  const isSelected = KeyboardUtils.isSelectedEitherOctave(
    chromaticIndex,
    selectedNoteIndices
  );
  const isScales = useIsScalePreviewMode();
  const isBlack = IndexUtils.isBlackKey(chromaticIndex);
  const { nextIsBlack, prevIsBlack } =
    KeyboardUtils.getAccidentalState(chromaticIndex);

  // Add color classes based on visual state and selection
  const keyColors = VisualStateUtils.getKeyColors(
    chromaticIndex,
    isScales,
    selectedMusicalKey,
    monochromeMode,
    false,
    isBlack,
    isSelected,
    true
  );

  const allBaseClasses = KeyboardUtils.buildKeyClasses(
    baseClasses,
    isSelected,
    isBlack,
    isScales,
    isBassNote
  );

  const id = KeyboardUtils.StringWithPaddedIndex("circularKey", chromaticIndex);
  const noteText = KeyboardUtils.getNoteText(
    false,
    chromaticIndex,
    isScales,
    isBlack,
    isSelected,
    selectedMusicalKey,
    currentChordRef
  );

  const handleClick = () => {
    track("keyboard_interacted", {
      global_mode: globalMode,
      input_mode: inputMode,
      keyboard_ui: "circular",
    });
    onClick(chromaticToActual(chromaticIndex)); //forward to keyboardbase
  };

  const renderAccidental = (
    accidental: AccidentalType,
    textPoint: CartesianPoint
  ) => {
    return (
      <text
        x={textPoint.x}
        y={textPoint.y}
        style={{
          fontSize: ACCIDENTAL_SYMBOL_STYLES.fontSizeCircular,
        }}
        className={`text-center pointer-events-none`}
      >
        {AccidentalFormatter.getAccidentalSignForDisplay(accidental)}
      </text>
    );
  };

  const { sharp: textPointSharp, flat: textPointFlat } =
    ArcPathVisualizer.getAccidentalPositions(
      chromaticIndex,
      outerRadius,
      innerRadius
    );

  return (
    <g
      id={id}
      className={`${allBaseClasses}  !${keyColors.border}`}
      onClick={handleClick}
    >
      <path
        d={pathData}
        className={`${keyColors.primary} stroke-gray-400 stroke-1`}
      />
      <text
        x={textPoint.x}
        y={textPoint.y}
        className={`text-center pointer-events-none ${keyColors.text} `}
      >
        {noteText}
      </text>
      {!isScales && (
        <>
          {prevIsBlack && renderAccidental(AccidentalType.Flat, textPointFlat)}
          {nextIsBlack &&
            renderAccidental(AccidentalType.Sharp, textPointSharp)}
        </>
      )}
    </g>
  );
};
