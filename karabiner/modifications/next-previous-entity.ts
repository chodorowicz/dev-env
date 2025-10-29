import {
	rule,
	map,
	withModifier,
	withCondition,
	ifApp,
	FromAndToKeyCode,
	KeyAlias,
	duoLayer,
} from "karabiner.ts";
import { togglePanelsGeneric } from "./ui-controls.ts";
import { holdTapLayer, modTap } from "karabiner.ts-greg-mods";
import { qwertyKeys } from "./helpers/keys.ts";

function entitiesNavigationConfig(previous: string, next: string) {
	return [
		withCondition(
			ifApp({
				file_paths: ["Google Chrome"],
			}),
		)([
			map(next).to("right_arrow", ["left_option", "left_command"]),
			map(previous).to("left_arrow", ["left_option", "left_command"]),
		]),
		withCondition(
			ifApp({
				file_paths: ["Obsidian", "Code", "Cursor", "iTerm"],
			}),
		)([
			map(next).to("]", ["left_command", "left_shift"]),
			map(previous).to("[", ["left_command", "left_shift"]),
		]),
		withCondition(
			ifApp({
				file_paths: ["Arc.app"],
			}),
		)([
			map(next).to("down_arrow", ["left_command", "left_option"]),
			map(previous).to("up_arrow", ["left_command", "left_option"]),
		]),
	];
}

function nextPreviousEntityWithModifier() {
	return holdTapLayer("r")
		.permissiveHoldManipulators(
			...withCondition(
				ifApp({
					file_paths: ["Google Chrome"],
				}),
			)([
				map("i").to("right_arrow", ["left_option", "left_command"]),
				map("u").to("left_arrow", ["left_option", "left_command"]),
			]),
			...withCondition(
				ifApp({
					file_paths: ["Obsidian", "Code", "Cursor", "iTerm", "Zed"],
				}),
			)([
				map("i").to("]", ["left_command", "left_shift"]),
				map("u").to("[", ["left_command", "left_shift"]),
			]),
			// next previous tab
			...withCondition(
				ifApp({
					file_paths: ["Arc.app", "Zen"],
				}),
			)([
				map("i").to("down_arrow", ["left_command", "left_option"]),
				map("u").to("up_arrow", ["left_command", "left_option"]),
			]),
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
