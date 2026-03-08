import {
	rule,
	withModifier,
	withCondition,
	ifApp,
	map,
	duoLayer,
	FromKeyParam,
} from "karabiner.ts";
export function togglePanelsGeneric(
	leftPanel: FromKeyParam,
	rightPanel: FromKeyParam
) {
	return [
		...withCondition(
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
