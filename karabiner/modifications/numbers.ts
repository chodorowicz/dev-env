import { map } from "karabiner.ts";
import { holdTapLayer } from "karabiner.ts-greg-mods";
import { qwertyKeys } from "./helpers/keys";
import { TAPPING_TERM } from "../constants.ts";

export function numbersLayer() {
	return [
		holdTapLayer("v")
			.permissiveHoldManipulators(
				map("m").to("1"),
				map(",").to("2"),
				map(".").to("3"),
				map("j").to("4"),
				map("k").to("5"),
				map("l").to("6"),
				map("u").to("7"),
				map("i").to("8"),
				map("o").to("9"),
				map("n").to("0"),
			)
			.tappingTerm(TAPPING_TERM)
			.echoKeys(...qwertyKeys),
	];
}
