import { Button } from "../Common/Button";

export const GlobalModeButton: React.FC<{
  text: string;
}> = ({ text }) => {
  return (
    <Button size="md" variant="global" density="comfortable">
      {text}
    </Button>
  );
};
