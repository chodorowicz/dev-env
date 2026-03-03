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
type SecondaryApp = [FromKeyParam, string];
type AppConfig = [FromKeyParam, string, SecondaryApp[]];

function appMapper([key, mainAppName, secondaryApps = []]: AppConfig) {
	const mainApp = map(key)
		.toVar("app_layer", key)
		.toAfterKeyUp(toSetVar("app_layer", 0))
		.toIfAlone(toApp(mainAppName));

	const secondaryAppMappings = secondaryApps.map(
		([secondaryKey, appName]) =>
			withCondition(ifVar("app_layer", key))([
				map(secondaryKey).to(toApp(appName)),
			])
	);

	return [mainApp, ...secondaryAppMappings];
}

function mapMultipleApps(apps: AppConfig[]) {
	return apps.flatMap(appMapper);
}

export function appsLauncherWithManipulator() {
	return [
		rule("apps").manipulators([
			withModifier("right_command")(
				mapMultipleApps([
					["a", "Arc", []],
					["b", "Bloom", []],
					["c", "Google Chrome", [["p", "Cypress"]]],
					["e", "eM Client", []],
					["f", "Finder", [["o", "Fork"], ["i", "Figma"]]],
					["s", "Slack", [["i", "Signal"]]],
					["i", "iTerm", []],
					["l", "Linear", []],
					[";", "Polypane", []],
					["m", "Marvin", [["a", "Mail"]]],
					["n", "Notion", [["o", "Notion Mail"]]],
					["o", "Obsidian", []],
					["p", "1Password", [["o", "Postman"]]],
					["v", "Visual Studio Code", []],
					["u", "Cursor", []],
					["z", "Zen", []],
					["x", "Zed", []],
				])
			),
		]),
	];
}
