// Learn more: https://github.com/testing-library/jest-dom
import "@testing-library/jest-dom";

// Mock Tone.js to prevent ES module issues in Jest
jest.mock("tone", () => ({
  PolySynth: jest.fn().mockImplementation(() => ({
    connect: jest.fn(),
    disconnect: jest.fn(),
    triggerAttackRelease: jest.fn(),
    dispose: jest.fn(),
    toDestination: jest.fn().mockReturnThis(),
    releaseAll: jest.fn(),
  })),
  Synth: jest.fn(), // Add this since it's referenced in PolySynth constructor
  Destination: {
    connect: jest.fn(),
  },
  getContext: jest.fn().mockReturnValue({
    state: "running",
    resume: jest.fn().mockResolvedValue(undefined),
    lookAhead: 0.05,
  }),
  getDestination: jest.fn().mockReturnValue({
    volume: {
      value: 0,
    },
  }),
  start: jest.fn().mockResolvedValue(undefined),
}));
