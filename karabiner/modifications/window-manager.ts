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
} from "karabiner_ts";
import { toRectanglePro } from "./helpers/rectangle.ts";

// Rectangle window navigation
const windowModeManipulators = [
	{
		n: toRectanglePro("next-display"),
		m: toRectanglePro("maximize"),
		"1": toRectanglePro("maximize"),
		j: toRectanglePro("left-half"),
		l: toRectanglePro("right-half"),
		i: toRectanglePro("top-half"),
		k: toRectanglePro("bottom-half"),
		o: toRectanglePro("smaller"),
		u: toRectanglePro("larger"),
		7: toRectanglePro("first-third"),
		8: toRectanglePro("center-third"),
		9: toRectanglePro("last-third"),
		0: toRectanglePro("center-half"),
	},
];
export function rectangleWindowNavigation() {
	return modifierLayer("Meh", "w", "control windows").manipulators(
		windowModeManipulators
	);
}

const navigationManipulators = [
	// pass through all modifiers
	withModifier("??")([
		map("j").to("left_arrow"),
		map("k").to("down_arrow"),
		map("i").to("up_arrow"),
		map("l").to("right_arrow"),
		map("u").to("delete_or_backspace"),
		map("o").to("return_or_enter"),
		map("m").to("delete_forward"),
	]),

	// delete word / delete character
	mapDoubleTap("q", 200)
		.to("delete_or_backspace", ["left_option"])
		.singleTap(toKey("delete_or_backspace")),
];

export function navigationLayer() {
	return [
		layer("tab", "navigate").manipulators([
			map("w").toVar("window_mode").toAfterKeyUp(toSetVar("window_mode", 0)),
			withCondition(ifVar("window_mode"))(windowModeManipulators),
			withCondition(ifVar("window_mode").unless())(navigationManipulators),
		]),
		layer(",", "navigate").manipulators([...windowModeManipulators]),
		rule("navigate").manipulators([withModifier("fn")(navigationManipulators)]),
		// rule("navigate").manipulators([
		// 	withModifier("right_option")(navigationManipulators),
		// ]),
	];
}
