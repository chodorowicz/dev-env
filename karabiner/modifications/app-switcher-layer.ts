import { holdTapLayer } from "karabiner.ts-greg-mods";
import {
	map,
	rule,
	ifVar,
	toSetVar,
	withMapper,
	type BasicManipulator,
} from "karabiner.ts";
import { TAPPING_TERM } from "../constants.ts";
import { qwertyKeys } from "./helpers/keys.ts";

// Set to 1 once ⌘+Tab opens the switcher, back to 0 when ⌘ is released.
const SWITCHER_VAR = "cmd_tab_switcher";

// Set to 1 once hold-`/` + l/j opens the switcher, back to 0 when `/` is released.
const SLASH_SWITCHER_VAR = "slash_switcher";

// i/j/k/l -> arrows, reused by the hold-tab layer and the native ⌘+Tab flow.
const NAV = [
	["i", "up_arrow"],
	["j", "left_arrow"],
	["k", "down_arrow"],
	["l", "right_arrow"],
] as const;

// ijkl steer the open switcher (⌘+arrows), used by the hold-tab layer.
const navManipulators = () =>
	NAV.map(([from, to]) => map(from, undefined, "any").to(to, "left_command"));

// One-handed trigger: hold `/` to become ⌘ (no switcher yet, so a slow `/`
// tap never jumps to the last app). l/j open the switcher (⌘Tab / ⌘⇧Tab);
// once it's open, ijkl move the selection one step with ⌘+arrows.
// Releasing `/` picks.
function slashSwitcherLayer() {
	const slashLayer = holdTapLayer("/")
		.onHold("left_command")
		.tappingTerm(TAPPING_TERM)
		// Switcher open: ijkl -> ⌘+arrows (one item per press).
		.holdOnOtherKeyPressManipulators(
			NAV.map(([from, to]) =>
				map(from, undefined, "any")
					.to(to, "left_command")
					.condition(ifVar(SLASH_SWITCHER_VAR, 1)),
			),
		)
		// Switcher closed: l/j open it.
		.permissiveHoldManipulators(
			map("l", undefined, "any")
				.to("tab", "left_command")
				.to(toSetVar(SLASH_SWITCHER_VAR, 1)),
			map("j", undefined, "any")
				.to("tab", ["left_command", "left_shift"])
				.to(toSetVar(SLASH_SWITCHER_VAR, 1)),
		)
		// Replay `/` + key on fast rolls instead of swallowing the `/`.
		.echoKeys(...qwertyKeys.filter((k) => !["j", "l", "/"].includes(k)))
		.build();

	// Disarm i/k when `/` is released (the switcher closes with ⌘).
	const layerKey = slashLayer.manipulators[0] as BasicManipulator;
	layerKey.to_after_key_up = [
		...(layerKey.to_after_key_up ?? []),
		toSetVar(SLASH_SWITCHER_VAR, 0),
	];
	return slashLayer;
}

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

		slashSwitcherLayer(),

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
