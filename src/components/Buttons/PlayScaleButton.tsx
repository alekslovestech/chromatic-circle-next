import { PlaybackState, useAudio } from "@/contexts/AudioContext";
import { Button } from "../Common/Button";
import { PlayIcon, StopIcon } from "../Icons";

export const PlayScaleButton: React.FC = () => {
  const { playbackState, startScalePlayback, stopScalePlayback } = useAudio();

  const isPLayingOrPaused = () =>
    playbackState === PlaybackState.ScalePlaying ||
    playbackState === PlaybackState.ScalePaused;

  const handleClick = () => {
    if (isPLayingOrPaused()) {
      stopScalePlayback();
    } else {
      startScalePlayback();
    }
  };

  return (
    <Button size="md" variant="action" onClick={handleClick}>
      {isPLayingOrPaused() ? (
        <StopIcon className="text-playback-scalesMode" />
      ) : (
        <PlayIcon className="text-playback-scalesMode" />
      )}
    </Button>
  );
};
