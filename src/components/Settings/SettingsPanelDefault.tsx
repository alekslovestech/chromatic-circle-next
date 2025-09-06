import { InputMode } from "@/types/SettingModes";
import { LAYOUT_PATTERNS } from "@/lib/design";
import { useBorder } from "@/lib/hooks";

import { useChordPresets } from "@/contexts/ChordPresetContext";

import { ClearButton } from "../Buttons/ClearButton";
import { PlayNotesButton } from "../Buttons/PlayNotesButton";
import { TransposeWidget } from "../TransposeWidget";
//import {MonochromeModeToggle} from "../MonochromeModeToggle";
//import { CircularVisModeSelect } from "../Keyboard/Circular/CircularVisModeSelect";

export const SettingsPanelDefault = () => {
  const settingsGap = "gap-tight";
  const border = useBorder();
  const { inputMode } = useChordPresets();
  const isFreeformMode = inputMode === InputMode.Freeform;
  return (
    <div
      id="settings-panel-default"
      className={`${LAYOUT_PATTERNS.centerFlexCol} ${settingsGap} ${border} h-full`}
    >
      {/*<CircularVisModeSelect />*/}

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
