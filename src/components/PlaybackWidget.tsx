import React from "react";
import { LAYOUT_PATTERNS } from "@/lib/design";
import { PlayScaleButton } from "./Buttons/PlayScaleButton";
import { PauseScaleButton } from "./Buttons/PauseScaleButton";
import { PlaybackState, useAudio } from "@/contexts/AudioContext";
import { useGlobalMode } from "@/lib/hooks";
import { GlobalMode } from "@/types/enums/GlobalMode";

export const PlaybackWidget: React.FC = () => {
  const { playbackState } = useAudio();
  const globalMode = useGlobalMode();
  return (
    <div className={`${LAYOUT_PATTERNS.centerFlexRowGap} max-w-xs self-center`}>
      <PlayScaleButton />
      {(globalMode === GlobalMode.ChordProgressions ||
        (globalMode === GlobalMode.Scales &&
          playbackState !== PlaybackState.ScaleComplete)) && (
        <PauseScaleButton />
      )}
    </div>
  );
};
