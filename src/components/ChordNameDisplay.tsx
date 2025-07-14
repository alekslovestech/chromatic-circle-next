"use client";
import React from "react";
import { ChordDisplayMode } from "@/types/SettingModes";

import { useMusical } from "@/contexts/MusicalContext";
import { useDisplay } from "@/contexts/DisplayContext";

import { ChordUtils } from "@/utils/ChordUtils";
import { DEBUG_BORDER, TYPOGRAPHY } from "@/lib/design";
import { LAYOUT_PATTERNS } from "@/lib/design/LayoutPatterns";

const MAX_CHORD_NAME_LENGTH = 7;
const BREAK_CHARACTER = "\u200B";
export const ChordNameDisplay: React.FC = () => {
  const { selectedNoteIndices, selectedMusicalKey } = useMusical();
  const { chordDisplayMode, setChordDisplayMode } = useDisplay();

  const getOppositeDisplayMode = (
    prevDisplayMode: ChordDisplayMode
  ): ChordDisplayMode => {
    if (prevDisplayMode === ChordDisplayMode.Letters_Short)
      return ChordDisplayMode.Symbols;
    if (prevDisplayMode === ChordDisplayMode.Symbols)
      return ChordDisplayMode.Letters_Short;
    return prevDisplayMode; //no change
  };

  function toggleChordDisplayMode(): void {
    setChordDisplayMode(getOppositeDisplayMode(chordDisplayMode));
  }

  const renderNoteGrouping = () => {
    const { noteGroupingString, chordName } =
      ChordUtils.getDisplayInfoFromIndices(
        selectedNoteIndices,
        chordDisplayMode,
        selectedMusicalKey
      );

    const chordNameDisplay =
      chordName.length > MAX_CHORD_NAME_LENGTH && chordName.includes("/")
        ? chordName.replace("/", `${BREAK_CHARACTER}/`)
        : chordName;
    return (
      <div
        className={`chord-name-description ${LAYOUT_PATTERNS.centerFlexCol} ${LAYOUT_PATTERNS.fullSize}`}
      >
        <div className={`${TYPOGRAPHY.controlLabel} mb-tight`}>
          {`${noteGroupingString}:`}
        </div>
        <div
          className={`chord-name-value ${TYPOGRAPHY.displayText} mb-normal max-w-full text-center break-words`}
        >
          {chordNameDisplay}
        </div>
      </div>
    );
  };

  return (
    <div
      className={`chord-display ${LAYOUT_PATTERNS.fullSize} ${DEBUG_BORDER}`}
    >
      <div
        onClick={toggleChordDisplayMode}
        className="cursor-pointer hover:text-buttons-textSelected transition-colors duration-200"
      >
        {renderNoteGrouping()}
      </div>
    </div>
  );
};
