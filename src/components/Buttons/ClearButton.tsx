import { useMusical } from "@/contexts/MusicalContext";
import { Button } from "../Common/Button";
import { ixInversion } from "@/types/IndexTypes";
import { useChordPresets } from "@/contexts/ChordPresetContext";

export const ClearButton: React.FC = () => {
  const { setSelectedNoteIndices } = useMusical();
  const { setSelectedInversionIndex } = useChordPresets();

  const handleClear = () => {
    setSelectedNoteIndices([]);
    setSelectedInversionIndex(ixInversion(0));
  };
  return (
    <Button size="sm" variant="action" onClick={handleClear}>
      Clear
    </Button>
  );
};
