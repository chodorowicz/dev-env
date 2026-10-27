import { rule, map } from "karabiner.ts";

/**
 * Tap right ⌘ alone -> ⌘Tab (toggle to the most recent app).
 * Holding right ⌘ still acts as a plain modifier (used by the app launcher chords).
 */
export function rightCommandToCommandTab() {
	return rule("Right Command tap to Command Tab").manipulators([
		map("right_command").to("right_command").toIfAlone("tab", "left_command"),
	]);
}
