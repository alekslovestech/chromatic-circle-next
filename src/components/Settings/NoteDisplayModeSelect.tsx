"use client";
import React from "react";

import { Button } from "@/components/Common/Button";
import { SectionTitle } from "@/components/Common/SectionTitle";

import { useDisplay } from "@/contexts/DisplayContext";
import { KeyDisplayMode } from "@/types/enums/KeyDisplayMode";

interface DisplayModeOption {
  id: string;
  mode: KeyDisplayMode;
  label: string;
  description: string;
}

const DISPLAY_MODE_OPTIONS: DisplayModeOption[] = [
  {
    id: "note-names",
    mode: KeyDisplayMode.NoteNames,
    label: "A",
    description: "Display note names (A, B, C, etc.)",
  },
  {
    id: "scale-degree",
    mode: KeyDisplayMode.ScaleDegree,
    label: "1",
    description: "Display scale degrees (1, 2, 3, etc.)",
  },
  {
    id: "roman-numerals",
    mode: KeyDisplayMode.Roman,
    label: "iv",
    description: "Display roman numerals (i, ii, iii, etc.)",
  },
];

export const NoteDisplayModeSelect: React.FC = () => {
  const { keyTextMode, setKeyTextMode } = useDisplay();

  const handleModeChange = (newMode: KeyDisplayMode) => {
    setKeyTextMode(newMode);
  };

  return (
    <div className="note-display-mode-select">
      <SectionTitle>Note Display</SectionTitle>
      <div className="flex gap-2">
        {DISPLAY_MODE_OPTIONS.map(({ id, mode, label, description }) => (
          <Button
            key={id}
            id={`note-display-${id}`}
            variant="option"
            size="sm"
            selected={keyTextMode === mode}
            onClick={() => handleModeChange(mode)}
            title={description}
          >
            {label}
          </Button>
        ))}
      </div>
    </div>
  );
};
