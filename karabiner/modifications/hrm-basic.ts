import {
	map,
	rule,
	toKey,
	withModifier,
	type ToKeyParam,
	type FromKeyParam,
	type Manipulator,
} from "karabiner.ts";

// Home Row Mods built with basic building blocks from karabiner.ts

function mod(fromKey: FromKeyParam, modKey: ToKeyParam) {
	return (
		map(fromKey)
			.toIfAlone(modKey, {}, { halt: true })
			// .toDelayedAction(modKey("vk_none"), toStickyModifier(mod, "toggle"))
			.toIfHeldDown(modKey, {}, { halt: true })
			.toDelayedAction(toKey("vk_none"), toKey(modKey))
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
	return rule("homeRowMods").manipulators([withModifier("??")(mods)]);
}
