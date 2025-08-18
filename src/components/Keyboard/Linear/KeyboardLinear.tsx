import { useRef } from "react";

import { TWENTY4 } from "@/types/constants/NoteConstants";
import { ActualIndex } from "@/types/IndexTypes";
import { LinearKeyboardUtils } from "@/utils/Keyboard/Linear/LinearKeyboardUtils";
import { useIsScalePreviewMode } from "@/lib/hooks/useGlobalMode";

import { useKeyboardHandlers } from "@/components/Keyboard/KeyboardBase";
import { PianoKeyLinear } from "@/components/Keyboard/Linear/PianoKeyLinear";
import { useMusical } from "@/contexts/MusicalContext";

export const KeyboardLinear = () => {
  const { handleKeyClick, checkIsRootNote } = useKeyboardHandlers();
  const { selectedMusicalKey } = useMusical();
  const containerRef = useRef<HTMLDivElement>(null);

  const isScales = useIsScalePreviewMode();
  /* eslint-disable @typescript-eslint/no-unused-vars */
  const renderScaleBoundary = () => {
    if (!isScales) return null;

    const { x1, x2 } = LinearKeyboardUtils.calculateScaleBoundaryPercentages(
      selectedMusicalKey.tonicIndex
    );

    const startY = 90;
    const endY = 100;
    const circleCenterY = 105;
    // Create a vertical line at the tonic position - in both scales
    return (
      <svg
        className="scale-boundary-svg"
        viewBox="0 -10 100 110"
        preserveAspectRatio="none"
      >
        <line
          className="scale-boundary linear"
          key="scale-boundrary-left"
          x1={x1}
          y1={startY}
          x2={x1}
          y2={endY}
          vectorEffect="non-scaling-stroke"
        />
        <line
          className="scale-boundary linear"
          key="scale-boundrary-right"
          x1={x2}
          y1={startY}
          x2={x2}
          y2={endY}
          vectorEffect="non-scaling-stroke"
        />
        <circle
          key="scale-boundrary-left-circle"
          cx={x1}
          cy={circleCenterY}
          r={3}
          fill="none"
          stroke="black"
          vectorEffect="non-scaling-stroke"
        />
        <circle
          key="scale-boundrary-right-circle"
          cx={x2}
          cy={circleCenterY}
          r={3}
          fill="none"
          stroke="black"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
    );
  };

  const keys = [];
  for (
    let actualIndex = 0 as ActualIndex;
    actualIndex < TWENTY4;
    actualIndex++
  ) {
    const isRootNote = checkIsRootNote(actualIndex);

    keys.push(
      <PianoKeyLinear
        key={actualIndex}
        actualIndex={actualIndex}
        isRootNote={isRootNote}
        onClick={handleKeyClick}
      />
    );
  }
  /*const testElement = (
    <div className="bg-red-500 text-white p-4">TAILWIND TEST</div>
  );
  keys.push(testElement);*/

  return (
    <div ref={containerRef} className="keyboardlinear">
      {/*renderScaleBoundary()}*/}
      <div className="keyboard-inner">{keys}</div>
    </div>
  );
};
