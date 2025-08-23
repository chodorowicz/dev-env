import { map } from "karabiner.ts";
import { holdTapLayer } from "karabiner.ts-greg-mods";
import { qwertyKeys } from "./helpers/keys";
import { TAPPING_TERM } from "../constants.ts";

export function symbols() {
	return [
		// Left symbols layer (activated by holding h)
		holdTapLayer("h")
			.permissiveHoldManipulators(
				// top row
				map("q").to("1", ["left_shift"]), // !
				map("w").to("2", ["left_shift"]), // @
				map("e").to("3", ["left_shift"]), // ]
				map("r").to("4", ["left_shift"]), // [
				map("t").to("5", ["left_shift"]), // %
				
				// Home row
				map("a").to(",", ["left_shift"]),
				map("s").to("[", ["left_shift"]), // (
				map("d").to("["), // {
				map("f").to("9",["left_shift"]), // (
				map("g").to("backslash"),

				// bottom row
				// map("z").to("5", ["left_shift"]),
				// map("x").to("6", ["left_shift"]), 
				map("c").to("grave_accent_and_tilde", ["left_shift"]),
				map("v").to("grave_accent_and_tilde")
			)
			.tappingTerm(TAPPING_TERM)
			.echoKeys(...qwertyKeys),

		// Right symbols layer (activated by holding g)
		holdTapLayer("g")
			.permissiveHoldManipulators(
				// Arrow keys and numbers (blue area)
				map("y").to("6", ["left_shift"]), // ↑
				map("u").to("7", ["left_shift"]), // ↑
				map("i").to("8", ["left_shift"]),
				map("o").to("-",),
				map("p", undefined, "any").to("="), // *]



				map("h").to("\\", ["left_shift"]), // *
				
				map("j").to("0", ["left_shift"]), // ↓
				map("k").to("]"),
				map("l").to("]", ["left_shift"]),
				map(";").to(".", ["left_shift"]),
				
				// map("n").to("7", "shift"), // &
				map("m").to("'"),
				map(",").to("'", ["left_shift"]),
			)
			.tappingTerm(TAPPING_TERM)
			.echoKeys(...qwertyKeys),
	];
}
