import { rule, map, withModifier } from "karabiner.ts";

export function moveMultipleLines() {
	return rule("Move multiple lines").manipulators([
		withModifier("Meh")([
			map("up_arrow")
				.to("up_arrow")
				.to("up_arrow")
				.to("up_arrow")
				.to("up_arrow")
				.to("up_arrow"),
			map("down_arrow")
				.to("down_arrow")
				.to("down_arrow")
				.to("down_arrow")
				.to("down_arrow")
				.to("down_arrow"),
		]),
	]);
}
