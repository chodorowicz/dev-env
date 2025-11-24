import {
	modifierLayer,
	toKey,
	map,
	withModifier,
	mapDoubleTap,
	layer,
	toNotificationMessage,
} from "karabiner.ts";
import { TAPPING_TERM } from "../constants.ts";
import { holdTapLayer } from "karabiner.ts-greg-mods";

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

const navigationManipulators = [
	withModifier("??")(navigationModifiers),
	// pass through all modifiers
	withModifier("??")(navigationArrows),

	// delete word / delete character
	mapDoubleTap("q", 200)
		.to("delete_or_backspace", ["left_option"])
		.singleTap(toKey("delete_or_backspace")),
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

export function navigationLayer() {
	return [
		holdTapLayer("spacebar")
			.optionalModifiers(["shift", "option", "control", "command"])
			.permissiveHoldManipulators(...navigationArrows2, ...navigationModifiers2)
			.tappingTerm(TAPPING_TERM)
			.allowAnyModifiers(),
	];
}
