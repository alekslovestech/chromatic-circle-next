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
    const mixcolor = this.mixChordColor(cyclicIntervals, "lch");
    return mixcolor.css();
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

    if (len >= 4) {
      const diagonalIntervals: number[] = [];
      const diagonalCount = Math.floor(len / 2); // Only unique diagonals
      for (let i = 0; i < diagonalCount; i++) {
        const semitone = intervalClass(
          subChromatic(sortedPcs[(i + 2) % len], sortedPcs[i]),
        );
        diagonalIntervals.push(semitone);
      }
      diagonalIntervals.sort((a, b) => a - b);
      reordered.push(...diagonalIntervals);
    }

    return reordered;
  }

  private static mixChordColor(
    intervals: number[],
    colorFormat: chroma.ColorFormat,
  ): chroma.Color {
    if (intervals.length === 0) return INTERVAL_CLASS_COLORS[0];
    const { colors, weights } = this.colorsAndWeightsForIntervals(intervals);
    return this.mixColors(colors, weights, colorFormat);
  }

  private static colorsAndWeightsForIntervals(intervals: number[]): {
    colors: chroma.Color[];
    weights: number[];
  } {
    const colors = intervals.map(
      (interval) => INTERVAL_CLASS_COLORS[intervalClass(interval)],
    );
    // Order weight: higher for intervals earlier in the cyclic order.
    // Harshness weight: based on dissonance curve (1 = consonant, up to 2 for most dissonant).
    const weights = intervals.map((interval, i) => {
      const orderWeight = intervals.length - i;
      return orderWeight;
    });
    return { colors, weights };
  }

  private static mixColors(
    colors: chroma.Color[],
    weights: number[],
    colorFormat: chroma.ColorFormat,
  ): chroma.Color {
    if (colors.length === 0) return INTERVAL_CLASS_COLORS[0];
    if (colors.length === 1) return colors[0];
    return colorFormat === "lch"
      ? this.mixColorsLCH(colors, weights)
      : this.mixColorsRGB(colors, weights);
  }

  private static mixColorsRGB(
    colors: chroma.Color[],
    weights: number[],
  ): chroma.Color {
    let rgbSum: [number, number, number] = [0, 0, 0];
    let totalWeight = 0;
    colors.forEach((color, i) => {
      const [r, g, b] = color.rgb();
      const w = weights[i];
      rgbSum[0] += r * w;
      rgbSum[1] += g * w;
      rgbSum[2] += b * w;
      totalWeight += w;
    });
    return chroma.rgb(
      rgbSum[0] / totalWeight,
      rgbSum[1] / totalWeight,
      rgbSum[2] / totalWeight,
    );
  }

  private static mixColorsLCH(
    colors: chroma.Color[],
    weights: number[],
  ): chroma.Color {
    let lSum = 0;
    let cSum = 0;
    let hxSum = 0;
    let hySum = 0;
    let totalWeight = 0;
    colors.forEach((color, i) => {
      const [L, C, H] = color.lch();
      const w = weights[i];
      const hRad = (H * Math.PI) / 180;
      lSum += L * w;
      cSum += C * w;
      hxSum += Math.cos(hRad) * w;
      hySum += Math.sin(hRad) * w;
      totalWeight += w;
    });
    const L = lSum / totalWeight;
    const C = cSum / totalWeight;
    const H = (Math.atan2(hySum, hxSum) * 180) / Math.PI;
    return chroma.lch(L, C, H < 0 ? H + 360 : H);
  }
}
