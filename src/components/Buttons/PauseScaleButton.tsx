import { PlaybackState, useAudio } from "@/contexts/AudioContext";
import { Button } from "../Common/Button";
import { PauseIcon, ResumeIcon } from "../Icons";

export const PauseScaleButton: React.FC = () => {
  const { playbackState, pauseScalePlayback, resumeScalePlayback } = useAudio();

  const handleClick = () => {
    if (playbackState === PlaybackState.ScalePlaying) {
      pauseScalePlayback();
    } else if (playbackState === PlaybackState.ScalePaused) {
      resumeScalePlayback();
    }
  };

  if (playbackState === PlaybackState.ScaleComplete) return null;

  return (
    <Button size="md" variant="action" onClick={handleClick}>
      {playbackState === PlaybackState.ScalePaused ? (
        <ResumeIcon className="text-playback-scalesMode" />
      ) : (
        <PauseIcon className="text-playback-scalesMode" />
      )}
    </Button>
  );
};
