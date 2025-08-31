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

  describe("Default Behavior", () => {
    beforeEach(() => {
      renderComponent();
      ReactTestUtils.clickKey("mode-chords"); //default G major
    });

    test("Transposing notes should update the chord name", () => {
      ReactTestUtils.clickKey("transpose-up-button");
      const chordNameValue = document.querySelector(".chord-name-value");
      expect(chordNameValue).toBeInTheDocument();
      expect(chordNameValue).toHaveTextContent("A♭"); //A♭ major
    });
  });
});
