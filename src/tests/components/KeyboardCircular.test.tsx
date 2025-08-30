import { render } from "@testing-library/react";

import { ReactTestUtils } from "./reactutils/ReactTestUtils";
import { keyVerificationUtils } from "./reactutils/KeyboardVerificationUtils";

import { RootProvider } from "@/contexts/RootContext";

import { KeyboardCircular } from "@/components/Keyboard/Circular/KeyboardCircular";
import { InputModeSelector } from "@/components/Settings/InputModeSelector";
import { ChordPresetSelector } from "@/components/Settings/ChordPresetsSelector";

//scenarios where we only test the circular keyboard
describe("KeyboardCircular", () => {
  const renderComponent = () =>
    render(
      <RootProvider>
        <KeyboardCircular />
        <InputModeSelector />
        <ChordPresetSelector />
      </RootProvider>
    );

  beforeEach(() => {
    renderComponent();
  });

  test.skip("handles click on the 'C' slice", () => {
    ReactTestUtils.clickKey("circularKey00");
    keyVerificationUtils.verifySelectedCircularKeys([0]);
  });

  test.skip("handles click on the 'A' slice", () => {
    ReactTestUtils.clickKey("circularKey09");
    keyVerificationUtils.verifySelectedCircularKeys([9]);
  });

  test.skip("switching to Chord Presets with C selected renders 3 notes", () => {
    ReactTestUtils.clickKey("circularKey00");
    ReactTestUtils.clickKey("mode-chords");
    keyVerificationUtils.verifySelectedCircularKeys([0, 4, 7]);
  });
});
