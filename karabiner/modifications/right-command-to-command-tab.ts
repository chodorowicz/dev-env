import { rule, map, ifVar, toSetVar } from "karabiner.ts";

// 1 while right ⌘ is physically held, 0 once it is released.
const RIGHT_CMD_HELD = "right_cmd_held";

/**
 * Right ⌘ drives the native macOS app switcher one-handed:
 * - tap alone      -> ⌘Tab (switch to previous app)
 * - hold + →       -> ⌘Tab (open switcher / move forward)
 * - hold + ←       -> ⌘⇧Tab (move backward)
 * - hold + ↑ / ↓   -> untouched; natively they expose the selected app's windows
 *
 * The arrows keep right ⌘ as an *optional* modifier and gate on a variable
 * instead of using it as a mandatory one: Karabiner releases mandatory
 * modifiers before posting the output, which would close the switcher.
 */
export function rightCommandToCommandTab() {
	return rule("Right Command to Command Tab").manipulators([
		map("right_command")
			.to(toSetVar(RIGHT_CMD_HELD, 1, 0))
			.to("right_command")
			.toIfAlone("tab", "left_command"),

		map("right_arrow", undefined, "any")
			.to("tab")
			.condition(ifVar(RIGHT_CMD_HELD, 1)),
		map("left_arrow", undefined, "any")
			.to("tab", "left_shift")
			.condition(ifVar(RIGHT_CMD_HELD, 1)),
	]);
}
