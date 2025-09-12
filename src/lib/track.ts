import { InputMode } from "@/types/enums/InputMode";
import { GlobalMode } from "@/types/enums/GlobalMode";
import { ph } from "./ph";

type Ctx = {
  global_mode?: GlobalMode;
  input_mode?: InputMode;
  keyboard_ui?: "linear" | "circular";
};

export function track(name: string, props: Ctx = {}) {
  if (ph.__loaded) {
    ph.capture(name, props);
  } else {
    console.warn("[TRACK] PostHog not loaded, event not sent");
  }
}
