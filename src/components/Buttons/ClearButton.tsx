import { useMusical } from "@/contexts/MusicalContext";
import { Button } from "../Common/Button";

export const ClearButton: React.FC = () => {
  const { clearNotes } = useMusical();
  const handleClear = () => {
    clearNotes();
  };
  return (
    <Button size="sm" variant="action" onClick={handleClear}>
      Clear
    </Button>
  );
};
