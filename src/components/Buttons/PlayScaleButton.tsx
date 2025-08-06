import { PlaybackState, useAudio } from "@/contexts/AudioContext";
import { Button } from "../Common/Button";

export const PlayScaleButton: React.FC = () => {
  const { playbackState, startScalePlayback, stopScalePlayback } = useAudio();

  const isPLayingOrPaused = () =>
    playbackState === PlaybackState.ScalePlaying ||
    playbackState === PlaybackState.ScalePaused;

  const handleClick = () => {
    if (isPLayingOrPaused()) {
      console.log("PlayScaleButton: Stopping scale playback...");
      stopScalePlayback(); // This resets to beginning
    } else {
      console.log("PlayScaleButton: Starting scale playback...");
      startScalePlayback(); // This starts from beginning
    }
  };

  const getButtonText = () => {
    return isPLayingOrPaused() ? "■ Stop" : "▶ Play";
  };

  return (
    <Button size="md" variant="action" onClick={handleClick}>
      <span style={{ color: "inherit" }}>{getButtonText()}</span>
    </Button>
  );
};
