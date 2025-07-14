"use client";
import React from "react";

import { InputMode } from "@/types/SettingModes";
import { ixActual, ixInversion } from "@/types/IndexTypes";
import { NoteGroupingId } from "@/types/NoteGroupingTypes";
import { NoteGroupingLibrary } from "@/types/NoteGroupingLibrary";

import { IndexUtils } from "@/utils/IndexUtils";
import { ChordUtils } from "@/utils/ChordUtils";

import { usePreset } from "@/contexts/PresetContext";
import { useMusical } from "@/contexts/MusicalContext";

import { SectionTitle } from "../Common/SectionTitle";
import { InversionButton } from "../Buttons/InversionButton";
import { PresetButton } from "./PresetButton";
import { DEBUG_BORDER, LAYOUT_PATTERNS } from "@/lib/design";

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

    const rootNote =
      selectedNoteIndices.length > 0
        ? IndexUtils.rootNoteAtInversion(
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
        className={`preset-buttons-grid grid gap-tight w-full ${DEBUG_BORDER}`}
        style={{ gridTemplateColumns: "repeat(2, 1fr)" }}
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

  const renderChordPresetButtons = () => {
    const presets = NoteGroupingLibrary.IntervalOrChordIds(false);
    return (
      <div
        className={`preset-buttons-grid grid gap-tight w-full ${DEBUG_BORDER}`}
        style={{ gridTemplateColumns: "repeat(4, 1fr)" }}
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
        <div
          className={`inversion-controls flex flex-col gap-tight ${DEBUG_BORDER}`}
        >
          <SectionTitle centered={true}>Inversion</SectionTitle>
          <div
            className={`inversion-button-container flex flex-row gap-snug justify-center ${DEBUG_BORDER}`}
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
      className={`presets-selector ${DEBUG_BORDER} flex flex-col gap-snug ${LAYOUT_PATTERNS.fullSize}`}
    >
      {inputMode === InputMode.IntervalPresets
        ? renderIntervalPresetButtons()
        : renderChordPresetButtons()}
      {inputMode === InputMode.ChordPresets && renderInversionButtons()}
    </div>
  );
};
