"use client";
import { useDisplay } from "@/contexts/DisplayContext";
import { KeyDisplayMode } from "@/types/SettingModes";
import { TYPOGRAPHY } from "../Common/ButtonTypes";

// determines the way the note names / scale degrees are displayed on the circular keyboard
export const KeyTextModeSelect: React.FC = () => {
  const { keyTextMode, setKeyTextMode } = useDisplay();

  const labelStyles = `${TYPOGRAPHY.controlLabel} cursor-pointer hover:text-buttons-textSelected transition-colors duration-200`;

  return (
    <div
      className="note-display-mode-container"
      style={{ display: "flex", flexDirection: "row", gap: "10px" }}
    >
      <div className="radio-option">
        <input
          type="radio"
          id="key-text-note-names"
          name="key-text-mode"
          title="Note Names"
          checked={keyTextMode === KeyDisplayMode.NoteNames}
          onChange={() => setKeyTextMode(KeyDisplayMode.NoteNames)}
        />
        <label htmlFor="key-text-note-names" className={labelStyles}>
          A
        </label>
      </div>

      <div className="radio-option">
        <input
          type="radio"
          id="key-text-numbers"
          name="key-text-mode"
          title="Scale Degree"
          checked={keyTextMode === KeyDisplayMode.ScaleDegree}
          onChange={() => setKeyTextMode(KeyDisplayMode.ScaleDegree)}
        />
        <label htmlFor="key-text-numbers" className={labelStyles}>
          1
        </label>
      </div>

      <div className="radio-option">
        <input
          type="radio"
          id="key-text-roman"
          name="key-text-mode"
          title="Roman Numerals"
          checked={keyTextMode === KeyDisplayMode.Roman}
          onChange={() => setKeyTextMode(KeyDisplayMode.Roman)}
        />
        <label htmlFor="key-text-roman" className={labelStyles}>
          iv
        </label>
      </div>
    </div>
  );
};
