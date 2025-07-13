import { DEBUG_BORDER } from "@/lib/design";
import { ClearButton } from "../Buttons/ClearButton";
import { PlayNotesButton } from "../Buttons/PlayNotesButton";
import { TransposeWidget } from "../TransposeWidget";
import { MusicalKeySelector } from "../MusicalKeySelector";
import { CircularVisModeSelect } from "../Keyboard/Circular/CircularVisModeSelect";

export const CircularSettingsDefault = () => {
  const settingsGap = "gap-tight";
  return (
    <div
      id="keyboardcircular-settings-default"
      className={`flex flex-col ${settingsGap} ${DEBUG_BORDER}`}
    >
      <CircularVisModeSelect />
      <div className="transpose-widget-container">
        <TransposeWidget target="notes" />
      </div>
      <div className={`key-selector flex ${settingsGap}`}>
        <MusicalKeySelector useDropdownSelector={false} />
      </div>

      {/*<MonochromeModeToggle />*/}
      <div className="max-w-xs self-center">
        <PlayNotesButton />
        <ClearButton />
      </div>
    </div>
  );
};
