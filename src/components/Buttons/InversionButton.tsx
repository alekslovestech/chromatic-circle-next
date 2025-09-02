import { InversionIndex } from "@/types/IndexTypes";
import { Button } from "../Common/Button";
import { useMusical } from "@/contexts/MusicalContext";

export const InversionButton: React.FC<{ inversionIndex: InversionIndex }> = ({
  inversionIndex,
}) => {
  const { currentChordRef, setChordInversion } = useMusical();

  if (!currentChordRef) return null;
  const handleInversionChange = (newInversionIndex: InversionIndex) => {
    setChordInversion(newInversionIndex);
  };

  return (
    <Button
      id={`inversion-${inversionIndex}`}
      key={inversionIndex}
      size="sm"
      variant="option"
      onClick={() => handleInversionChange(inversionIndex)}
      selected={currentChordRef!.inversionIndex === inversionIndex}
    >
      {inversionIndex}
    </Button>
  );
};
