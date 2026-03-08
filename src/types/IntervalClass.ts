export type IntervalClass = 0 | 1 | 2 | 3 | 4 | 5 | 6;

export function ixIntervalClass(n: number): IntervalClass {
  if (n < 0 || n > 6 || !Number.isInteger(n))
    throw new Error("Invalid IntervalClass=" + n);
  return n as IntervalClass;
}
