import { layer } from "https://deno.land/x/karabinerts@1.30.3/config/layer";
import { withModifier } from "https://deno.land/x/karabinerts@1.30.3/utils/with-modifier";
import { appsConfig } from "./apps-config.ts";

export function appsLauncherWithManipulator() {
	return layer(".", "apps").manipulators([
		withModifier(["right_command"])(appsConfig()),
	]);
}
