import { map } from "karabiner.ts";
import { holdTapLayer } from "karabiner.ts-greg-mods";
import { qwertyKeys } from "./helpers/keys";
import { TAPPING_TERM } from "../constants.ts";

export function emoji() {
	return [
		holdTapLayer("z")
			.permissiveHoldManipulators(
				map("l").toPaste("😄"), // laughing
				map("s").toPaste("😅"), // sweat smile
				map("j").toPaste("😂"), // joy
				map("c").toPaste("✅") // check mark
			)
			.tappingTerm(TAPPING_TERM)
			.echoKeys(...qwertyKeys),
	];
}
