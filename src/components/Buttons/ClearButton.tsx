import { useMusical } from "@/contexts/MusicalContext";
import { Button } from "../Common/Button";
import { ixInversion } from "@/types/IndexTypes";
import { usePreset } from "@/contexts/PresetContext";

export const ClearButton: React.FC = () => {
  const { setSelectedNoteIndices } = useMusical();
  const { setSelectedInversionIndex } = usePreset();

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
