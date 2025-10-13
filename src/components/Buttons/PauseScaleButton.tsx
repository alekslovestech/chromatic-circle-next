import { PlaybackState, useAudio } from "@/contexts/AudioContext";
import { Button } from "../Common/Button";
import { PauseIcon, ResumeIcon } from "../Icons";
import { PLAYBACK_BUTTON_STYLES } from "@/lib/design/PlaybackButtonStyles";

export const PauseScaleButton: React.FC = () => {
  const { playbackState, pauseScalePlayback, resumeScalePlayback } = useAudio();

  const handleClick = () => {
    if (playbackState === PlaybackState.ScalePlaying) {
      pauseScalePlayback();
    } else if (playbackState === PlaybackState.ScalePaused) {
      resumeScalePlayback();
    }
  };

  return (
    <Button size="md" variant="action" onClick={handleClick}>
      {playbackState === PlaybackState.ScalePaused ? (
        <ResumeIcon className={PLAYBACK_BUTTON_STYLES.scalesMode} />
      ) : (
        <PauseIcon className={PLAYBACK_BUTTON_STYLES.scalesMode} />
      )}
    </Button>
  );
};
