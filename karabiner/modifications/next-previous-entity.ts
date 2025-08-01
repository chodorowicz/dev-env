import {
	rule,
	map,
	withModifier,
	withCondition,
	ifApp,
	FromAndToKeyCode,
	KeyAlias,
} from "karabiner.ts";
import { togglePanelsGeneric } from "./ui-controls.ts";
import { holdTapLayer, modTap } from "karabiner.ts-greg-mods";

const qwertyLeftHandKeys: (FromAndToKeyCode | KeyAlias)[] = [
	"q",
	"w",
	"e",
	"r",
	"t",
	"a",
	"s",
	"d",
	"f",
	"g",
	"z",
	"x",
	"c",
	"v",
	"b",
];

const qwertyRightHandKeys: (FromAndToKeyCode | KeyAlias)[] = [
	"y",
	"u",
	"i",
	"o",
	"p",
	"[",
	"]",
	"\\",
	"h",
	"j",
	"k",
	"l",
	";",
	"'",
	"n",
	"m",
	",",
	".",
	"/",
	"␣",
	"⏎",
];

function entitiesNavigationConfig(previous: string, next: string) {
	return [
		withCondition(
			ifApp({
				file_paths: ["Google Chrome"],
			})
		)([
			map(next).to("right_arrow", ["left_option", "left_command"]),
			map(previous).to("left_arrow", ["left_option", "left_command"]),
		]),
		withCondition(
			ifApp({
				file_paths: ["Obsidian", "Code", "Cursor", "iTerm"],
			})
		)([
			map(next).to("]", ["left_command", "left_shift"]),
			map(previous).to("[", ["left_command", "left_shift"]),
		]),
		withCondition(
			ifApp({
				file_paths: ["Arc.app"],
			})
		)([
			map(next).to("down_arrow", ["left_command", "left_option"]),
			map(previous).to("up_arrow", ["left_command", "left_option"]),
		]),
	];
}

export function nextPreviousEntity() {
	return [
		rule("Next previous entity").manipulators([
			withModifier("Meh")(entitiesNavigationConfig("[", "]")),
		]),
		// duoLayer("e", "r").manipulators(entitiesNavigationConfig("u", "i")),
		// duoLayer("e", "r").manipulators(togglePanelsGeneric("m", ",")),
		holdTapLayer("r")
			.permissiveHoldManipulators(
				...withCondition(
					ifApp({
						file_paths: ["Google Chrome"],
					})
				)([
					map("i").to("right_arrow", ["left_option", "left_command"]),
					map("u").to("left_arrow", ["left_option", "left_command"]),
				]),
				...withCondition(
					ifApp({
						file_paths: ["Obsidian", "Code", "Cursor", "iTerm"],
					})
				)([
					map("i").to("]", ["left_command", "left_shift"]),
					map("u").to("[", ["left_command", "left_shift"]),
				]),
				...withCondition(
					ifApp({
						file_paths: ["Arc.app"],
					})
				)([
					map("i").to("down_arrow", ["left_command", "left_option"]),
					map("u").to("up_arrow", ["left_command", "left_option"]),
				])
			)
			.echoKeys(...[...qwertyLeftHandKeys, ...qwertyRightHandKeys]),
		// ...modTap().from("s").modifiers()
		// duoLayer("e", "r").manipulators(togglePanelsGeneric("m", ",")),
	];
}
