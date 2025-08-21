"use client";
import React from "react";

import { ChromaticIndex } from "@/types/ChromaticIndex";
import { ActualIndex, chromaticToActual } from "@/types/IndexTypes";

import { useIsScalePreviewMode } from "@/lib/hooks/useGlobalMode";

import { ArcPathVisualizer } from "@/utils/Keyboard/Circular/ArcPathVisualizer";
import { IndexUtils } from "@/utils/IndexUtils";
import { VisualStateUtils } from "@/utils/visual/VisualStateUtils";
import { KeyboardUtils } from "@/utils/Keyboard/KeyboardUtils";

import {
  useChordPresets,
  useIsChordsOrIntervals,
} from "@/contexts/ChordPresetContext";
import { useMusical } from "@/contexts/MusicalContext";
import { useDisplay } from "@/contexts/DisplayContext";

interface CircularKeyProps {
  chromaticIndex: ChromaticIndex;
  outerRadius: number;
  innerRadius: number;
  onClick: (index: ActualIndex) => void;
}

export const PianoKeyCircular: React.FC<CircularKeyProps> = ({
  chromaticIndex,
  outerRadius,
  innerRadius,
  onClick,
}) => {
  const { selectedMusicalKey, selectedNoteIndices } = useMusical();
  const { keyTextMode, monochromeMode } = useDisplay();
  const { selectedChordType } = useChordPresets();
  const isChordsOrIntervals = useIsChordsOrIntervals();
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

  if (isScales) baseClasses.push("disabled");

  const id = KeyboardUtils.StringWithPaddedIndex("circularKey", chromaticIndex);

  let noteText = selectedMusicalKey.getDisplayString(
    chromaticIndex,
    keyTextMode
  );
  if (isBlack) {
    noteText = KeyboardUtils.computeNoteText(
      chromaticIndex,
      isSelected,
      selectedNoteIndices,
      selectedMusicalKey,
      selectedChordType,
      isChordsOrIntervals
    );
  }

  return (
    <g
      id={id}
      className={`${baseClasses.join(" ")}  !${keyColors.border}`}
      onClick={() => {
        onClick(chromaticToActual(chromaticIndex));
      }}
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
    </g>
  );
};
