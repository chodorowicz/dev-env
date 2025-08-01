import { ifDevice, ifVar, map, rule, withMapper } from "karabiner.ts";

export function navigateWithLetters() {
	/** not apple keyboard */
	const ifNotSelfMadeKeyboard = ifDevice([
		{ product_id: 1, vendor_id: 22854 }, // Claw44
	]).unless();

	/**
	 * trackpad touched
	 * if not touched, multi touch finger count is 0
	 */
	const ifTrackpadTouched = ifVar(
		"multitouch_extension_finger_count_total",
		0
	).unless();

	return rule(
		"toggle h/j/k/l to arrow keys",
		ifTrackpadTouched,
		ifNotSelfMadeKeyboard
	).manipulators([
		withMapper({
			j: "left_arrow",
			k: "down_arrow",
			i: "up_arrow",
			l: "right_arrow",
		} as const)((key, arrow) =>
			map({ key_code: key })
				.to({ key_code: arrow })
				.description(`Tap ${key} to ${arrow}`)
		),
	]);
}
