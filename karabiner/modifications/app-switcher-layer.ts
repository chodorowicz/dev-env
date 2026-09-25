import { holdTapLayer } from "karabiner.ts-greg-mods";
import { map, rule, ifVar, toSetVar, withMapper } from "karabiner.ts";
import { TAPPING_TERM } from "../constants.ts";

// Set to 1 once ⌘+Tab opens the switcher, back to 0 when ⌘ is released.
const SWITCHER_VAR = "cmd_tab_switcher";

// i/j/k/l -> arrows, reused by the hold-tab / hold-/ layers and the native ⌘+Tab flow.
const NAV = [
	["i", "up_arrow"],
	["j", "left_arrow"],
	["k", "down_arrow"],
	["l", "right_arrow"],
] as const;

// ijkl steer the open switcher (⌘+arrows), shared by the hold-tab and hold-/ layers.
const navManipulators = () =>
	NAV.map(([from, to]) => map(from, undefined, "any").to(to, "left_command"));

export function appSwitcherLayer() {
	return [
		// Custom trigger: hold `tab` to become ⌘ and steer the switcher with ijkl.
		holdTapLayer("tab")
			.onHold("left_command")
			.onHold("tab", "left_command", { repeat: false })
			.tappingTerm(TAPPING_TERM)
			.permissiveHoldManipulators(
				...navManipulators(),
				map("q", undefined, "any").to("q", "left_command"),
				map("w", undefined, "any").to("w", "left_command"),
			)
			.build(),

		// One-handed trigger: hold `/` to become ⌘ and open the switcher, then
		// ijkl steer it; releasing `/` picks the app.
		holdTapLayer("/")
			.onHold("left_command")
			.onHold("tab", "left_command", { repeat: false })
			.tappingTerm(TAPPING_TERM)
			.permissiveHoldManipulators(...navManipulators())
			.build(),

		// Native ⌘+Tab: arm ijkl navigation while the macOS switcher is open.
		rule("Native cmd+tab ijkl").manipulators([
			// Pressing Tab while holding ⌘ opens/advances the switcher and arms nav.
			map("tab", "left_command")
				.to("tab", "left_command")
				.to(toSetVar(SWITCHER_VAR, 1)),

			// Releasing ⌘ closes the switcher -> disarm.
			map("left_command")
				.to("left_command")
				.toAfterKeyUp(toSetVar(SWITCHER_VAR, 0)),

			// While armed + ⌘ held, ijkl move the selection (same as arrows+⌘).
			withMapper(NAV)(([from, to]) =>
				map(from, "left_command")
					.to(to, "left_command")
					.condition(ifVar(SWITCHER_VAR, 1)),
			),
		]),
	];
}
