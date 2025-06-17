import {
	rule,
	map,
	withModifier,
	withCondition,
	ifApp,
	duoLayer,
} from "karabiner_ts";

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
		duoLayer("d", "f").manipulators(entitiesNavigationConfig("u", "i")),
	];
}
