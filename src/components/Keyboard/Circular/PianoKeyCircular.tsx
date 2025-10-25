"use client";
import React from "react";

import { KeyDisplayMode } from "@/types/enums/KeyDisplayMode";

import {
  addChromatic,
  ChromaticIndex,
  subChromatic,
} from "@/types/ChromaticIndex";
import { ActualIndex, chromaticToActual } from "@/types/IndexTypes";

import { useIsScalePreviewMode } from "@/lib/hooks/useGlobalMode";

import { ArcPathVisualizer } from "@/utils/Keyboard/Circular/ArcPathVisualizer";
import { IndexUtils } from "@/utils/IndexUtils";
import { VisualStateUtils } from "@/utils/visual/VisualStateUtils";
import { KeyboardUtils } from "@/utils/Keyboard/KeyboardUtils";

import { useMusical } from "@/contexts/MusicalContext";
import { useDisplay } from "@/contexts/DisplayContext";
import { track } from "@/lib/track";
import { useGlobalMode } from "@/lib/hooks/useGlobalMode";
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

  const { sharp: textPointSharp, flat: textPointFlat } =
    ArcPathVisualizer.getAccidentalPositions(
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
  const nextIsBlack = IndexUtils.isBlackKey(addChromatic(chromaticIndex, 1));
  const prevIsBlack = IndexUtils.isBlackKey(subChromatic(chromaticIndex, 1));

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
  if (isBlack) baseClasses.push("short");
  if (isBassNote) baseClasses.push("root-note");

  const id = KeyboardUtils.StringWithPaddedIndex("circularKey", chromaticIndex);
  const noteText = isScales
    ? KeyboardUtils.computeNoteTextForScalesMode(
        chromaticIndex,
        selectedMusicalKey,
        KeyDisplayMode.ScaleDegree
      )
    : isBlack
    ? ""
    : KeyboardUtils.computeNoteTextForDefaultMode(
        chromaticIndex,
        isSelected,
        selectedMusicalKey,
        currentChordRef!
      );

  const handleClick = () => {
    track("keyboard_interacted", {
      global_mode: globalMode,
      input_mode: inputMode,
      keyboard_ui: "circular",
    });
    onClick(chromaticToActual(chromaticIndex)); //forward to keyboardbase
  };

  return (
    <g
      id={id}
      className={`${baseClasses.join(" ")}  !${keyColors.border}`}
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
      {prevIsBlack && (
        <text
          x={textPointFlat.x}
          y={textPointFlat.y}
          style={{ fontSize: "8px" }}
          className={`text-center pointer-events-none`}
        >
          ♭
        </text>
      )}
      {nextIsBlack && (
        <text
          x={textPointSharp.x}
          y={textPointSharp.y}
          style={{ fontSize: "8px" }}
          className={`text-center pointer-events-none`}
        >
          ♯
        </text>
      )}
    </g>
  );
};
