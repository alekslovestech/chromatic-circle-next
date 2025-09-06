import { TWELVE } from "@/types/constants/NoteConstants";
import { ChromaticIndex, ixChromatic } from "@/types/ChromaticIndex";

import { ColorUtils } from "@/utils/visual/ColorUtils";
import { CartesianPoint, PolarMath } from "@/utils/Keyboard/Circular/PolarMath";

import { useMusical } from "@/contexts/MusicalContext";

import { CIRCLE_RADIUS, useKeyboardHandlers } from "../KeyboardBase";

import { CircularVisualizations } from "./CircularVisualizations";
import { PianoKeyCircular } from "./PianoKeyCircular";
import { CircularVisMode } from "@/types/SettingModes";
import { useIsScalePreviewMode } from "@/lib/hooks/useGlobalMode";
import { chromaticToActual } from "@/types/IndexTypes";

const MAX_RADIUS = 100;
const OUTER_RADIUS = 0.9 * MAX_RADIUS;
const INNER_RADIUS = 0.5 * MAX_RADIUS;

export const KeyboardCircular = () => {
  const { handleKeyClick, checkIsBassNote } = useKeyboardHandlers();
  const { selectedNoteIndices, selectedMusicalKey } = useMusical();
  //const { circularVisMode } = useDisplay();
  const numNotes = selectedNoteIndices.length;
  const circularVisMode =
    numNotes > 2
      ? CircularVisMode.Polygon
      : numNotes === 2
      ? CircularVisMode.Radial
      : CircularVisMode.None;
  const isScales = useIsScalePreviewMode();

  const SCALE_BOUNDARY_EXTENT = OUTER_RADIUS + CIRCLE_RADIUS * 2;
  const VIEWPORT_RADIUS = Math.max(SCALE_BOUNDARY_EXTENT, MAX_RADIUS);
  const coords = [
    -VIEWPORT_RADIUS,
    -VIEWPORT_RADIUS,
    VIEWPORT_RADIUS * 2,
    VIEWPORT_RADIUS * 2,
  ];
  const chordColor = ColorUtils.getChordColor(selectedNoteIndices);

  const getLineCartesianPoints = (
    tonicIndex: ChromaticIndex,
    innerRadius: number,
    outerRadius: number
  ): CartesianPoint[] => {
    const COEFF = 1.05;
    const { startAngle: startOfTonicAngle } =
      PolarMath.NoteIndexToAngleRange(tonicIndex);
    const point_start: CartesianPoint = PolarMath.getCartesianFromPolar(
      innerRadius / COEFF,
      startOfTonicAngle,
      true
    );

    const point_end: CartesianPoint = PolarMath.getCartesianFromPolar(
      outerRadius * COEFF,
      startOfTonicAngle,
      true
    );

    return [point_start, point_end];
  };

  const renderScaleBoundary = () => {
    if (!isScales) return null;
    const [point_start, point_end] = getLineCartesianPoints(
      selectedMusicalKey.tonicIndex,
      INNER_RADIUS,
      OUTER_RADIUS * 0.95
    );

    const { startAngle: startOfTonicAngle } = PolarMath.NoteIndexToAngleRange(
      selectedMusicalKey.tonicIndex
    );
    const point_end_circle = PolarMath.getCartesianFromPolar(
      OUTER_RADIUS + CIRCLE_RADIUS,
      startOfTonicAngle,
      true
    );

    return [
      <g className="scale-boundary circular" key="scale-boundrary-circular">
        <line
          x1={point_start.x}
          y1={point_start.y}
          x2={point_end.x}
          y2={point_end.y}
        />
        <circle
          cx={point_end_circle.x}
          cy={point_end_circle.y}
          r={CIRCLE_RADIUS}
          fill="none"
        />
      </g>,
    ];
  };

  return (
    <svg viewBox={coords.join(" ")} className="svg-container">
      {Array.from({ length: TWELVE }).map((_, index) => {
        const chromaticIndex = ixChromatic(index);
        const actualIndex = chromaticToActual(chromaticIndex); // Need to convert for checkIsRootNote
        const isBassNote = checkIsBassNote(actualIndex);

        return (
          <PianoKeyCircular
            key={index}
            chromaticIndex={chromaticIndex}
            isBassNote={isBassNote} // Rename prop
            onClick={handleKeyClick}
            outerRadius={OUTER_RADIUS}
            innerRadius={INNER_RADIUS}
          />
        );
      })}
      {CircularVisualizations.draw(
        selectedNoteIndices,
        circularVisMode,
        INNER_RADIUS,
        chordColor
      )}
      {renderScaleBoundary()}
    </svg>
  );
};
