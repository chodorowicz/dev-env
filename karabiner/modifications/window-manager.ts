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

function mod(key, mod) {
	return (
		map(key)
			.toIfAlone(key, {}, { halt: true })
			// .toDelayedAction(toKey("vk_none"), toStickyModifier(mod, "toggle"))
			.toIfHeldDown(mod, {}, { halt: true })
			.toDelayedAction(toKey("vk_none"), toKey(key))
			.parameters({
				"basic.to_if_held_down_threshold_milliseconds": 200,
				"basic.to_delayed_action_delay_milliseconds": 250,
			})
	);
}
const mods = [
	mod("a", "left_control"),
	mod("s", "left_option"),
	mod("d", "left_command"),
	mod("f", "left_shift"),
	mod("j", "right_shift"),
	mod("k", "left_command"),
	mod("l", "right_option"),
	mod(";", "right_control"),
];
export function homeRowMods() {
	return rule("homeRowMods").manipulators(withModifier("??")(mods));
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
		map("8").to("tab"),
	]),

	// delete word / delete character
	mapDoubleTap("q", 200)
		.to("delete_or_backspace", ["left_option"])
		.singleTap(toKey("delete_or_backspace")),

	map("a").to("left_control"),
	map("s").to("left_option"),
	map("d").to("left_command"),
	map("f").to("left_shift"),
];

export const delayedLayer = rule("delayer-layer").manipulators([
	map("c")
		.condition(ifVar("delayed-1").unless())
		.toIfHeldDown([
			toSetVar("delayed-1"),
			toNotificationMessage("delayed-1", "💡 Delayed Layer 1"),
		])
		.toAfterKeyUp([
			toSetVar("delayed-1", 0),
			toRemoveNotificationMessage("delayed-1"),
		])
		.toIfAlone("c")
		.toDelayedAction(
			[],
			[
				toKey("c"),
				toSetVar("delayed-1", 0),
				toRemoveNotificationMessage("delayed-1"),
			]
		),
	withCondition(ifVar("delayed-1"))(navigationManipulators),
]);

export function navigationLayer() {
	return [
		layer("tab", "navigate").manipulators([
			map("w").toVar("window_mode").toAfterKeyUp(toSetVar("window_mode", 0)),
			withCondition(ifVar("window_mode"))(windowModeManipulators),
			withCondition(ifVar("window_mode").unless())(navigationManipulators),
		]),
		layer("1", "navigate").manipulators([...navigationManipulators]),
		layer(";", "navigate").manipulators([...navigationManipulators]),
		// layer("x", "navigate").manipulators([...windowModeManipulators]),
		duoLayer("s", "d").manipulators([...navigationManipulators]),
		duoLayer(";", "spacebar", "arrow keys").manipulators([
			...navigationManipulators,
		]),
		// rule("navigate").manipulators([withModifier("fn")(navigationManipulators)]),
		// rule("navigate").manipulators([
		// 	withModifier("right_option")(navigationManipulators),
		// ]),
		// delayedLayer,
	];
}
