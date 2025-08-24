import { TWELVE } from "./constants/NoteConstants";
type Branded<K, T> = K & { __brand: T };

export type ChromaticIndex = Branded<number, "ChromaticIndex">;

//only valid inputs are 0-11
export const ixChromatic = (n: number): ChromaticIndex => {
  if (n < 0 || n > TWELVE || !Number.isInteger(n)) {
    throw new Error("Invalid ChromaticIndex " + n);
  }
  return n as ChromaticIndex;
};

//same as above but any input is valid
export function makeChromaticIndex(n: number): ChromaticIndex {
  return ixChromatic((n + TWELVE) % TWELVE);
}

export function addChromatic(a: number, b: number): ChromaticIndex {
  return makeChromaticIndex(a + b);
}

export function subChromatic(a: number, b: number): ChromaticIndex {
  return makeChromaticIndex(a - b);
}
