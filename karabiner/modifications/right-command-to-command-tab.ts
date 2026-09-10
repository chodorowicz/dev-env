import { rule, map, ifVar, toSetVar } from "karabiner.ts";

// 1 while right ⌘ is physically held, 0 once it is released.
const RIGHT_CMD_HELD = "right_cmd_held";

/**
 * Right ⌘ drives the native macOS app switcher one-handed:
 * - tap alone      -> ⌘Tab (switch to previous app)
 * - hold + →       -> ⌘Tab (open switcher / move forward)
 * - hold + ← ↑ ↓   -> untouched; once the switcher is open, ⌘← moves the
 *                     selection left natively and ⌘↑/⌘↓ expose the app's windows
 *
 * → keeps right ⌘ as an *optional* modifier and gates on a variable instead
 * of using it as a mandatory one: Karabiner releases mandatory modifiers
 * before posting the output, which would close the switcher.
 */
export function rightCommandToCommandTab() {
	return rule("Right Command to Command Tab").manipulators([
		// Only the last `to` event is held while the key is down; earlier ones
		// get key_up immediately, so a key_up_value here would reset to 0 at
		// once. Clear the flag in to_after_key_up instead.
		map("right_command")
			.to(toSetVar(RIGHT_CMD_HELD, 1))
			.to("right_command")
			.toIfAlone("tab", "left_command")
			.toAfterKeyUp(toSetVar(RIGHT_CMD_HELD, 0)),

		// repeat: false posts key_up right after key_down, so holding the arrow
		// a beat too long never auto-repeats through the switcher.
		map("right_arrow", undefined, "any")
			.to("tab", undefined, { repeat: false })
			.condition(ifVar(RIGHT_CMD_HELD, 1)),
	]);
}
