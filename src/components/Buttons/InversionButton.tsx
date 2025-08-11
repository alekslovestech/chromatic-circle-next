import { useMusical } from "@/contexts/MusicalContext";
import { useChordPresets } from "@/contexts/ChordPresetContext";
import { InversionIndex } from "@/types/IndexTypes";
import { ChordUtils } from "@/utils/ChordUtils";
import { IndexUtils } from "@/utils/IndexUtils";
import { Button } from "../Common/Button";

export const InversionButton: React.FC<{ inversionIndex: InversionIndex }> = ({
  inversionIndex,
}) => {
  const { selectedNoteIndices, setSelectedNoteIndices } = useMusical();
  const { selectedChordType } = useChordPresets();
  const { selectedInversionIndex, setSelectedInversionIndex } =
    useChordPresets();

  const handleInversionChange = (newInversionIndex: InversionIndex) => {
    const originalRootIndex = IndexUtils.rootNoteAtInversion(
      selectedNoteIndices,
      selectedInversionIndex
    );
    setSelectedInversionIndex(newInversionIndex);
    const updatedIndices = ChordUtils.calculateChordNotesFromIndex(
      originalRootIndex,
      selectedChordType,
      newInversionIndex
    );
    setSelectedNoteIndices(updatedIndices);
  };

  return (
    <Button
      id={`inversion-${inversionIndex}`}
      key={inversionIndex}
      size="sm"
      variant="option"
      onClick={() => handleInversionChange(inversionIndex)}
      selected={selectedInversionIndex === inversionIndex}
    >
      {inversionIndex}
    </Button>
  );
};
