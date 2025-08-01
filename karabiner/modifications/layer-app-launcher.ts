import { modifierLayer } from "karabiner.ts";
import { appsConfig } from "./apps-config.ts";

export function layerAppLauncher() {
	return modifierLayer("Meh", "a", "app layer")
		.description("Open App")
		.leaderMode()
		.notification("Open App 🚀 📱")
		.manipulators({
			...appsConfig(),
		});
}
