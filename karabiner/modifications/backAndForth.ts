import { rule, withModifier, withCondition, ifApp, map } from "karabiner_ts";

export function backAndForth() {
	return rule("Back and forth").manipulators([
		withModifier("Meh")([
			withCondition(
				ifApp({
					file_paths: ["Code", "Cursor"],
				})
			)([
				map("=").to("=", ["left_control"]),
				map("-").to("-", ["left_control"]),
				map("return_or_enter").to("f12", ["fn"]),
			]),
			withCondition(
				ifApp({
					file_paths: ["Obsidian"],
				})
			)([
				map("=").to("right_arrow", ["left_command", "left_option"]),
				map("-").to("left_arrow", ["left_command", "left_option"]),
			]),
			withCondition(
				ifApp({
					file_paths: ["Slack"],
				})
			)([
				map("=").to("]", ["left_command"]),
				map("-").to("[", ["left_command"]),
			]),
		]),
	]);
}
