import { layer, toPaste } from "karabiner.ts";

export function emoji() {
	return layer("z", "emoji").manipulators({
		l: toPaste("😄"), // laughing`
		s: toPaste("😅"), // sweat smile
		j: toPaste("😂"), // joy
	});
}
