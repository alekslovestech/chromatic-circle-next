import React from "react";
import { render } from "@testing-library/react";

import { ReactTestUtils } from "./reactutils/ReactTestUtils";

import { RootProvider } from "@/contexts/RootContext";

import { InputModeSelector } from "@/components/Settings/InputModeSelector";
import { ChordPresetSelector } from "@/components/Settings/ChordPresetsSelector";

describe("ChordPresetsSelector", () => {
  const renderComponent = () =>
    render(
      <RootProvider>
        <InputModeSelector />
        <ChordPresetSelector />
      </RootProvider>
    );

  test("selecting a new chord resets inversion to 0", () => {
    renderComponent();

    // Select a chord with inversions (e.g., major triad)
    ReactTestUtils.clickKey("mode-chords");
    ReactTestUtils.clickKey("preset-Chord_Maj");

    // Select an inversion other than 0
    ReactTestUtils.clickKey("inversion-1");

    // Select a different chord
    ReactTestUtils.clickKey("preset-Chord_Min");

    ReactTestUtils.expectElementByIdToBeSelected("inversion-0");
  });

  test("selecting an inversion updates the chord", () => {
    renderComponent();

    // Select a chord with inversions (e.g., major triad)
    ReactTestUtils.clickKey("mode-chords");
    ReactTestUtils.clickKey("preset-Chord_Maj");

    // Select the first inversion
    ReactTestUtils.clickKey("inversion-1");

    // Check that the inversion is updated
    ReactTestUtils.expectElementByIdToBeSelected("inversion-1");
  });
});
