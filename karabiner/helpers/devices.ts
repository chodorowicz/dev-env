import { ifDevice } from "karabiner.ts";

export function isBuiltInKeyboard() {
	return ifDevice({ is_built_in_keyboard: true });
}
