import { map, Rule } from "karabiner.ts";
import { capsWord } from "karabiner.ts-greg-mods";

export const capsWordRule: Rule = capsWord()
  .activator(map("v", "Meh").build()[0]) // ✦+C
  .defaultEscapeKeys(true)
  .build();
