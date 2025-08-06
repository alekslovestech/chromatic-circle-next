import { PlaybackState, useAudio } from "@/contexts/AudioContext";
import { Button } from "../Common/Button";

export const PlayScaleButton: React.FC = () => {
  const { playbackState, startScalePlayback, stopScalePlayback } = useAudio();

  const handleClick = () => {
    if (
      playbackState === PlaybackState.ScalePlaying ||
      playbackState === PlaybackState.ScalePaused
    ) {
      console.log("PlayScaleButton: Stopping scale playback...");
      stopScalePlayback(); // This resets to beginning
    } else {
      console.log("PlayScaleButton: Starting scale playback...");
      startScalePlayback(); // This starts from beginning
    }
  };

  const getButtonText = () => {
    if (
      playbackState === PlaybackState.ScalePlaying ||
      playbackState === PlaybackState.ScalePaused
    ) {
      return "Stop Scale";
    }
    return "Play Scale";
  };

  return (
    <Button size="md" variant="action" onClick={handleClick}>
      {getButtonText()}
    </Button>
  );
};
