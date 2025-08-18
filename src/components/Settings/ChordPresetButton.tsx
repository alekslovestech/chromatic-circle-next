"use client";
import React from "react";
import { NoteGroupingId } from "@/types/enums/NoteGroupingId";
import { ChordDisplayMode } from "@/types/SettingModes";
import { NoteGroupingLibrary } from "@/types/NoteGroupingLibrary";
import { Button } from "../Common/Button";

interface PresetButtonProps {
  presetId: NoteGroupingId;
  selected: boolean;
  onClick: (presetId: NoteGroupingId) => void;
}

export const ChordPresetButton: React.FC<PresetButtonProps> = ({
  presetId,
  selected,
  onClick,
}) => {
  const elementId = NoteGroupingLibrary.getId(
    presetId,
    ChordDisplayMode.ElementId
  );
  const displayName = NoteGroupingLibrary.getId(
    presetId,
    ChordDisplayMode.DisplayName
  );
  const letters = NoteGroupingLibrary.getId(
    presetId,
    ChordDisplayMode.Letters_Long
  );

  return (
    <Button
      id={`preset-${elementId}`}
      key={presetId}
      variant="option"
      size="sm"
      selected={selected}
      onClick={() => onClick(presetId)}
      title={displayName}
    >
      {letters}
    </Button>
  );
};
