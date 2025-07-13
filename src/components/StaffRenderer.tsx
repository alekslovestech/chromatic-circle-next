"use client";
import React, { useEffect, useRef } from "react";
import { Factory, StaveNote } from "vexflow";

import { getAccidentalSignForEasyScore } from "@/types/AccidentalType";
import {
  ActualIndex,
  actualIndexToChromaticAndOctave,
} from "@/types/IndexTypes";
import { MusicalKey } from "@/types/Keys/MusicalKey";
import { isMajor } from "@/types/Keys/KeyType";
import { KeyNoteResolver } from "@/types/Keys/KeyNoteResolver";

import { COMMON_STYLES, DEBUG_BORDER } from "@/lib/design";
import { useMusical } from "@/contexts/MusicalContext";

interface StaffRendererProps {
  style?: React.CSSProperties;
}

const EasyScoreFromNotes = (
  actualIndices: ActualIndex[],
  selectedMusicalKey: MusicalKey,
  factory: Factory
): StaveNote[] => {
  const keys = actualIndices.map((actualIndex) => {
    const { chromaticIndex, octaveOffset } =
      actualIndexToChromaticAndOctave(actualIndex);
    const noteInfo = KeyNoteResolver.resolveNoteInKey(
      selectedMusicalKey,
      chromaticIndex
    );
    return {
      key: `${noteInfo.noteName}/${4 + octaveOffset}`,
      accidentalSign: getAccidentalSignForEasyScore(noteInfo.accidental),
      index: actualIndices.indexOf(actualIndex),
    };
  });

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

    // Let VexFlow determine the appropriate width based on content
    const stave = factory.Stave({
      x: 5,
      y: -20, // VexFlow internal offset compensation
      width: 200,
    });

    const canonicalIonianKey = selectedMusicalKey.getCanonicalIonianKey();
    stave
      .addClef("treble")
      .addKeySignature(getKeySignatureForVex(canonicalIonianKey));
    stave.setStyle({ strokeStyle: "black" });
    stave.setContext(context).draw();

    if (selectedNoteIndices.length === 0) return;

    const notes = EasyScoreFromNotes(
      selectedNoteIndices,
      canonicalIonianKey,
      factory
    );
    const voice = factory.Voice({ time: "4/4" });
    voice.setStrict(false);
    voice.addTickables(notes);

    factory.Formatter().joinVoices([voice]).format([voice], 200);
    voice.draw(context, stave);
  }, [selectedNoteIndices, selectedMusicalKey]);

  return (
    <div
      className={`staff-container ${COMMON_STYLES.staff} ${DEBUG_BORDER}`}
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
        }}
      />
    </div>
  );
};
