"use client";
import React, { useEffect, useRef } from "react";
import { Factory, StaveNote } from "vexflow";

import { getAccidentalSignForEasyScore } from "@/types/AccidentalTypeDisplay";
import { NoteWithOctave } from "@/types/NoteInfo";
import { MusicalKey } from "@/types/Keys/MusicalKey";
import { isMajor } from "@/types/Keys/KeyType";

import { COMMON_STYLES } from "@/lib/design";
import { useBorder } from "@/lib/hooks";
import { useMusical } from "@/contexts/MusicalContext";
import {
  useChordPresets,
  useIsChordsOrIntervals,
} from "@/contexts/ChordPresetContext";

import { SpellingUtils } from "@/utils/SpellingUtils";

interface StaffRendererProps {
  style?: React.CSSProperties;
}

// Only VexFlow-specific functions stay here
const createVexFlowNotesFromNoteWithOctaves = (
  notesWithOctaves: NoteWithOctave[],
  factory: Factory
): StaveNote[] => {
  const keys = notesWithOctaves.map((noteWithOctave, index) => ({
    key: noteWithOctave.formatForVexFlow(),
    accidentalSign: getAccidentalSignForEasyScore(noteWithOctave.accidental),
    index,
  }));

  const chordNote = factory.StaveNote({
    keys: keys.map((k) => k.key),
    duration: "w",
  });

  keys.forEach(({ accidentalSign, index }) => {
    if (accidentalSign) {
      chordNote.addModifier(
        factory.Accidental({ type: accidentalSign }),
        index
      );
    }
  });

  return [chordNote];
};

const getKeySignatureForVex = (musicalKey: MusicalKey) => {
  const pureKey = musicalKey.tonicString;
  const majorMinor = isMajor(musicalKey.classicalMode) ? "" : "m";
  return pureKey + majorMinor;
};

export const StaffRenderer: React.FC<StaffRendererProps> = ({ style }) => {
  const staffDivRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const { selectedNoteIndices, selectedMusicalKey } = useMusical();
  const { selectedChordType, selectedInversionIndex } = useChordPresets();
  const isChordsOrIntervals = useIsChordsOrIntervals();
  const border = useBorder();

  useEffect(() => {
    if (!staffDivRef.current || !containerRef.current) return;

    const staffDiv = staffDivRef.current;
    staffDiv.innerHTML = "";

    const containerWidth = containerRef.current.clientWidth;
    const containerHeight = containerRef.current.clientHeight;

    const factory = new Factory({
      renderer: {
        elementId: staffDiv.id,
        width: containerWidth,
        height: containerHeight,
      },
    });

    const context = factory.getContext();

    const stave = factory.Stave({
      x: 5,
      y: -20,
      width: containerWidth - 10,
    });

    const canonicalIonianKey = selectedMusicalKey.getCanonicalIonianKey();
    stave
      .addClef("treble")
      .addKeySignature(getKeySignatureForVex(canonicalIonianKey));
    stave.setStyle({ strokeStyle: "black" });
    stave.setContext(context).draw();

    if (selectedNoteIndices.length === 0) return;

    // Step 1: Compute NoteWithOctave[] - all context values passed as parameters
    const notesWithOctaves = SpellingUtils.computeStaffNotes(
      selectedNoteIndices,
      canonicalIonianKey,
      selectedChordType,
      selectedInversionIndex,
      isChordsOrIntervals
    );

    // Step 2: Render NoteWithOctave[] to VexFlow - pure rendering logic
    const notes = createVexFlowNotesFromNoteWithOctaves(
      notesWithOctaves,
      factory
    );

    const voice = factory.Voice({ time: "4/4" });
    voice.setStrict(false);
    voice.addTickables(notes);

    factory
      .Formatter()
      .joinVoices([voice])
      .format([voice], containerWidth - 20);
    voice.draw(context, stave);
  }, [
    selectedNoteIndices,
    selectedMusicalKey,
    selectedChordType,
    selectedInversionIndex,
    isChordsOrIntervals,
  ]);

  return (
    <div
      className={`staff-container ${COMMON_STYLES.staff} ${border}`}
      style={style}
      ref={containerRef}
    >
      <div
        className="staff-canvas"
        id="staff"
        ref={staffDivRef}
        style={{
          width: "100%",
          height: "100%",
          overflow: "hidden",
        }}
      />
    </div>
  );
};
