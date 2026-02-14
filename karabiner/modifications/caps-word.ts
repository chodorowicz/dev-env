import { map, Rule } from "karabiner.ts";
import { capsWord } from "karabiner.ts-greg-mods";

export const capsWordRule: Rule = capsWord()
	.toggle(map("w", "Meh").build()[0]) // ✦+C
	.build();
