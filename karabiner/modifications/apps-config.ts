import { toApp, map, mapSimultaneous, layer } from "karabiner.ts";

export function appsConfig() {
	return [
		map("1").to(toApp("1Password")),
		map("a").to(toApp("Arc")),
		map("c").to(toApp("Google Chrome")),
		map("d").to(toApp("DEVONthink 3")),
		// map("e").to(toApp("Mail")),
		// map("f").to(toApp("Finder")),
		map("i").to(toApp("iTerm")),
		// map("m").to(toApp("Marvin")),
		map("o").to(toApp("Obsidian")),
		// map("p").to(toApp("Postman")),
		// map("s").to(toApp("Slack")),
		map("v").to(toApp("Visual Studio Code")),
		map("u").to(toApp("Cursor")),
		mapSimultaneous(["c", "x"]).toApp("Cursor"),
		map("z").to(toApp("Zen")),
	];
}
