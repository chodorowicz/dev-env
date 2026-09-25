import {
	rule,
	map,
	withModifier,
	FromAndToKeyCode,
	KeyAlias,
	duoLayer,
} from "karabiner.ts";
import { togglePanelsGeneric } from "./ui-controls.ts";
import { holdTapLayer, modTap } from "karabiner.ts-greg-mods";
import { qwertyKeys } from "./helpers/keys.ts";
import { inApps } from "../helpers/apps.ts";

function nextPreviousEntityWithModifier() {
	return holdTapLayer("r")
		.permissiveHoldManipulators(
			...inApps(
				["Google Chrome"],
				map("i").to("right_arrow", ["left_option", "left_command"]),
				map("u").to("left_arrow", ["left_option", "left_command"]),
			),
			...inApps(
				["Obsidian", "Code", "Cursor", "iTerm", "Zed", "Vivaldi", "Orca"],
				map("i").to("]", ["left_command", "left_shift"]),
				map("u").to("[", ["left_command", "left_shift"]),
			),
			// next previous tab
			...inApps(
				["Arc.app", "Zen"],
				map("i").to("down_arrow", ["left_command", "left_option"]),
				map("u").to("up_arrow", ["left_command", "left_option"]),
			),
			...togglePanelsGeneric("m", ","),
			map("w").to("w", ["left_command"]),
		)
		.echoKeys(...qwertyKeys)
		.tappingTerm(150);
}

export function nextPreviousEntity() {
	return [
		// rule("Next previous entity").manipulators([
		// 	withModifier("Meh")(entitiesNavigationConfig("[", "]")),
		// ]),
		nextPreviousEntityWithModifier(),
		// duoLayer("e", "r").manipulators(entitiesNavigationConfig("u", "i")),
		// duoLayer("e", "r").manipulators(togglePanelsGeneric("m", ",")),

		// ...modTap().from("s").modifiers()
		// duoLayer("e", "r").manipulators(togglePanelsGeneric("m", ",")),
	];
}
