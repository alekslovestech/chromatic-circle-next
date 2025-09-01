import { render } from "@testing-library/react";
import "@testing-library/jest-dom";

import { RootProvider } from "@/contexts/RootContext";
import { KeyboardLinear } from "@/components/Keyboard/Linear/KeyboardLinear";
import { InputModeSelector } from "@/components/Settings/InputModeSelector";
import { ChordPresetSelector } from "@/components/Settings/ChordPresetsSelector";
import { ChordNameDisplay } from "@/components/ChordNameDisplay";
import { ReactTestUtils } from "../../reactutils/ReactTestUtils";
import { keyVerificationUtils } from "../../reactutils/KeyboardVerificationUtils";
import { SettingsPanelDefault } from "@/components/Settings/SettingsPanelDefault";
import { KeyboardCircular } from "@/components/Keyboard/Circular/KeyboardCircular";

function verifyChordName(expectedChordName: string) {
  const chordNameNoteGrouping = document.getElementById(
    "chord-name-note-grouping"
  );
  const chordNameValue = document.getElementById("chord-name-value");
  expect(chordNameNoteGrouping).toBeInTheDocument();
  expect(chordNameValue).toBeInTheDocument();
  expect(chordNameNoteGrouping).toHaveTextContent("Chord:");
  expect(chordNameValue).toHaveTextContent(expectedChordName);
}

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
      ReactTestUtils.clickKey("linearKey09"); //click A
      keyVerificationUtils.verifySelectedLinearKeys([9, 13, 16]); //A C# E
      verifyChordName("A"); //A major
    });
  });

  describe("User interacts with the transpose widget", () => {
    test("Transposing notes up should update the chord name", () => {
      ReactTestUtils.clickKey("transpose-up-button");
      verifyChordName("A♭"); //A♭ major
    });

    test("Transposing notes down should update the chord name", () => {
      ReactTestUtils.clickKey("transpose-down-button");
      verifyChordName("F♯"); //F# major
    });

    test("Inversion 1 of G => G/B", () => {
      ReactTestUtils.clickKey("inversion-1");
      verifyChordName("G/B");
    });

    test("Inversion 2 of G => G/C", () => {
      ReactTestUtils.clickKey("inversion-2");
      verifyChordName("G/D");
    });

    test("Inversion 1 of G, then transpose up => A♭/C", () => {
      ReactTestUtils.clickKey("inversion-1");
      ReactTestUtils.clickKey("transpose-up-button");
      verifyChordName("A♭/C");
    });

    test("Inversion 1 of G, then transpose down => F#/A#", () => {
      ReactTestUtils.clickKey("inversion-1");
      ReactTestUtils.clickKey("transpose-down-button");
      verifyChordName("F♯/A♯");
    });
  });
});
