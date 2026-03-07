import { TWELVE } from "@/types/constants/NoteConstants";
import chroma from "chroma-js";

/** Interval class (0–6) → color. Used for chord mixing and any interval-based coloring. */
export const INTERVAL_CLASS_COLORS: Record<
  number,
  ReturnType<typeof chroma>
> = {
  0: chroma(222, 222, 222), // Unison/Octave - Light Gray
  1: chroma(219, 20, 61), // m2 / M7 - Crimson
  2: chroma(255, 166, 0), // M2 / m7 - Orange
  3: chroma(255, 255, 0), // m3 / M6 - Bright Yellow
  4: chroma(30, 185, 165), // M3 / m6 - Teal
  5: chroma(37, 99, 235), // P4 / P5 - Blue
  6: chroma(255, 0, 255), // Tritone - Magenta
};

/** Map semitone interval to interval class (0–6). */
export function intervalClass(semitone: number): number {
  const mod = semitone % TWELVE;
  return Math.min(mod, TWELVE - mod);
}
