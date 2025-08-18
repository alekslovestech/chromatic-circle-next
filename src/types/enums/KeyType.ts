export enum KeyType {
  Major = "Major",
  Minor = "Minor",
}

export function isMajor(keyType: KeyType): boolean {
  return keyType === KeyType.Major;
}
