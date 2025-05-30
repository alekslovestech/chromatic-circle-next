import { GlobalMode, useGlobal } from "@/contexts/GlobalContext";
import { Button } from "../Common/Button";
import Link from "next/link";

export const GlobalModeButton: React.FC = () => {
  const { globalMode, setGlobalMode } = useGlobal();

  return (
    <Link href={globalMode === GlobalMode.Default ? "/advanced" : "/default"}>
      <Button size="md" variant="global" density="comfortable">
        {globalMode === GlobalMode.Default
          ? "Switch to Scale Preview Mode"
          : "Switch to Basic Mode"}
      </Button>
    </Link>
  );
};
