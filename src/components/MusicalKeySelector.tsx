"use client";
import React from "react";

import { MusicalKey } from "@/types/Keys/MusicalKey";
import { GreekModeType } from "@/types/GreekModes/GreekModeType";
import { KeyType } from "@/types/Keys/KeyType";
import { KeySignature } from "@/types/Keys/KeySignature";

import { useMusical } from "@/contexts/MusicalContext";

import { Button } from "./Common/Button";
import { Select } from "./Common/Select";

export const MusicalKeySelector = ({
  useDropdownSelector,
}: {
  useDropdownSelector: boolean;
}) => {
  const { selectedMusicalKey, setSelectedMusicalKey } = useMusical();

  // Remove the useEffect - AudioContext handles auto-playback now

  //C / C# / Db / D / D# / Eb / E / F / F# / Gb / G / G# / Ab / A / A# / Bb / B
  const handleTonicNameChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const tonicName = event.target.value as string;

    const newKey = useDropdownSelector
      ? MusicalKey.fromGreekMode(tonicName, selectedMusicalKey.greekMode)
      : MusicalKey.fromClassicalMode(
          tonicName,
          selectedMusicalKey.classicalMode
        );
    setSelectedMusicalKey(newKey);
  };

  //Ionian / Dorian / Phrygian / Lydian / Mixolydian / Aeolian / Locrian
  const handleGreekModeChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const greekMode = event.target.value as GreekModeType;
    const newKey = MusicalKey.fromGreekMode(
      selectedMusicalKey.tonicString,
      greekMode
    );
    setSelectedMusicalKey(newKey);
  };

  //Major / Minor
  const handleMajorMinorToggle = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    const newKey = selectedMusicalKey.getOppositeKey();
    setSelectedMusicalKey(newKey);
  };

  const TonicSelector = () => (
    <Select
      id="tonic-select"
      value={selectedMusicalKey.tonicString}
      onChange={handleTonicNameChange}
      title="Select tonic note (scale start)"
    >
      {KeySignature.getKeyList(selectedMusicalKey.classicalMode).map((note) => (
        <option key={note} value={note}>
          {note}
        </option>
      ))}
    </Select>
  );

  return (
    <div className="musical-key-selector text-sm font-medium">
      {useDropdownSelector ? (
        <div className="flex flex-col gap-2">
          <TonicSelector />
          <Select
            id="greek-mode-select"
            value={selectedMusicalKey.greekMode}
            onChange={handleGreekModeChange}
            title="Select musical mode"
          >
            {Object.values(GreekModeType).map((mode) => (
              <option id={`greek-mode-option-${mode}`} key={mode} value={mode}>
                {mode}
              </option>
            ))}
          </Select>
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          <TonicSelector />
          <Button
            id="major-minor-toggle"
            variant="action"
            size="sm"
            title="Toggle between major and minor"
            onClick={handleMajorMinorToggle}
          >
            {selectedMusicalKey.classicalMode === KeyType.Major
              ? "Major"
              : "Minor"}
          </Button>
        </div>
      )}
    </div>
  );
};
