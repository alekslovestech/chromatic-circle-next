"use client";
import React from "react";
import { ChordDisplayMode } from "@/types/SettingModes";

import { useMusical } from "@/contexts/MusicalContext";
import { useDisplay } from "@/contexts/DisplayContext";

import { ChordUtils } from "@/utils/ChordUtils";
import { TYPOGRAPHY } from "./Common/Typography";

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
    return (
      <div className={`chord-name-description ${TYPOGRAPHY.bodyText}`}>
        <span>{`${noteGroupingString}: `}</span>
        <span className="chord-name-value font-bold">{chordName}</span>
      </div>
    );
  };

  return (
    <div className="chord-display">
      <div
        onClick={toggleChordDisplayMode}
        className="cursor-pointer hover:text-buttons-textSelected transition-colors duration-200"
      >
        {renderNoteGrouping()}
      </div>
    </div>
  );
};
