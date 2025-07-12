"use client";

import { useDisplay } from "@/contexts/DisplayContext";
import { Toggle } from "../Common/Toggle";

// atm we don't use it and compute a default monoChromeMode state from the globalMode
export const MonochromeModeToggle: React.FC = () => {
  const { monochromeMode, setMonochromeMode } = useDisplay();
  return (
    <Toggle
      id="monochrome-mode"
      checked={monochromeMode}
      onChange={setMonochromeMode}
      label="Uniform Keys"
    />
  );
};
