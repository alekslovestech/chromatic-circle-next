import { useAudioPlayer } from "@/components/AudioPlayer";
import { Button } from "../Common/Button";
import { PlayIcon } from "../Icons";

export const PlayNotesButton: React.FC = () => {
  const { playSelectedNotes } = useAudioPlayer();

  return (
    <Button size="sm" variant="action" onClick={playSelectedNotes}>
      <PlayIcon className="text-playback-defaultMode" />
    </Button>
  );
};
