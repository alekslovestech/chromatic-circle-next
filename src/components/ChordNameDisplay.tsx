"use client";
import React from "react";

import { SpecialType } from "@/types/enums/SpecialType";
import { ChordType } from "@/types/enums/ChordType";

import { ChordDisplayInfo } from "@/types/interfaces/ChordDisplayInfo";
import { ChordDisplayMode } from "@/types/SettingModes";

import { MusicalDisplayFormatter } from "@/utils/formatters/MusicalDisplayFormatter";

import { useMusical } from "@/contexts/MusicalContext";
import { useDisplay } from "@/contexts/DisplayContext";
import {
  useChordPresets,
  useIsChordsOrIntervals,
} from "@/contexts/ChordPresetContext";

import { TYPOGRAPHY } from "@/lib/design";
import { LAYOUT_PATTERNS } from "@/lib/design/LayoutPatterns";
import { useBorder } from "@/lib/hooks";
import { makeChordReference } from "@/types/interfaces/ChordReference";
import { IndexUtils } from "@/utils/IndexUtils";
import { ChordUtils } from "@/utils/ChordUtils";

const MAX_CHORD_NAME_LENGTH = 7;
const BREAK_CHARACTER = "\u200B";
export const ChordNameDisplay: React.FC = () => {
  const { selectedNoteIndices, selectedMusicalKey, currentChordRef } =
    useMusical();
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
    const shouldUseChordPresetSpelling =
      isChordsOrIntervals &&
      selectedChordType !== SpecialType.None &&
      selectedChordType !== SpecialType.Note &&
      selectedChordType !== SpecialType.Freeform &&
      selectedChordType !== ChordType.Unknown;

    let displayInfo: ChordDisplayInfo;

    if (shouldUseChordPresetSpelling && selectedNoteIndices.length > 0) {
      const chordRef =
        currentChordRef ||
        makeChordReference(
          ChordUtils.getRootNoteFromInvertedChord(
            selectedNoteIndices,
            selectedInversionIndex
          ),
          selectedChordType,
          selectedInversionIndex
        );

      displayInfo = MusicalDisplayFormatter.getChordPresetDisplayInfo(
        selectedNoteIndices,
        chordRef,
        ChordDisplayMode.Symbols
      );
    } else {
      displayInfo = MusicalDisplayFormatter.getDisplayInfoFromIndices(
        selectedNoteIndices,
        chordDisplayMode,
        selectedMusicalKey
      );
    }

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
