import { LAYOUT_PATTERNS } from "@/lib/design";
import { useBorder } from "@/lib/hooks/useBorder";
import { ClearButton } from "../Buttons/ClearButton";
import { PlayNotesButton } from "../Buttons/PlayNotesButton";
import { TransposeWidget } from "../TransposeWidget";
import { MusicalKeySelector } from "../MusicalKeySelector";
import { usePreset } from "@/contexts/PresetContext";
import { InputMode } from "@/types/SettingModes";
//import {MonochromeModeToggle} from "../MonochromeModeToggle";
//import { CircularVisModeSelect } from "../Keyboard/Circular/CircularVisModeSelect";

export const SettingsPanelDefault = () => {
  const settingsGap = "gap-tight";
  const border = useBorder();
  const { inputMode } = usePreset();
  const isFreeformMode = inputMode === InputMode.Toggle;
  return (
    <div
      id="settings-panel-default"
      className={`${LAYOUT_PATTERNS.centerFlexCol} ${settingsGap} ${border} h-full`}
    >
      {/*<CircularVisModeSelect />*/}

      <div className={`key-selector flex ${settingsGap} `}>
        <MusicalKeySelector useDropdownSelector={false} />
      </div>

      {/*<MonochromeModeToggle />*/}
      <div className="flex flex-col max-w-xs self-center">
        <PlayNotesButton />
        <div className="transpose-widget-container">
          <TransposeWidget target="notes" />
        </div>
        {isFreeformMode && <ClearButton />}
      </div>
    </div>
  );
};
