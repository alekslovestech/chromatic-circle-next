import { PlaybackState, useAudio } from "@/contexts/AudioContext";
import { Button } from "../Common/Button";

export const PlayScaleButton: React.FC = () => {
  const { playbackState, startScalePlayback, stopScalePlayback } = useAudio();

  const handleClick = () => {
    if (playbackState === PlaybackState.ScalePlaying) {
      console.log("PlayScaleButton: Stopping scale playback...");
      stopScalePlayback();
    } else {
      startScalePlayback();
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
