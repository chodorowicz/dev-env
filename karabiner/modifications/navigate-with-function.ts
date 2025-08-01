import {
	rule,
	map,
	withMapper,
	withModifier,
	type LetterKeyCode,
	type ArrowKeyCode,
} from "karabiner.ts";

export function navigateWithFunction() {
	return rule("toggle fn + h/j/k/l to arrow keys").manipulators([
		withMapper<LetterKeyCode, ArrowKeyCode>({
			j: "left_arrow",
			k: "down_arrow",
			i: "up_arrow",
			l: "right_arrow",
		} as const)((key, arrow) =>
			withModifier("??")([
				map({
					key_code: key,
					modifiers: { mandatory: ["fn"] },
				})
					.to({ key_code: arrow })
					.description(`Tap ${key} to ${arrow}`),
			])
		),
	]);
}

export function navigateWithFunctionMore() {
	return rule("toggle fn + h/j/k/l to arrow keys").manipulators([
		withMapper<LetterKeyCode, ArrowKeyCode>({
			j: "left_arrow",
			k: "down_arrow",
			i: "up_arrow",
			l: "right_arrow",
		} as const)((key, arrow) =>
			map({
				key_code: key,
				modifiers: { mandatory: ["fn", "left_shift"] },
			})
				.to({ key_code: arrow })
				.to({ key_code: arrow })
				.to({ key_code: arrow })
				.description(`Tap ${key} to ${arrow}`)
		),
	]);
}
