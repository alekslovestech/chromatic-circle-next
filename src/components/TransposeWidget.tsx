"use client";
import { ixActualArray } from "@/types/IndexTypes";
import { IndexUtils } from "@/utils/IndexUtils";
import { useMusical } from "@/contexts/MusicalContext";
import { useIsFreeformMode } from "@/contexts/ChordPresetContext";

import { Button } from "./Common/Button";
import { TYPOGRAPHY } from "@/lib/design";
import { makeChordReference } from "@/types/interfaces/ChordReference";
import { addChromatic } from "@/types/ChromaticIndex";

type TransposeDirection = "up" | "down";
export type TransposeTarget = "key" | "notes";
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
  const isFreeformMode = useIsFreeformMode();
  const {
    selectedNoteIndices,
    selectedMusicalKey,
    setSelectedMusicalKey,
    currentChordRef,
    setCurrentChordRef,
    setNotesDirectly,
  } = useMusical();

  const onClick = () => {
    if (target === "notes") {
      // Transpose selected notes
      const transposedIndices = ixActualArray(
        IndexUtils.shiftIndices(selectedNoteIndices, amount)
      );

      if (isFreeformMode) {
        // In freeform mode, directly update the selected notes
        setNotesDirectly(transposedIndices);
      } else if (currentChordRef && transposedIndices.length > 0) {
        // In preset mode, update chord reference to match transposed notes
        const oldRoot = currentChordRef.rootNote;
        const newRoot = addChromatic(oldRoot, amount);
        const updatedChordRef = makeChordReference(
          newRoot,
          currentChordRef.id,
          currentChordRef.inversionIndex
        );
        setCurrentChordRef(updatedChordRef);
      }
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
      size="md"
      onClick={onClick}
      title={title}
    >
      {`${arrow}${symbol}${arrow}`}
    </Button>
  );
};

// This component is used to transpose the selected notes OR the musical key.
export const TransposeWidget: React.FC<{
  target: TransposeTarget;
  label?: string;
}> = ({ target, label }) => {
  const flexDirection = /*target === "notes" ? "flex-col" : */ "flex-row";
  return (
    <div>
      {label && <div className={`${TYPOGRAPHY.displayText}`}>{label}</div>}
      <div
        className={`transpose-buttons-container flex ${flexDirection} gap-2`}
      >
        <TransposeButton direction="up" target={target} />
        <TransposeButton direction="down" target={target} />
      </div>
    </div>
  );
};
