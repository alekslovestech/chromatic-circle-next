import { InputMode } from "@/types/enums/InputMode";
import { GlobalMode } from "@/types/enums/GlobalMode";
import { ph } from "./ph";

type Ctx = {
  global_mode?: GlobalMode;
  input_mode?: InputMode;
  keyboard_ui?: "linear" | "circular";
};

export function track(name: string, props: Ctx = {}) {
  ph.capture(name, props);
}
