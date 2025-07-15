import { useAudioPlayer } from "@/components/AudioPlayer";
import { Button } from "../Common/Button";

export const PlayNotesButton: React.FC = () => {
  const { playSelectedNotes } = useAudioPlayer();

  return (
    <Button size="sm" variant="action" onClick={playSelectedNotes}>
      Play
    </Button>
  );
};
