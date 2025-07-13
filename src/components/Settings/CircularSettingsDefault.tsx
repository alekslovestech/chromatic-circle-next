import { DEBUG_BORDER } from "@/lib/design";
import { ClearButton } from "../Buttons/ClearButton";
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
      <div className={`key-selector flex ${settingsGap}`}>
        <MusicalKeySelector useDropdownSelector={false} />
      </div>
      <div className="transpose-widget-container">
        <TransposeWidget target="notes" />
      </div>
      {/*<MonochromeModeToggle />*/}
      <div className="max-w-xs self-center">
        <ClearButton />
      </div>
    </div>
  );
};
