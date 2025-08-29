import { useChordPresets } from "@/contexts/ChordPresetContext";
import { InversionIndex } from "@/types/IndexTypes";
import { Button } from "../Common/Button";

export const InversionButton: React.FC<{ inversionIndex: InversionIndex }> = ({
  inversionIndex,
}) => {
  const { selectedInversionIndex, setSelectedInversionIndex } =
    useChordPresets();

  const handleInversionChange = (newInversionIndex: InversionIndex) => {
    setSelectedInversionIndex(newInversionIndex);
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
