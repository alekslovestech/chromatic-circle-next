"use client";
import { useDisplay } from "@/contexts/DisplayContext";
import { Toggle } from "../Common/Toggle";

//We don't use this atm, setting the mode based on the global mode
export const ScalePreviewToggle: React.FC = () => {
  const { scalePreviewMode, setScalePreviewMode } = useDisplay();
  return (
    <Toggle
      id="scale-preview-mode"
      checked={scalePreviewMode}
      onChange={setScalePreviewMode}
      label="Scale Preview Mode"
    />
  );
};
