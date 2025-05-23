import { rule, map } from "karabiner_ts";

export function basicModifiers() {
	return rule("Modifiers").manipulators([
		map("caps_lock", "left_command").toHyper().toIfAlone("caps_lock"),
		map("caps_lock").toMeh(),
	]);
}
