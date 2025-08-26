"use client";
import React, { useEffect, useRef } from "react";
import { Factory } from "vexflow";

import { COMMON_STYLES } from "@/lib/design";
import { useBorder } from "@/lib/hooks";
import { useMusical } from "@/contexts/MusicalContext";
import {
  useChordPresets,
  useIsChordsOrIntervals,
} from "@/contexts/ChordPresetContext";

import { SpellingUtils } from "@/utils/SpellingUtils";
import { VexFlowFormatter } from "@/utils/formatters/VexFlowFormatter";
import { useIsScalePreviewMode } from "@/lib/hooks/useGlobalMode";
import { MusicalDisplayFormatter } from "@/utils/formatters/MusicalDisplayFormatter";

interface StaffRendererProps {
  style?: React.CSSProperties;
}

export const StaffRenderer: React.FC<StaffRendererProps> = ({ style }) => {
  const staffDivRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const { selectedNoteIndices, selectedMusicalKey } = useMusical();
  const { selectedChordType, selectedInversionIndex } = useChordPresets();
  const isScalesMode = useIsScalePreviewMode();
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
    const keySignature =
      VexFlowFormatter.getKeySignatureForVex(canonicalIonianKey);
    stave.addClef("treble").addKeySignature(keySignature);
    stave.setStyle({ strokeStyle: "black" });
    stave.setContext(context).draw();

    if (selectedNoteIndices.length === 0) return;

    // Step 1: Compute NoteWithOctave[] - all context values passed as parameters
    const isChordPresetKnown =
      !isScalesMode &&
      SpellingUtils.isChordPresetKnown(selectedChordType, isChordsOrIntervals);

    const notesWithOctaves = isChordPresetKnown
      ? SpellingUtils.computeNotesFromChordPreset(
          selectedNoteIndices,
          MusicalDisplayFormatter.getMatchFromIndices(selectedNoteIndices)
        )
      : SpellingUtils.computeNotesFromMusicalKey(
          selectedNoteIndices,
          canonicalIonianKey
        );

    // Step 2: Render NoteWithOctave[] to VexFlow - pure rendering logic
    const notes = VexFlowFormatter.createVexFlowNotesFromNoteWithOctaves(
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
    isScalesMode,
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
