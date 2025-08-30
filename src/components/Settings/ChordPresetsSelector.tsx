"use client";
import React from "react";

import { InputMode } from "@/types/SettingModes";
import { ixActual, ixInversion } from "@/types/IndexTypes";
import { NoteGroupingId } from "@/types/NoteGroupingId";
import { NoteGroupingLibrary } from "@/types/NoteGroupingLibrary";

import { ChordUtils } from "@/utils/ChordUtils";
import { IndexUtils } from "@/utils/IndexUtils";

import { useChordPresets } from "@/contexts/ChordPresetContext";
import { useMusical } from "@/contexts/MusicalContext";

import { LAYOUT_PATTERNS } from "@/lib/design";
import { useBorder } from "@/lib/hooks";

import { InversionButton } from "../Buttons/InversionButton";
import { SectionTitle } from "../Common/SectionTitle";
import { ChordPresetButton } from "./ChordPresetButton";

export const ChordPresetSelector: React.FC = () => {
  const {
    selectedChordType,
    setSelectedChordType,
    selectedInversionIndex,
    setSelectedInversionIndex,
    inputMode,
  } = useChordPresets();

  const { selectedNoteIndices, setSelectedNoteIndices } = useMusical();
  const border = useBorder();
  if (
    inputMode !== InputMode.ChordPresets &&
    inputMode !== InputMode.IntervalPresets
  )
    return null;

  const handlePresetChange = (newPresetId: NoteGroupingId) => {
    setSelectedChordType(newPresetId);
    setSelectedInversionIndex(ixInversion(0));

    const rootNote =
      selectedNoteIndices.length > 0
        ? ChordUtils.bassNoteAtInversion(
            selectedNoteIndices,
            selectedInversionIndex
          )
        : ixActual(7);

    const updatedIndices = ChordUtils.calculateChordNotesFromIndex(
      rootNote,
      newPresetId,
      ixInversion(0)
    );
    setSelectedNoteIndices(updatedIndices);
  };

  const renderIntervalPresetButtons = () => {
    const presets = NoteGroupingLibrary.IntervalOrChordIds(true);
    return (
      <div
        className={`preset-buttons-grid grid gap-tight w-full ${border}`}
        style={{ gridTemplateColumns: "repeat(2, 1fr)" }}
      >
        {presets
          .filter(
            (preset) =>
              NoteGroupingLibrary.getGroupingById(preset).isVisiblePreset
          )
          .map((presetId) => (
            <ChordPresetButton
              key={presetId}
              presetId={presetId}
              selected={presetId === selectedChordType}
              onClick={handlePresetChange}
            />
          ))}
      </div>
    );
  };

  const renderChordPresetButtons = () => {
    const presets = NoteGroupingLibrary.IntervalOrChordIds(false);
    return (
      <div
        className={`preset-buttons-grid grid gap-tight w-full ${border}`}
        style={{ gridTemplateColumns: "repeat(4, 1fr)" }}
      >
        {presets
          .filter(
            (preset) =>
              NoteGroupingLibrary.getGroupingById(preset).isVisiblePreset
          )
          .map((presetId) => (
            <ChordPresetButton
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
        <div className={`inversion-controls flex flex-col gap-tight ${border}`}>
          <SectionTitle centered={true}>Inversion</SectionTitle>
          <div
            className={`inversion-button-container flex flex-row gap-snug justify-center`}
          >
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
    <div
      className={`presets-selector ${border} flex flex-col gap-snug ${LAYOUT_PATTERNS.fullSize}`}
    >
      {inputMode === InputMode.IntervalPresets
        ? renderIntervalPresetButtons()
        : renderChordPresetButtons()}
      {inputMode === InputMode.ChordPresets && renderInversionButtons()}
    </div>
  );
};
