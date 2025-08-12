import {
	FromKeyParam,
	ifVar,
	map,
	rule,
	toApp,
	toSetVar,
	withCondition,
	withModifier,
} from "karabiner.ts";
type AppConfig = [FromKeyParam, string];

function appMapper(main: AppConfig, secondary: Array<AppConfig> = []) {
	const mainApp = map(main[0])
		.toVar("app_layer", main[0])
		.toAfterKeyUp(toSetVar("app_layer", 0))
		.toIfAlone(toApp(main[1]));

	const secondaryApps = secondary.map((app) =>
		withCondition(ifVar("app_layer", main[0]))([map(app[0]).to(toApp(app[1]))])
	);

	return [mainApp, ...secondaryApps];
}

export function appsLauncherWithManipulator() {
	return [
		rule("apps").manipulators([
			withModifier("right_command")([
				...appMapper(["a", "Arc"]),
				...appMapper(["b", "BoltAI"]),
				...appMapper(["c", "Google Chrome"]),
				...appMapper(["e", "eM Client"]),
				...appMapper(
					["f", "Finder"],
					[
						["o", "Fork"],
						["i", "Figma"],
					]
				),
				...appMapper(["s", "Slack"], [["i", "Signal"]]),
				...appMapper(["i", "iTerm"]),
				...appMapper(["l", "Linear"]),
				...appMapper([";", "Polypane"]),
				...appMapper(["m", "Marvin"], [["a", "Mail"]]),
				...appMapper(["n", "Notion"], [["o", "Notion Mail"]]),
				...appMapper(["o", "Obsidian"]),
				...appMapper(["p", "1Password"], [["o", "Postman"]]),
				...appMapper(["v", "Visual Studio Code"]),
				...appMapper(["u", "Cursor"]),
				...appMapper(["z", "Zen"]),
			]),
		]),
	];
}
