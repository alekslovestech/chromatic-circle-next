import { makeChromaticIndex, subChromatic } from "@/types/ChromaticIndex";
import { ActualIndex } from "@/types/IndexTypes";
import chroma from "chroma-js";
import {
  INTERVAL_CLASS_COLORS,
  intervalClass,
} from "@/utils/visual/IntervalClassColors";

export class ColorUtils {
  static getChordColor(indices: ActualIndex[]): string {
    const cyclicIntervals = this.cyclicIntervalsFromActualIndices(indices);
    const mixcolor = this.mixChordColor(cyclicIntervals);
    const [r, g, b] = mixcolor.rgb().map((c: number) => Math.round(c));
    return chroma(r, g, b).css();
  }

  static cyclicIntervalsFromActualIndices(indices: number[]): number[] {
    const pcs = indices.map((index) => makeChromaticIndex(index));
    const sortedPcs = pcs.sort((a, b) => a - b);
    return this.cyclicIntervals(sortedPcs);
  }

  private static cyclicIntervals(sortedPcs: number[]): number[] {
    if (sortedPcs.length <= 1) return [];

    const intervals: number[] = [];
    const len = sortedPcs.length;

    // Calculate all intervals first
    for (let i = 0; i < len; i++) {
      const current = sortedPcs[i];
      const next = sortedPcs[(i + 1) % len];
      const diff = subChromatic(next, current);
      intervals.push(diff);
    }

    // Find the smallest interval and its index
    let minInterval = Math.min(...intervals);
    let startIndex = intervals.indexOf(minInterval);

    // Reorder intervals starting from the smallest, maintaining cyclic order
    const reordered: number[] = [];
    for (let i = 0; i < len; i++) {
      reordered.push(intervals[(startIndex + i) % len]);
    }

    return reordered;
  }

  private static mixChordColor(intervals: number[]): ReturnType<typeof chroma> {
    if (intervals.length === 0) return INTERVAL_CLASS_COLORS[0]; // Unison for empty intervals

    let rgbSum = [0, 0, 0] as [number, number, number];
    let totalWeight = 0;

    intervals.forEach((interval, i) => {
      const iclass = intervalClass(interval);
      const [r, g, b] = INTERVAL_CLASS_COLORS[iclass].rgb();
      const weight = intervals.length - i;

      rgbSum[0] += r * weight;
      rgbSum[1] += g * weight;
      rgbSum[2] += b * weight;
      totalWeight += weight;
    });

    return chroma(
      rgbSum[0] / totalWeight,
      rgbSum[1] / totalWeight,
      rgbSum[2] / totalWeight,
    );
  }
}
