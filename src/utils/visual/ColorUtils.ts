import { ActualIndex } from "@/types/IndexTypes";
import { IntervalDistance } from "@/types/IntervalClass";
import chroma from "chroma-js";
import { IntervalUtils } from "@/utils/IntervalUtils";
import {
  INTERVAL_CLASS_COLORS,
  INTERVAL_CLASS_DISSONANCE,
  intervalClass,
} from "@/utils/visual/IntervalClassColors";

/** Max extra weight for the first interval in sortedPcs order; decays linearly to 0 for the last. Increase to make chord type (e.g. major vs minor) more distinguishable. */
const ORDER_WEIGHT_MAX = 1.0;

export class ColorUtils {
  static getChordColor(indices: ActualIndex[]): string {
    const cyclicIntervals = IntervalUtils.cyclicIntervalsFromActualIndices(indices);
    const mixcolor = this.mixChordColor(cyclicIntervals, "lch");
    return mixcolor.css();
  }

  private static mixChordColor(
    intervals: IntervalDistance[],
    colorFormat: chroma.ColorFormat,
  ): chroma.Color {
    if (intervals.length === 0) return INTERVAL_CLASS_COLORS[0];
    const { colors, weights } = this.colorsAndWeightsForIntervals(intervals);
    return this.mixColors(colors, weights, colorFormat);
  }

  private static colorsAndWeightsForIntervals(intervals: IntervalDistance[]): {
    colors: chroma.Color[];
    weights: number[];
  } {
    const n = intervals.length;
    const colors: chroma.Color[] = [];
    const weights: number[] = [];

    // Precompute unique intervals by interval class, keeping first occurrence for order weighting.
    const deduped = IntervalUtils.dedupIntervals(intervals);

    deduped.forEach((interval, i) => {
      const ic = intervalClass(interval);
      colors.push(INTERVAL_CLASS_COLORS[ic]);
      const dissonanceWeight = 1 + INTERVAL_CLASS_DISSONANCE[ic];
      const orderWeight =
        n > 1 ? (ORDER_WEIGHT_MAX * (n - 1 - i)) / (n - 1) : 0;
      weights.push(dissonanceWeight + orderWeight);
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
