"use client";
import React, { useEffect, useRef, useCallback } from "react";
import * as Tone from "tone";

import { TWELVE } from "@/types/NoteConstants";
import { ActualIndex } from "@/types/IndexTypes";
import { useGlobalMode } from "@/lib/hooks";

import { useAudio } from "@/contexts/AudioContext";
import { useMusical } from "@/contexts/MusicalContext";

// Base frequency for A4 (440Hz)
const BASE_FREQUENCY = 440;
// A4 is at index 69 in MIDI notation
const A4_MIDI_INDEX = 69;

// Custom hook for audio player functionality
export const useAudioPlayer = () => {
  const synthRef = useRef<Tone.PolySynth | null>(null);
  const { isAudioInitialized, setAudioInitialized } = useAudio();
  const { selectedNoteIndices } = useMusical();
  const globalMode = useGlobalMode();

  // Check if Tone.js is already running and set up user interaction
  useEffect(() => {
    const checkExistingAudio = async () => {
      if (Tone.getContext().state === "running") {
        setAudioInitialized(true);
        return;
      }

      // Otherwise, set up the click handlers as before
      const handleUserInteraction = async () => {
        try {
          if (Tone.getContext().state !== "running") {
            await Tone.start();
            console.log("Tone.js context started");
          }
          setAudioInitialized(true);
          // Remove event listeners after successful initialization
          document.removeEventListener("click", handleUserInteraction);
          document.removeEventListener("touchstart", handleUserInteraction);
        } catch (error) {
          console.error("Failed to initialize audio:", error);
        }
      };

      document.addEventListener("click", handleUserInteraction);
      document.addEventListener("touchstart", handleUserInteraction);

      return () => {
        document.removeEventListener("click", handleUserInteraction);
        document.removeEventListener("touchstart", handleUserInteraction);
      };
    };

    checkExistingAudio();
  }, [setAudioInitialized]);

  // Initialize Tone.js synth
  useEffect(() => {
    let isActive = true;

    const initSynth = async () => {
      try {
        // Create a polyphonic synth
        const synth = new Tone.PolySynth(Tone.Synth, {
          oscillator: {
            type: "fatsine2",
          },
          envelope: {
            attack: 0.02,
            decay: 0.1,
            sustain: 0.3,
            release: 0.8,
          },
        }).toDestination();

        // Set initial volume
        Tone.getDestination().volume.value = -5; // -12 dB (quieter)

        if (isActive) {
          synthRef.current = synth;
        } else {
          synth.dispose();
        }
      } catch (error) {
        console.error("Failed to initialize synth:", error);
      }
    };

    if (isAudioInitialized) {
      initSynth();
    }

    // Clean up on unmount
    return () => {
      isActive = false;
      if (synthRef.current) {
        synthRef.current.dispose();
        synthRef.current = null;
      }
    };
  }, [isAudioInitialized]);

  // Convert note index to frequency
  const getFrequencyFromIndex = useCallback((index: ActualIndex): number => {
    // Convert index to MIDI note number (assuming index 0 is C4)
    const midiNote = index + 60; //  C4 is MIDI note 60
    // Calculate frequency using the formula: f = 440 * 2^((midiNote - 69) / 12)
    return BASE_FREQUENCY * Math.pow(2, (midiNote - A4_MIDI_INDEX) / TWELVE);
  }, []);

  // Play a single note
  const playNote = useCallback(
    (index: ActualIndex) => {
      if (!synthRef.current || !isAudioInitialized) return;

      try {
        const frequency = getFrequencyFromIndex(index);
        synthRef.current.triggerAttackRelease(frequency, "8n.");
      } catch (error) {
        console.error("Failed to play note:", error);
      }
    },
    [getFrequencyFromIndex, isAudioInitialized]
  );

  // Play all selected notes (for manual triggering)
  const playSelectedNotes = useCallback(() => {
    if (!synthRef.current || !isAudioInitialized) return;

    selectedNoteIndices.forEach((index) => {
      playNote(index);
    });
  }, [selectedNoteIndices, playNote, isAudioInitialized]);

  // Handle note changes based on mode (auto-playback)
  useEffect(() => {
    playSelectedNotes();
  }, [selectedNoteIndices, globalMode, playSelectedNotes]);

  // Clean up on unmount
  useEffect(() => {
    return () => {
      if (synthRef.current) {
        synthRef.current.releaseAll();
      }
    };
  }, []);

  return {
    playNote,
    playSelectedNotes,
    isAudioInitialized,
  };
};

// Minimal component just for auto-playback - no UI
export const AudioPlayer: React.FC = () => {
  useAudioPlayer(); // This ensures auto-playback happens
  return null;
};
