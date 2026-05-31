import { rule, map } from "karabiner.ts";

// fn + ` / z / x to mute, volume up, volume down (media keys)
export function mediaKeys() {
	return rule("fn + ` z x to mute / volume up / volume down").manipulators([
		map({
			key_code: "grave_accent_and_tilde",
			modifiers: { mandatory: ["fn"] },
		})
			.to({ key_code: "mute" })
			.description("Tap fn+` to mute"),

		map({
			key_code: "z",
			modifiers: { mandatory: ["fn"] },
		})
			.to({ key_code: "volume_decrement" })
			.description("Tap fn+z to volume down"),

		map({
			key_code: "x",
			modifiers: { mandatory: ["fn"] },
		})
			.to({ key_code: "volume_increment" })
			.description("Tap fn+x to volume up"),
	]);
}
