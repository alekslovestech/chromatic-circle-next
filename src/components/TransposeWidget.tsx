"use client";
import { ixActualArray } from "@/types/IndexTypes";
import { IndexUtils } from "@/utils/IndexUtils";
import { useMusical } from "@/contexts/MusicalContext";

import { Button } from "./Common/Button";

type TransposeDirection = "up" | "down";
type TransposeTarget = "key" | "notes";
interface TransposeButtonProps {
  direction: TransposeDirection;
  target: TransposeTarget;
}

const TransposeButton: React.FC<TransposeButtonProps> = ({
  direction,
  target,
}) => {
  const arrow = direction === "up" ? "↑" : "↓";
  const amount = direction === "up" ? 1 : -1;
  const symbol = target === "notes" ? "♫" : "𝄞";
  const title = `Transpose ${target} ${direction}`;
  const {
    selectedNoteIndices,
    setSelectedNoteIndices,
    selectedMusicalKey,
    setSelectedMusicalKey,
  } = useMusical();

  const onClick = () => {
    if (target === "notes") {
      // Transpose selected notes
      const transposedIndices = ixActualArray(
        IndexUtils.shiftIndices(selectedNoteIndices, amount)
      );
      setSelectedNoteIndices(transposedIndices);
    } else {
      // Transpose musical key
      const newKey = selectedMusicalKey.getTransposedKey(amount);
      setSelectedMusicalKey(newKey);
    }
  };

  return (
    <Button
      id={`transpose-${direction}-button`}
      variant="action"
      size="sm"
      onClick={onClick}
      title={title}
    >
      {`${arrow}${symbol}${arrow}`}
    </Button>
  );
};

// This component is used to transpose the selected notes OR the musical key.
export const TransposeWidget: React.FC<{ showKeyTranspose: boolean }> = ({
  showKeyTranspose = false,
}) => {
  return (
    <div>
      <div className="transpose-buttons-container">
        {!showKeyTranspose && (
          <>
            <TransposeButton direction="up" target="notes" />
            <TransposeButton direction="down" target="notes" />
          </>
        )}

        {showKeyTranspose && (
          <>
            <TransposeButton direction="up" target="key" />
            <TransposeButton direction="down" target="key" />
          </>
        )}
      </div>
    </div>
  );
};
