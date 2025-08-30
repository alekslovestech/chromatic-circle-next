"use client";
import React from "react";

import { KeyDisplayMode } from "@/types/enums/KeyDisplayMode";

import { ChromaticIndex } from "@/types/ChromaticIndex";
import { ActualIndex, chromaticToActual } from "@/types/IndexTypes";

import { useIsScalePreviewMode } from "@/lib/hooks/useGlobalMode";

import { ArcPathVisualizer } from "@/utils/Keyboard/Circular/ArcPathVisualizer";
import { IndexUtils } from "@/utils/IndexUtils";
import { VisualStateUtils } from "@/utils/visual/VisualStateUtils";
import { KeyboardUtils } from "@/utils/Keyboard/KeyboardUtils";

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
  const { selectedMusicalKey, selectedNoteIndices, currentChordRef } =
    useMusical();
  const { monochromeMode } = useDisplay();
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

  if (isSelected) baseClasses.push("selected"); //add for testing
  if (isScales) baseClasses.push("disabled");

  const id = KeyboardUtils.StringWithPaddedIndex("circularKey", chromaticIndex);
  const noteText = isScales
    ? KeyboardUtils.computeNoteTextForScalesMode(
        chromaticIndex,
        selectedMusicalKey,
        KeyDisplayMode.ScaleDegree
      )
    : KeyboardUtils.computeNoteTextForDefaultMode(
        chromaticIndex,
        isSelected,
        selectedNoteIndices,
        selectedMusicalKey,
        currentChordRef!
      );

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
