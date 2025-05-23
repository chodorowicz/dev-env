import { rule, map } from "karabiner_ts";

export function rightCommandToCommandTab() {
	return rule("Right Command to Command Tab").manipulators([
		map("right_command").to("right_command").toIfAlone("tab", "left_command"),
	]);
}
