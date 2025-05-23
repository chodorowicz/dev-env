import { modifierLayer, to$ } from "karabiner_ts";

export function raycast() {
	return modifierLayer("Meh", "r", "app layer")
		.description("Open App")
		.leaderMode()
		.notification("Open App 🚀 📱")
		.manipulators({
			1: to$(
				`open -g "raycast://extensions/VladCuciureanu/toothpick/toggle-favorite-device-1"`
			),
			2: to$(
				`open -g "raycast://extensions/VladCuciureanu/toothpick/toggle-favorite-device-2"`
			),
			// m: to$(
			// 	`open -g "raycast://extensions/benvp/audio-device/set-output-device?context=%7B%22deviceId%22%3A%22MacBook%20Pro%20Speakers%22%7D"`
			// ),
			// s: to$(
			// 	`open -g "raycast://extensions/benvp/audio-device/set-output-device?context=%7B%22deviceId%22%3A%22MacBook%20Pro%20Speakers%22%7D"`
			// ),
		});
}
