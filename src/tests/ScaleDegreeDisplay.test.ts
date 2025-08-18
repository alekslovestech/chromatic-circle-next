import { ScaleModeLibrary } from "../types/ScaleModes/ScaleModeLibrary";
import { ScaleModeType } from "../types/enums/ScaleModeType";
import { MusicalKey } from "../types/Keys/MusicalKey";
import { TWELVE } from "../types/constants/NoteConstants";
import { KeyDisplayMode } from "../types/SettingModes";
import { GreekTestConstants } from "./utils/GreekTestConstants";

function verifyScaleDegreeDisplayStrings(
  greekMode: ScaleModeType,
  expectedNotes: string[]
) {
  const greekModeInfo = ScaleModeLibrary.getModeInfo(greekMode);
  const displayStrings = greekModeInfo.getDisplayStrings(
    KeyDisplayMode.ScaleDegree
  );
  expect(displayStrings).toEqual(expectedNotes);
}

function verifyScaleDegreesArray(
  musicalKey: MusicalKey,
  expectedArray: string[]
) {
  expect(expectedArray.length).toBe(TWELVE);

  const displayStrings = musicalKey.getDisplayStringArray(
    KeyDisplayMode.ScaleDegree
  );
  expect(displayStrings).toEqual(expectedArray);
}
describe("Scale Degree Display", () => {
  describe("Greek Mode Patterns", () => {
    const modePatternCases = [
      {
        mode: ScaleModeType.Ionian,
        expected: ["1", "2", "3", "4", "5", "6", "7"],
      },
      {
        mode: ScaleModeType.Dorian,
        expected: ["1", "2", "♭3", "4", "5", "6", "♭7"],
      },
      {
        mode: ScaleModeType.UkrainianDorian,
        expected: ["1", "2", "♭3", "♯4", "5", "6", "♭7"],
      },
      {
        mode: ScaleModeType.Phrygian,
        expected: ["1", "♭2", "♭3", "4", "5", "♭6", "♭7"],
      },
      {
        mode: ScaleModeType.Lydian,
        expected: ["1", "2", "3", "♯4", "5", "6", "7"],
      },
      {
        mode: ScaleModeType.Mixolydian,
        expected: ["1", "2", "3", "4", "5", "6", "♭7"],
      },
      {
        mode: ScaleModeType.Aeolian,
        expected: ["1", "2", "♭3", "4", "5", "♭6", "♭7"],
      },
      {
        mode: ScaleModeType.HarmonicMinor,
        expected: ["1", "2", "♭3", "4", "5", "♭6", "7"],
      },
      {
        mode: ScaleModeType.HungarianMinor,
        expected: ["1", "2", "♭3", "♯4", "5", "♭6", "7"],
      },
      {
        mode: ScaleModeType.Locrian,
        expected: ["1", "♭2", "♭3", "4", "♭5", "♭6", "♭7"],
      },
    ];

    modePatternCases.forEach(({ mode, expected }) => {
      test(`${mode} mode pattern`, () => {
        verifyScaleDegreeDisplayStrings(mode, expected);
      });
    });
  });

  describe("Scale Degree Arrays", () => {
    let constants: GreekTestConstants;

    beforeEach(() => {
      constants = GreekTestConstants.getInstance();
    });

    const scaleCases = [
      {
        desc: "Ionian (Major) Scale",
        cases: [
          {
            key: "C Ionian",
            musicalKey: () => constants.C_IONIAN_KEY,
            expected: ["1", "", "2", "", "3", "4", "", "5", "", "6", "", "7"],
          },
          {
            key: "D Ionian",
            musicalKey: () => constants.D_IONIAN_KEY,
            expected: ["", "7", "1", "", "2", "", "3", "4", "", "5", "", "6"],
          },
        ],
      },
      {
        desc: "Dorian Mode",
        cases: [
          {
            key: "C Dorian",
            musicalKey: () => constants.C_DORIAN_KEY,
            expected: ["1", "", "2", "♭3", "", "4", "", "5", "", "6", "♭7", ""],
          },
          {
            key: "D Dorian",
            musicalKey: () => constants.D_DORIAN_KEY,
            expected: ["♭7", "", "1", "", "2", "♭3", "", "4", "", "5", "", "6"],
          },
        ],
      },
    ];

    scaleCases.forEach(({ desc, cases }) => {
      describe(desc, () => {
        cases.forEach(({ key, musicalKey, expected }) => {
          it(`should display correct scale degrees for ${key}`, () => {
            verifyScaleDegreesArray(musicalKey(), expected);
          });
        });
      });
    });
  });
});
