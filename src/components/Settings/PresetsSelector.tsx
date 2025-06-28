"use client";
import React from "react";

import { InputMode } from "@/types/SettingModes";
import { ixInversion } from "@/types/IndexTypes";
import { NoteGroupingId } from "@/types/NoteGroupingTypes";
import { NoteGroupingLibrary } from "@/types/NoteGroupingLibrary";

import { IndexUtils } from "@/utils/IndexUtils";
import { ChordUtils } from "@/utils/ChordUtils";

import { usePreset } from "@/contexts/PresetContext";
import { useMusical } from "@/contexts/MusicalContext";

import { SectionTitle } from "../Common/SectionTitle";
import { InversionButton } from "../Buttons/InversionButton";
import { PresetButton } from "./PresetButton";
import { DEBUG_BORDER } from "@/lib/constants";

export const PresetsSelector: React.FC = () => {
  const {
    selectedChordType,
    setSelectedChordType,
    selectedInversionIndex,
    setSelectedInversionIndex,
    inputMode,
  } = usePreset();

  const { selectedNoteIndices, setSelectedNoteIndices } = useMusical();

  if (
    inputMode !== InputMode.ChordPresets &&
    inputMode !== InputMode.IntervalPresets
  )
    return null;

  const handlePresetChange = (newPresetId: NoteGroupingId) => {
    setSelectedChordType(newPresetId);
    setSelectedInversionIndex(ixInversion(0));
    const rootNote = IndexUtils.rootNoteAtInversion(
      selectedNoteIndices,
      selectedInversionIndex
    );
    const updatedIndices = ChordUtils.calculateChordNotesFromIndex(
      rootNote,
      newPresetId,
      ixInversion(0)
    );
    setSelectedNoteIndices(updatedIndices);
  };

  const renderPresetButtons = () => {
    const presets = NoteGroupingLibrary.IntervalOrChordIds(
      inputMode === InputMode.IntervalPresets
    );
    const numColumns = inputMode === InputMode.IntervalPresets ? 2 : 4;

    return (
      <div
        className={`preset-buttons-grid grid gap-tight w-full ${DEBUG_BORDER}`}
        style={{ gridTemplateColumns: `repeat(${numColumns}, 1fr)` }}
      >
        {presets
          .filter(
            (preset) =>
              NoteGroupingLibrary.getGroupingById(preset).isVisiblePreset
          )
          .map((presetId) => (
            <PresetButton
              key={presetId}
              presetId={presetId}
              selected={presetId === selectedChordType}
              onClick={handlePresetChange}
            />
          ))}
      </div>
    );
  };

  const renderInversionButtons = () => {
    const presetDefinition =
      NoteGroupingLibrary.getGroupingById(selectedChordType);
    if (presetDefinition && presetDefinition.hasInversions) {
      const inversionCount = presetDefinition.inversions.length;
      return (
        <div className={`inversion-controls ${DEBUG_BORDER}`}>
          <SectionTitle centered={true}>Inversion</SectionTitle>
          <div className="inversion-button-container flex flex-row gap-normal justify-center">
            {Array.from({ length: inversionCount }, (_, i) => (
              <InversionButton key={i} inversionIndex={ixInversion(i)} />
            ))}
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className={`presets-selector ${DEBUG_BORDER} flex flex-col gap-snug`}>
      {renderPresetButtons()}
      {inputMode === InputMode.ChordPresets && renderInversionButtons()}
    </div>
  );
};
