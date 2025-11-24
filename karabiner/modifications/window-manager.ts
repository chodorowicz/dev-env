import { modifierLayer, map } from "karabiner.ts";
import { toRectanglePro } from "./helpers/rectangle.ts";
import { holdTapLayer } from "karabiner.ts-greg-mods";
import { qwertyKeys } from "./helpers/keys.ts";
import { TAPPING_TERM } from "../constants.ts";

const windowModeManipulators = [
	map("n").to(toRectanglePro("next-display")),
	map("m").to(toRectanglePro("maximize")),
	map("1").to(toRectanglePro("maximize")),
	map("j").to(toRectanglePro("left-half")),
	map("l").to(toRectanglePro("right-half")),
	map("i").to(toRectanglePro("top-half")),
	map("k").to(toRectanglePro("bottom-half")),
	map("o").to(toRectanglePro("smaller")),
	map("u").to(toRectanglePro("larger")),
	map("7").to(toRectanglePro("first-third")),
	map("8").to(toRectanglePro("center-third")),
	map("9").to(toRectanglePro("last-third")),
	map("0").to(toRectanglePro("center-half")),
];

export function rectangleWindowNavigation() {
	return modifierLayer("Meh", "w", "control windows").manipulators(
		windowModeManipulators
	);
}

export function uiManager() {
	return [
		holdTapLayer("e")
			.permissiveHoldManipulators(
				map("l").to("tab", ["left_command"]),
				map("j").to("left_arrow", ["left_command"]),
				map("k").to("down_arrow", ["left_command"]),
				map("i").to("up_arrow", ["left_command"]),
				map("u").to("q", ["left_command"])
			)
			.echoKeys(...qwertyKeys)
			.tappingTerm(TAPPING_TERM),
	];
}

export function windowManagerLayer() {
	return [
		// layer("tab", "navigate").manipulators([
		// 	map("w").toVar("window_mode").toAfterKeyUp(toSetVar("window_mode", 0)),
		// 	withCondition(ifVar("window_mode"))(windowModeManipulators),
		// 	withCondition(ifVar("window_mode").unless())(navigationManipulators),
		// ]),
		// layer("1", "navigate").manipulators([...navigationManipulators]),
		// layer(";", "navigate").manipulators([...navigationManipulators]),
		// layer("x", "navigate").manipulators([...windowModeManipulators2]),
		// duoLayer("s", "d").manipulators([...navigationManipulators]),
		// duoLayer(";", "spacebar", "arrow keys").manipulators([
		// 	...navigationManipulators,
		// ]),
		// holdTapLayer("w")
		// 	.permissiveHoldManipulators(...windowModeManipulators)
		// 	.echoKeys(...qwertyKeys)
		// 	.tappingTerm(150),
		holdTapLayer("w")
			.permissiveHoldManipulators(...windowModeManipulators)
			.echoKeys(...qwertyKeys)
			.tappingTerm(TAPPING_TERM),
		// layer("w", "window manager").manipulators(windowModeManipulators),
		// rule("navigate").manipulators([
		// 	withModifier("right_option")(navigationManipulators),
		// ]),
		// delayedLayer,
	];
}

