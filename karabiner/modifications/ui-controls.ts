import { rule, withModifier, map, FromKeyParam } from "karabiner.ts";
import { inApps } from "../helpers/apps.ts";

export function togglePanelsGeneric(
	leftPanel: FromKeyParam,
	rightPanel: FromKeyParam
) {
	return [
		...inApps(
			["Code", "Cursor"],
			map(rightPanel).to("b", ["left_command", "left_option"]),
			map(leftPanel).to("b", ["left_command"]),
		),
		...inApps(
			["Zed"],
			map(rightPanel).to("r", ["left_command"]),
			map(leftPanel).to("b", ["left_command"]),
		),
		...inApps(
			["Orca"],
			map(rightPanel).to("l", ["left_command"]),
			map(leftPanel).to("b", ["left_command"]),
		),
	];
}

export function togglePanels() {
	return rule("Toggle panels").manipulators([
		withModifier("Meh")(togglePanelsGeneric("'", "\\")),
	]);
}
