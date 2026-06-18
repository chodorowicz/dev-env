import { holdTapLayer } from "karabiner.ts-greg-mods";
import { map } from "karabiner.ts";
import { TAPPING_TERM } from "../constants.ts";

export function appSwitcherLayer() {
	return [
		holdTapLayer("tab")
			.onHold("left_command")
			.onHold("tab", "left_command", { repeat: false })
			.tappingTerm(TAPPING_TERM)
			.permissiveHoldManipulators(
				map("i", undefined, "any").to("up_arrow", "left_command"),
				map("j", undefined, "any").to("left_arrow", "left_command"),
				map("k", undefined, "any").to("down_arrow", "left_command"),
				map("l", undefined, "any").to("right_arrow", "left_command"),
				map("q", undefined, "any").to("q", "left_command"),
				map("w", undefined, "any").to("w", "left_command"),
			)
			.build(),
	];
}
