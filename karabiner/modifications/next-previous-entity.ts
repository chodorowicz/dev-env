import { rule, map, withModifier, withCondition, ifApp } from "karabiner_ts";

export function nextPreviousEntity() {
	return rule("Next previous entity").manipulators([
		withModifier("Meh")([
			withCondition(
				ifApp({
					file_paths: ["Google Chrome"],
				})
			)([
				map("]").to("right_arrow", ["left_option", "left_command"]),
				map("[").to("left_arrow", ["left_option", "left_command"]),
			]),
			withCondition(
				ifApp({
					file_paths: ["Obsidian", "Code", "Cursor", "iTerm"],
				})
			)([
				map("]").to("]", ["left_command", "left_shift"]),
				map("[").to("[", ["left_command", "left_shift"]),
			]),
			withCondition(
				ifApp({
					file_paths: ["Arc.app"],
				})
			)([
				map("]").to("down_arrow", ["left_command", "left_option"]),
				map("[").to("up_arrow", ["left_command", "left_option"]),
			]),
		]),
	]);
}
