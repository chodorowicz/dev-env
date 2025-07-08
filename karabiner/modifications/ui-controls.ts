import {
	rule,
	withModifier,
	withCondition,
	ifApp,
	map,
	duoLayer,
} from "karabiner_ts";

export function backAndForthGeneric(back: string, forth: string) {
	return [
		withCondition(
			ifApp({
				file_paths: ["Code", "Cursor"],
			})
		)([
			map(forth).to("=", ["left_control"]),
			map(back).to("-", ["left_control"]),
			map("return_or_enter").to("f12", ["fn"]),
		]),
		withCondition(
			ifApp({
				file_paths: ["Obsidian"],
			})
		)([
			map(forth).to("right_arrow", ["left_command", "left_option"]),
			map(back).to("left_arrow", ["left_command", "left_option"]),
		]),
		withCondition(
			ifApp({
				file_paths: ["Slack"],
			})
		)([
			map(forth).to("]", ["left_command"]),
			map(back).to("[", ["left_command"]),
		]),
	];
}

export function backAndForth() {
	return [
		// rule("Next previous entity").manipulators([
		// 	withModifier("Meh")(entitiesNavigationConfig("[", "]")),
		// ]),
		duoLayer("d", "f").manipulators(backAndForthGeneric("j", "k")),
	];
}

export function togglePanelsGeneric(leftPanel: string, rightPanel: string) {
	return [
		withCondition(
			ifApp({
				file_paths: ["Code", "Cursor"],
			})
		)([
			map(rightPanel).to("b", ["left_command", "left_option"]),
			map(leftPanel).to("b", ["left_command"]),
		]),
	];
}

export function togglePanels() {
	return rule("Toggle panels").manipulators([
		withModifier("Meh")([
			withCondition(
				ifApp({
					file_paths: ["Code", "Cursor"],
				})
			)([
				map("\\").to("b", ["left_command", "left_option"]),
				map("'").to("b", ["left_command"]),
			]),
		]),
	]);
}
