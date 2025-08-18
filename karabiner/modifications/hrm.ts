import {
	map,
	rule,
	toKey,
	withModifier,
	type ToKeyParam,
	type FromKeyParam,
} from "karabiner.ts";
import { hrm } from "karabiner.ts-greg-mods";
import { isBuiltInKeyboard } from "../helpers/devices.ts";

export const hrmRule = rule("Home row mods", isBuiltInKeyboard()).manipulators(
	hrm(
		new Map([
			["a", "l⌃"],
			["s", "l⌥"],
			["d", "l⌘"],
			["f", "l⇧"],
			["j", "r⇧"],
			["k", "r⌘"],
			["l", "r⌥"],
			[";", "r⌃"],
		])
	)
		.lazy(true)
		.holdTapStrategy("permissive-hold")
		.chordalHold(true)
		.simultaneousThreshold(90)
		.tappingTerm(120)
		.build()
);
