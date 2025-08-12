import {
	modifierLayer,
	layer,
	toKey,
	map,
	withModifier,
	mapDoubleTap,
	rule,
	toSetVar,
	withCondition,
	ifVar,
	toNotificationMessage,
	toRemoveNotificationMessage,
	duoLayer,
	mapSimultaneous,
	type BasicManipulator,
} from "karabiner.ts";
import { toRectanglePro } from "./helpers/rectangle.ts";
import { holdTapLayer } from "karabiner.ts-greg-mods";
import { qwertyKeys } from "./helpers/keys.ts";

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

const navigationModifiers = [
	map("a").to("left_control"),
	map("s").to("left_option"),
	map("d").to("left_command"),
	map("f").to("left_shift"),
];

const navigationArrows = [
	map("j").to("left_arrow"),
	map("k").to("down_arrow"),
	map("i").to("up_arrow"),
	map("l").to("right_arrow"),
	map("u").to("delete_or_backspace"),
	map("o").to("return_or_enter"),
	map("m").to("delete_forward"),
	map("8").to("tab"),
];

const navigationArrows2 = [
	map("j", undefined, "any").to("left_arrow"),
	map("k", undefined, "any").to("down_arrow"),
	map("i", undefined, "any").to("up_arrow"),
	map("l", undefined, "any").to("right_arrow"),
	map("u", undefined, "any").to("delete_or_backspace"),
	map("o", undefined, "any").to("return_or_enter"),
	map("m", undefined, "any").to("delete_forward"),
	map("8", undefined, "any").to("tab"),
];

const navigationModifiers2 = [
	map("a", undefined, "any").to("left_control"),
	map("s", undefined, "any").to("left_option"),
	map("d", undefined, "any").to("left_command"),
	map("f", undefined, "any").to("left_shift"),
];

const navigationManipulators = [
	withModifier("??")(navigationModifiers),
	// pass through all modifiers
	withModifier("??")(navigationArrows),

	// delete word / delete character
	mapDoubleTap("q", 200)
		.to("delete_or_backspace", ["left_option"])
		.singleTap(toKey("delete_or_backspace")),
];

export function windowSwitcher() {
	return holdTapLayer("e")
		.permissiveHoldManipulators(
			map("l").to("tab", ["left_command"]),
			map("j").to("left_arrow", ["left_command"]),
			map("k").to("down_arrow", ["left_command"]),
			map("i").to("up_arrow", ["left_command"]),
			map("u").to("q", ["left_command"])
		)
		.echoKeys(...qwertyKeys)
		.tappingTerm(150);
}

export function navigationLayer2() {
	return holdTapLayer("spacebar")
		.optionalModifiers(["shift", "option", "control", "command"])
		.permissiveHoldManipulators(...navigationArrows2, ...navigationModifiers2)
		.tappingTerm(150)
		.allowAnyModifiers();
}

export function navigationLayer() {
	return [
		layer("tab", "navigate").manipulators([
			map("w").toVar("window_mode").toAfterKeyUp(toSetVar("window_mode", 0)),
			withCondition(ifVar("window_mode"))(windowModeManipulators),
			withCondition(ifVar("window_mode").unless())(navigationManipulators),
		]),
		layer("1", "navigate").manipulators([...navigationManipulators]),
		// layer(";", "navigate").manipulators([...navigationManipulators]),
		// layer("x", "navigate").manipulators([...windowModeManipulators2]),
		// duoLayer("s", "d").manipulators([...navigationManipulators]),
		duoLayer(";", "spacebar", "arrow keys").manipulators([
			...navigationManipulators,
		]),
		holdTapLayer("w")
			.permissiveHoldManipulators(...windowModeManipulators)
			.echoKeys(...qwertyKeys)
			.tappingTerm(150), // rule("navigate").manipulators([withModifier("fn")(navigationManipulators)]),
		// rule("navigate").manipulators([
		// 	withModifier("right_option")(navigationManipulators),
		// ]),
		// delayedLayer,
	];
}
