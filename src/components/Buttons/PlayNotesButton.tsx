import { useAudioPlayer } from "@/components/AudioPlayer";
import { Button } from "../Common/Button";

export const PlayNotesButton: React.FC = () => {
  const { playSelectedNotes } = useAudioPlayer();

  return (
    <Button size="md" variant="action" onClick={playSelectedNotes}>
      Play
    </Button>
  );
};
