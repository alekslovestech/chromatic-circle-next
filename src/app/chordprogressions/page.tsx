"use client";

import { COMMON_STYLES, NOTATION_LAYOUT } from "@/lib/design";
import { usePageLayout, useBorder } from "@/lib/hooks";

import { ChordNameDisplay } from "@/components/ChordNameDisplay";
import { StaffRenderer } from "@/components/StaffRenderer";
import { InputSettings } from "@/components/Settings/InputSettings";
import { KeyboardLinear } from "@/components/Keyboard/Linear/KeyboardLinear";
import { KeyboardCircular } from "@/components/Keyboard/Circular/KeyboardCircular";
import { SettingsPanelChordProgressions } from "@/components/Settings/SettingsPanelChordProgressions";

export default function ChordProgressionsPage() {
  const { gridRows, gridAreas, gridColumns } = usePageLayout();
  const border = useBorder();

  return (
    <div
      className={`ChordProgressionsPage-container ${COMMON_STYLES.pageContainer} bg-canvas-bgDefault ${border}`}
    >
      <div
        className={`ChordProgressionsPage-grid ${COMMON_STYLES.pageGrid} ${border}`}
        style={{
          gridTemplateColumns: gridColumns,
          gridTemplateRows: gridRows,
          gridTemplateAreas: gridAreas,
          width: "100%",
        }}
      >
        <div
          className="ChordProgressionsPage-staff grid"
          style={{
            gridArea: "staff",
            ...NOTATION_LAYOUT,
          }}
        >
          <StaffRenderer />
          <ChordNameDisplay />
        </div>

        <div
          className={`ChordProgressionsPage-circular-container ${COMMON_STYLES.circularContainer} ${border}`}
          style={{ gridArea: "circular" }}
        >
          <div
            className={`ChordProgressionsPage-circular-inner ${COMMON_STYLES.circularInner} ${border}`}
          >
            <KeyboardCircular />
            <div className="flex-1 h-full">
              <SettingsPanelChordProgressions />
            </div>
          </div>
          <div className="ChordProgressionsPage-chord-sidebar self-end mb-normal flex flex-col justify-end text-right max-w-[120px] p-2">
            <div className="ChordProgressionsPage-chord-display w-full h-full flex items-center justify-center text-2xl break-words">
              <ChordNameDisplay />
            </div>
          </div>
        </div>

        <div
          className={`ChordProgressionsPage-linear-container ${COMMON_STYLES.linearContainer} ${border}`}
          style={{ gridArea: "linear" }}
        >
          <div
            className={`ChordProgressionsPage-linear-inner ${COMMON_STYLES.linearInner} ${border}`}
          >
            <KeyboardLinear />
          </div>
        </div>

        <div
          className={`ChordProgressionsPage-settings-container ${COMMON_STYLES.settingsPanel} ${border}`}
          style={{ gridArea: "settings" }}
        >
          <InputSettings />
        </div>
      </div>
    </div>
  );
}
