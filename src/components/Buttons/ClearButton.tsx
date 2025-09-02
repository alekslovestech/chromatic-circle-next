import { useMusical } from "@/contexts/MusicalContext";
import { Button } from "../Common/Button";

export const ClearButton: React.FC = () => {
  const { setSelectedNoteIndices } = useMusical();

  const handleClear = () => {
    setSelectedNoteIndices([]);
  };
  return (
    <Button size="sm" variant="action" onClick={handleClear}>
      Clear
    </Button>
  );
};
