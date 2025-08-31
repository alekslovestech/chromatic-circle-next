// Learn more: https://github.com/testing-library/jest-dom
import "@testing-library/jest-dom";

// Mock Tone.js to prevent ES module issues in Jest
jest.mock("tone", () => ({
  PolySynth: jest.fn().mockImplementation(() => ({
    connect: jest.fn(),
    disconnect: jest.fn(),
    triggerAttackRelease: jest.fn(),
    dispose: jest.fn(),
  })),
  Destination: {
    connect: jest.fn(),
  },
  getContext: jest.fn().mockReturnValue({
    state: "running",
    resume: jest.fn().mockResolvedValue(undefined),
  }),
  start: jest.fn().mockResolvedValue(undefined),
}));
