import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";

import { RootProvider } from "@/contexts/RootContext";
import { KeyboardLinear } from "@/components/Keyboard/Linear/KeyboardLinear";
import { InputModeSelector } from "@/components/Settings/InputModeSelector";
import { ChordPresetSelector } from "@/components/Settings/ChordPresetsSelector";
import { ChordNameDisplay } from "@/components/ChordNameDisplay";
import { ReactTestUtils } from "../reactutils/ReactTestUtils";
import { keyVerificationUtils } from "../reactutils/KeyboardVerificationUtils";
import { SettingsPanelDefault } from "@/components/Settings/SettingsPanelDefault";
import { KeyboardCircular } from "@/components/Keyboard/Circular/KeyboardCircular";

describe("ChordUpdates", () => {
  const renderComponent = () =>
    render(
      <RootProvider>
        <KeyboardLinear />
        <KeyboardCircular />
        <InputModeSelector />
        <ChordPresetSelector />
        <ChordNameDisplay />
        <SettingsPanelDefault />
      </RootProvider>
    );

  beforeEach(() => {
    renderComponent();
    ReactTestUtils.clickKey("mode-chords");
  });

  describe("User interacts with the linear keyboard", () => {
    test("Major chord default => click A on linear keyboard => A major", () => {
      ReactTestUtils.clickKey("mode-chords");
      ReactTestUtils.clickKey("linearKey09"); //click A
      keyVerificationUtils.verifySelectedLinearKeys([9, 13, 16]); //A C# E
      const chordNameNoteGrouping = document.getElementById(
        "chord-name-note-grouping"
      );
      const chordNameValue = document.getElementById("chord-name-value");

      expect(chordNameNoteGrouping).toBeInTheDocument();
      expect(chordNameValue).toBeInTheDocument();

      expect(chordNameNoteGrouping).toHaveTextContent("Chord:");
      expect(chordNameValue).toHaveTextContent("A"); //A major
    });
  });

  describe("User interacts with the transpose widget", () => {
    test("Transposing notes up should update the chord name", () => {
      ReactTestUtils.clickKey("transpose-up-button");
      const chordNameNoteGrouping = document.getElementById(
        "chord-name-note-grouping"
      );
      const chordNameValue = document.getElementById("chord-name-value");

      expect(chordNameNoteGrouping).toBeInTheDocument();
      expect(chordNameValue).toBeInTheDocument();

      expect(chordNameNoteGrouping).toHaveTextContent("Chord:");
      expect(chordNameValue).toHaveTextContent("A♭"); //A♭ major
    });

    test("Transposing notes down should update the chord name", () => {
      ReactTestUtils.clickKey("transpose-down-button");
      const chordNameNoteGrouping = document.getElementById(
        "chord-name-note-grouping"
      );
      const chordNameValue = document.getElementById("chord-name-value");

      expect(chordNameNoteGrouping).toBeInTheDocument();
      expect(chordNameValue).toBeInTheDocument();
      expect(chordNameNoteGrouping).toHaveTextContent("Chord:");
      expect(chordNameValue).toHaveTextContent("F♯"); //F# major
    });

    test("Transposing notes down should update the chord name", () => {
      ReactTestUtils.clickKey("mode-singlenote"); //default G
      ReactTestUtils.clickKey("transpose-down-button");
      const chordNameNoteGrouping = document.getElementById(
        "chord-name-note-grouping"
      );
      const chordNameValue = document.getElementById("chord-name-value");

      expect(chordNameNoteGrouping).toBeInTheDocument();
      expect(chordNameValue).toBeInTheDocument();
      expect(chordNameNoteGrouping).toHaveTextContent("Note:");
      expect(chordNameValue).toHaveTextContent("F♯"); //F#
    });
  });
});
