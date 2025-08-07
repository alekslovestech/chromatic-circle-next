import { useAudioPlayer } from "@/components/AudioPlayer";
import { Button } from "../Common/Button";
import { PlayIcon } from "../Icons";
import { PLAYBACK_BUTTON_STYLES } from "@/lib/design/PlaybackButtonStyles";

export const PlayNotesButton: React.FC = () => {
  const { playSelectedNotes } = useAudioPlayer();

  return (
    <Button size="sm" variant="action" onClick={playSelectedNotes}>
      <PlayIcon className={PLAYBACK_BUTTON_STYLES.defaultMode} />
    </Button>
  );
};
