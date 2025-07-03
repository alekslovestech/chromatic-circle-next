import { useDisplay } from "@/contexts/DisplayContext";
import { PlaybackState, useAudio } from "@/contexts/AudioContext";

import { Button } from "../Common/Button";

export const PlayScaleButton: React.FC = () => {
  const { keyTextMode } = useDisplay();
  const { playbackState, startScalePlayback, stopScalePlayback } = useAudio();

  const handleClick = () => {
    if (playbackState === PlaybackState.ScalePlaying) {
      console.log("PlayScaleButton: Stopping scale playback...");
      stopScalePlayback();
    } else {
      startScalePlayback(keyTextMode);
    }
  };

  return (
    <Button size="md" variant="action" onClick={handleClick}>
      {playbackState === PlaybackState.ScalePlaying
        ? "Stop Scale"
        : "Play Scale"}
    </Button>
  );
};
