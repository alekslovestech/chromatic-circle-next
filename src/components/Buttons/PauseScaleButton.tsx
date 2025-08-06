import { PlaybackState, useAudio } from "@/contexts/AudioContext";
import { Button } from "../Common/Button";

export const PauseScaleButton: React.FC = () => {
  const { playbackState, pauseScalePlayback, resumeScalePlayback } = useAudio();

  const handleClick = () => {
    if (playbackState === PlaybackState.ScalePlaying) {
      console.log("PauseScaleButton: Pausing scale playback...");
      pauseScalePlayback(); // Pauses at current position
    } else if (playbackState === PlaybackState.ScalePaused) {
      console.log("PauseScaleButton: Resuming scale playback...");
      resumeScalePlayback(); // Resumes from current position
    }
  };

  const getButtonText = () => {
    if (playbackState === PlaybackState.ScalePaused) {
      return "Resume";
    }
    return "Pause";
  };

  // Only show the button when scale is playing or paused
  if (playbackState === PlaybackState.ScaleComplete) {
    return null;
  }

  return (
    <Button size="md" variant="action" onClick={handleClick}>
      {getButtonText()}
    </Button>
  );
};
