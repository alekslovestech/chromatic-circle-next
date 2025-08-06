import { PlaybackState, useAudio } from "@/contexts/AudioContext";
import { Button } from "../Common/Button";

export const PauseScaleButton: React.FC = () => {
  const { playbackState, pauseScalePlayback, resumeScalePlayback } = useAudio();

  const handleClick = () => {
    if (playbackState === PlaybackState.ScalePlaying) {
      console.log("PauseScaleButton: Pausing scale playback...");
      pauseScalePlayback();
    } else if (playbackState === PlaybackState.ScalePaused) {
      console.log("PauseScaleButton: Resuming scale playback...");
      resumeScalePlayback();
    }
  };

  const getButtonText = () => {
    return playbackState === PlaybackState.ScalePaused ? "▶ Resume" : "⏸ Pause";
  };

  if (playbackState === PlaybackState.ScaleComplete) return null;

  return (
    <Button size="md" variant="action" onClick={handleClick}>
      <span style={{ color: "inherit" }}>{getButtonText()}</span>
    </Button>
  );
};
