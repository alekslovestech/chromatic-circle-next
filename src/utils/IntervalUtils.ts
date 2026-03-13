import {
  ChromaticIndex,
  makeChromaticIndex,
  subChromatic,
} from "@/types/ChromaticIndex";
import { ActualIndex } from "@/types/IndexTypes";
import { IntervalClass, IntervalDistance, ixIntervalDistance } from "@/types/IntervalClass";
import { intervalClass } from "@/utils/visual/IntervalClassColors";

export class IntervalUtils {
  static cyclicIntervalsFromActualIndices(
    indices: ActualIndex[],
  ): IntervalDistance[] {
    const pcs = indices.map((index) => makeChromaticIndex(index));
    const sortedPcs = pcs.sort((a, b) => a - b);
    return this.cyclicIntervals(sortedPcs);
  }

  private static cyclicIntervals(
    sortedPcs: ChromaticIndex[],
  ): IntervalDistance[] {
    if (sortedPcs.length <= 1) return [];

    const intervals: IntervalDistance[] = [];
    const len = sortedPcs.length;

    for (let i = 0; i < len; i++) {
      const current = sortedPcs[i];
      const next = sortedPcs[(i + 1) % len];
      const diff = ixIntervalDistance(subChromatic(next, current));
      intervals.push(diff);
    }

    const minInterval = Math.min(...intervals) as IntervalDistance;
    const startIndex = intervals.indexOf(minInterval);

    const reordered: IntervalDistance[] = [];
    for (let i = 0; i < len; i++) {
      reordered.push(intervals[(startIndex + i) % len]);
    }

    if (len >= 4) {
      const diagonalIntervals: IntervalDistance[] = [];
      const diagonalCount = Math.floor(len / 2);
      for (let i = 0; i < diagonalCount; i++) {
        const currentInterval = intervals[(startIndex + i) % len];
        const nextInterval = intervals[(startIndex + i + 1) % len];
        const semitones = (currentInterval + nextInterval) as IntervalDistance;
        diagonalIntervals.push(semitones);
      }
      diagonalIntervals.sort((a, b) => a - b);
      reordered.push(...diagonalIntervals);
    }

    return reordered;
  }

  static dedupIntervals(intervals: IntervalDistance[]): IntervalDistance[] {
    const seen = new Set<IntervalClass>();
    const deduped: IntervalDistance[] = [];
    intervals.forEach((interval) => {
      const ic = intervalClass(interval);
      if (!seen.has(ic)) {
        seen.add(ic);
        deduped.push(interval);
      }
    });
    return deduped;
  }
}
