import {
	map,
	rule,
	toKey,
	withModifier,
	type ToKeyParam,
	type FromKeyParam,
} from "karabiner.ts";
import { hrm } from "karabiner.ts-greg-mods";

export const hrmRule = rule("Home row mods").manipulators(
	hrm(
		new Map([
			["a", "l⌃"],
			["s", "l⌥"],
			["d", "l⌘"],
			["f", "l⇧"],
			["j", "r⇧"],
			["k", "l⌘"],
			["l", "r⌥"],
			// [";", "r⌃"], // use ; for navigation layer
		])
	)
		.lazy(true)
		.chordalHold(true)
		.holdTapStrategy("permissive-hold")
		.simultaneousThreshold(90)
		.tappingTerm(110)
		.build()
);
