export enum InputMode {
  None = "None",
  Freeform = "Freeform",
  SingleNote = "Single Note",
  IntervalPresets = "Intervals",
  ChordPresets = "Chords",
}

export enum ChordDisplayMode {
  Letters = "Letters", // e.g., "Cm", "C°"
  Symbols = "Symbols", // e.g., "C-", "C°"
}

// New enum for internal chord type formatting contexts
export enum ChordTypeContext {
  PresetButton = "PresetButton", // "Maj", "min", "dim", "Aug"
  ChordName = "ChordName", // "", "m", "°", "+"
  LongForm = "LongForm", // "Major Triad", "Minor Triad"
  ElementId = "ElementId", // For HTML IDs
}

export enum CircularVisMode {
  None = "None",
  Radial = "Radial",
  Polygon = "Polygon",
}
