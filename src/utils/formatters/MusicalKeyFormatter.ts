import { ChromaticIndex, ixChromatic } from "@/types/ChromaticIndex";
import { MusicalKey } from "@/types/Keys/MusicalKey";
import { KeyDisplayMode } from "@/types/SettingModes";
import { TWELVE } from "@/types/constants/NoteConstants";
import { ChromaticNoteResolver } from "../resolvers/ChromaticNoteResolver";
import { ScaleModeFormatter } from "./ScaleModeFormatter";

export class MusicalKeyFormatter {
  static formatNoteForDisplay(
    musicalKey: MusicalKey,
    chromaticIndex: ChromaticIndex,
    keyTextMode: KeyDisplayMode
  ): string {
    const scaleDegreeInfo =
      musicalKey.getScaleDegreeInfoFromChromatic(chromaticIndex);
    if (keyTextMode === KeyDisplayMode.NoteNames) {
      const noteInfo = ChromaticNoteResolver.resolveAbsoluteNote(
        chromaticIndex,
        musicalKey.getDefaultAccidental()
      );
      return noteInfo.formatNoteNameForDisplay();
    }
    if (!scaleDegreeInfo) return "";

    return ScaleModeFormatter.formatScaleDegreeForDisplay(
      musicalKey.greekModeInfo,
      scaleDegreeInfo,
      keyTextMode
    );
  }

  static formatAllNotesForDisplay(
    musicalKey: MusicalKey,
    keyTextMode: KeyDisplayMode
  ): string[] {
    return Array.from({ length: TWELVE }, (_, i) =>
      this.formatNoteForDisplay(musicalKey, ixChromatic(i), keyTextMode)
    );
  }
}
