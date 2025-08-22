"use client";
import React from "react";
import { ChordDisplayInfo } from "@/types/interfaces/ChordDisplayInfo";
import { ChordDisplayMode } from "@/types/SettingModes";

import { useMusical } from "@/contexts/MusicalContext";
import { useDisplay } from "@/contexts/DisplayContext";
import {
  useChordPresets,
  useIsChordsOrIntervals,
} from "@/contexts/ChordPresetContext";

import { SpellingUtils } from "@/utils/SpellingUtils";
import { TYPOGRAPHY } from "@/lib/design";
import { LAYOUT_PATTERNS } from "@/lib/design/LayoutPatterns";
import { useBorder } from "@/lib/hooks";
import { MusicalDisplayFormatter } from "@/utils/formatters/MusicalDisplayFormatter";

const MAX_CHORD_NAME_LENGTH = 7;
const BREAK_CHARACTER = "\u200B";
export const ChordNameDisplay: React.FC = () => {
  const { selectedNoteIndices, selectedMusicalKey } = useMusical();
  const { chordDisplayMode, setChordDisplayMode } = useDisplay();
  const { selectedChordType, selectedInversionIndex } = useChordPresets();
  const isChordsOrIntervals = useIsChordsOrIntervals();
  const border = useBorder();

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
    const shouldUseChordPresetSpelling = SpellingUtils.isChordPresetKnown(
      selectedChordType,
      isChordsOrIntervals
    );

    const displayInfo =
      shouldUseChordPresetSpelling && selectedNoteIndices.length > 0
        ? MusicalDisplayFormatter.getChordPresetDisplayInfo(
            selectedNoteIndices,
            selectedChordType,
            selectedInversionIndex,
            ChordDisplayMode.Symbols
          )
        : MusicalDisplayFormatter.getDisplayInfoFromIndices(
            selectedNoteIndices,
            chordDisplayMode,
            selectedMusicalKey
          );

    return renderChordDisplay(displayInfo);
  };

  const renderChordDisplay = (displayInfo: ChordDisplayInfo) => {
    const { chordName, noteGroupingString } = displayInfo;
    const chordNameDisplay =
      chordName.length > MAX_CHORD_NAME_LENGTH && chordName.includes("/")
        ? chordName.replace("/", `${BREAK_CHARACTER}/`)
        : chordName;
    return (
      <div
        className={`chord-name-description ${LAYOUT_PATTERNS.centerFlexCol} ${LAYOUT_PATTERNS.fullSize}`}
      >
        <div className={`${TYPOGRAPHY.controlLabel}`}>
          {`${noteGroupingString}:`}
        </div>
        <div
          className={`chord-name-value ${TYPOGRAPHY.displayText} max-w-full text-center break-words`}
        >
          {chordNameDisplay}
        </div>
      </div>
    );
  };

  return (
    <div className={`chord-display ${LAYOUT_PATTERNS.fullSize} ${border}`}>
      <div
        onClick={toggleChordDisplayMode}
        className={`cursor-pointer hover:text-buttons-textSelected transition-colors duration-200 ${LAYOUT_PATTERNS.fullSize}`}
      >
        {renderNoteGrouping()}
      </div>
    </div>
  );
};
