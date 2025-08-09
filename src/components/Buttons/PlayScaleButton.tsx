import { PlaybackState, useAudio } from "@/contexts/AudioContext";
import { Button } from "../Common/Button";
import { PlayIcon, StopIcon } from "../Icons";
import { PLAYBACK_BUTTON_STYLES } from "@/lib/design/PlaybackButtonStyles";

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
        <StopIcon className={PLAYBACK_BUTTON_STYLES.scalesMode} />
      ) : (
        <PlayIcon className={PLAYBACK_BUTTON_STYLES.scalesMode} />
      )}
    </Button>
  );
};
