import { rule, map } from "karabiner.ts";

export function basicModifiers() {
	return rule("Modifiers").manipulators([
		map("caps_lock", "left_command").toHyper().toIfAlone("caps_lock"),
		map("caps_lock").toMeh().toIfAlone("escape"),
	]);
}
