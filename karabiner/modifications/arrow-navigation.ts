import { layer, modifierLayer, toKey, map, withModifier } from "karabiner_ts";

export function arrowNavigation() {
	return layer("tab", "navigate").manipulators({
		i: toKey("up_arrow"),
		j: toKey("left_arrow"),
		k: toKey("down_arrow"),
		l: toKey("right_arrow"),
	});
}

export function arrowNavigationJumpWord() {
	return layer("tab", "navigate").manipulators([
		withModifier("left_option")([
			map("i").to(toKey("up_arrow", ["left_option"])),
			map("j").to(toKey("left_arrow", ["left_option"])),
			map("k").to(toKey("down_arrow", ["left_option"])),
			map("l").to(toKey("right_arrow", ["left_option"])),
		]),
		withModifier("Meh")([
			map("i").to(toKey("up_arrow")).to(toKey("up_arrow")).to(toKey("up_arrow")),
			map("j").to(toKey("left_arrow")).to(toKey("left_arrow")).to(toKey("left_arrow")),
			map("k").to(toKey("down_arrow")).to(toKey("down_arrow")).to(toKey("down_arrow")),
			map("l").to(toKey("right_arrow")).to(toKey("right_arrow")).to(toKey("right_arrow")),
		]),
	]);
}

export function powerArrowNavigation() {
	return modifierLayer("Meh", "tab", "navigate layer").manipulators([
		map("i").to(toKey("up_arrow")).to(toKey("up_arrow")).to(toKey("up_arrow")),
		map("j")
			.to(toKey("left_arrow"))
			.to(toKey("left_arrow"))
			.to(toKey("left_arrow")),
		map("k")
			.to(toKey("down_arrow"))
			.to(toKey("down_arrow"))
			.to(toKey("down_arrow")),
		map("l")
			.to(toKey("right_arrow"))
			.to(toKey("right_arrow"))
			.to(toKey("right_arrow")),
	]);
}
