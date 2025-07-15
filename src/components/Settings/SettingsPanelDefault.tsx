import { DEBUG_BORDER, LAYOUT_PATTERNS } from "@/lib/design";
import { ClearButton } from "../Buttons/ClearButton";
import { PlayNotesButton } from "../Buttons/PlayNotesButton";
import { TransposeWidget } from "../TransposeWidget";
import { MusicalKeySelector } from "../MusicalKeySelector";
//import {MonochromeModeToggle} from "../MonochromeModeToggle";
//import { CircularVisModeSelect } from "../Keyboard/Circular/CircularVisModeSelect";

export const SettingsPanelDefault = () => {
  const settingsGap = "gap-tight";
  return (
    <div
      id="settings-panel-default"
      className={`${LAYOUT_PATTERNS.centerFlexCol} ${settingsGap} ${DEBUG_BORDER}`}
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
        <ClearButton />
      </div>
    </div>
  );
};
