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

function isAppConfig(app: unknown): app is AppConfig {
	return (
		Array.isArray(app) &&
		typeof app[0] === "string" &&
		typeof app[1] === "string"
	);
}

function mapMultipleApps(
	apps: Array<AppConfig | [AppConfig, Array<AppConfig>]>
) {
	return apps.flatMap((app) => {
		if (Array.isArray(app[0]) && Array.isArray(app[1])) {
			return appMapper(app[0], app[1]);
		}

		if (isAppConfig(app)) {
			return appMapper(app);
		}

		throw new Error("Invalid app config");
	});
}

export function appsLauncherWithManipulator() {
	return [
		rule("apps").manipulators([
			withModifier("right_command")(
				mapMultipleApps([
					["a", "Arc"],
					["b", "Bloom"],
					["c", "Google Chrome"],
					["e", "eM Client"],
					[
						["f", "Finder"],
						[
							["o", "Fork"],
							["i", "Figma"],
						],
					],
					[["s", "Slack"], [["i", "Signal"]]],
					["i", "iTerm"],
					["l", "Linear"],
					[";", "Polypane"],
					[["m", "Marvin"], [["a", "Mail"]]],
					[["n", "Notion"], [["o", "Notion Mail"]]],
					["o", "Obsidian"],
					[["p", "1Password"], [["o", "Postman"]]],
					["v", "Visual Studio Code"],
					["u", "Cursor"],
					["z", "Zen"],
					["x", "Zed"],
				])
			),
		]),
	];
}
