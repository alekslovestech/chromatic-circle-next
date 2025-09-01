import { render } from "@testing-library/react";

import { ReactTestUtils } from "./reactutils/ReactTestUtils";

import { RootProvider } from "@/contexts/RootContext";

import { InputModeSelector } from "@/components/Settings/InputModeSelector";
import { ChordPresetSelector } from "@/components/Settings/ChordPresetsSelector";
import { SettingsPanelDefault } from "@/components/Settings/SettingsPanelDefault";
import { ChordNameDisplay } from "@/components/ChordNameDisplay";

describe("Test Transpose Widget with preset buttons", () => {
  const renderComponent = () =>
    render(
      <RootProvider>
        <InputModeSelector />
        <ChordPresetSelector />
        <SettingsPanelDefault />
        <ChordNameDisplay />
      </RootProvider>
    );

  describe("Default Behavior, chord mode", () => {
    beforeEach(() => {
      renderComponent();
      ReactTestUtils.clickKey("mode-chords"); //default G major
    });

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
