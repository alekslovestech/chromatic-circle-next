"use client";
import { ixActualArray } from "../types/IndexTypes";
import { IndexUtils } from "../utils/IndexUtils";
import { useMusical } from "../contexts/MusicalContext";
import { Button } from "./Common/Button";

// This component is used to transpose the selected notes OR the musical key.
export const TransposeWidget: React.FC<{ showKeyTranspose: boolean }> = ({
  showKeyTranspose = false,
}) => {
  const {
    selectedNoteIndices,
    setSelectedNoteIndices,
    selectedMusicalKey,
    setSelectedMusicalKey,
  } = useMusical();

  const handleSelectedNotesTranspose = (amount: number) => {
    const transposedIndices = ixActualArray(
      IndexUtils.shiftIndices(selectedNoteIndices, amount)
    );
    setSelectedNoteIndices(transposedIndices);
  };

  const handleMusicalKeyTranspose = (amount: number) => {
    const newKey = selectedMusicalKey.getTransposedKey(amount);
    setSelectedMusicalKey(newKey);
  };

  const VARIANT_TRANSPOSE_BUTTON = "action";
  const DENSITY_TRANSPOSE_BUTTON = "compact";
  const SIZE_TRANSPOSE_BUTTON = "sm";

  return (
    <div>
      <div className="transpose-buttons-container">
        {!showKeyTranspose && (
          <>
            <Button
              id="transpose-up-button"
              variant={VARIANT_TRANSPOSE_BUTTON}
              density={DENSITY_TRANSPOSE_BUTTON}
              size={SIZE_TRANSPOSE_BUTTON}
              onClick={() => handleSelectedNotesTranspose(1)}
              title="Transpose selected notes up"
            >
              ↑♫↑
            </Button>
            <Button
              id="transpose-down-button"
              variant={VARIANT_TRANSPOSE_BUTTON}
              density={DENSITY_TRANSPOSE_BUTTON}
              size={SIZE_TRANSPOSE_BUTTON}
              onClick={() => handleSelectedNotesTranspose(-1)}
              title="Transpose selected notes down"
            >
              ↓♫↓
            </Button>
          </>
        )}

        {showKeyTranspose && (
          <>
            <Button
              id="musicalkey-up-button"
              variant={VARIANT_TRANSPOSE_BUTTON}
              density={DENSITY_TRANSPOSE_BUTTON}
              size={SIZE_TRANSPOSE_BUTTON}
              onClick={() => handleMusicalKeyTranspose(1)}
              title="Transpose musical key up"
            >
              ↑𝄞↑
            </Button>
            <Button
              id="musicalkey-down-button"
              variant={VARIANT_TRANSPOSE_BUTTON}
              density={DENSITY_TRANSPOSE_BUTTON}
              size={SIZE_TRANSPOSE_BUTTON}
              onClick={() => handleMusicalKeyTranspose(-1)}
              title="Transpose musical key down"
            >
              ↓𝄞↓
            </Button>
          </>
        )}
      </div>
    </div>
  );
};
