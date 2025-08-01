import {
	writeToProfile,
	mapSimultaneous,
	rule,
	layer,
	toApp,
	map,
	modifierLayer,
	duoLayer,
	withMapper,
	toKey,
	mapDoubleTap,
	withModifier,
	toStickyModifier,
	duoModifiers,
	type LetterKeyCode,
	type KeyAlias,
	type ModifierKeyAlias,
	type MultiModifierAlias,
	modifierKeyAliases,
	multiModifierAliases,
	toRemoveNotificationMessage,
} from "karabiner.ts";
import { basicModifiers } from "./modifications/basic-modifiers.ts";
// import { appsLauncher } from "./modifications/apps-launcher.ts";
import {
	navigateWithFunction,
	navigateWithFunctionMore,
} from "./modifications/navigate-with-function.ts";
import { appsLauncherWithManipulator } from "./modifications/apps-launcher.ts";
import { rightCommandToCommandTab } from "./modifications/right-command-to-command-tab.ts";
import {
	// windowManager,
	rectangleWindowNavigation,
} from "./modifications/window-manager.ts";
import { nextPreviousEntity } from "./modifications/next-previous-entity.ts";
import { moveMultipleLines } from "./modifications/move-multiple-lines.ts";
import { raycast } from "./modifications/raycast.ts";
import { backAndForth, togglePanels } from "./modifications/ui-controls.ts";
import { powerArrowNavigation } from "./modifications/arrow-navigation.ts";
import {
	navigationLayer,
	homeRowMods,
} from "./modifications/window-manager.ts";
import { hrmRule } from "./modifications/hrm.ts";

export function deleteWord() {
	return rule("test").manipulators([
		mapSimultaneous(["l", ";"]).to("delete_or_backspace", ["left_option"]),
	]);
}

function numpad() {
	return modifierLayer("Meh", "s").manipulators([
		map("m").to("1"),
		map("comma").to("2"),
		map("period").to("3"),
		map("j").to("4"),
		map("k").to("5"),
		map("l").to("6"),
		map("u").to("7"),
		map("i").to("8"),
		map("o").to("9"),
		map("p").to("0"),
	]);
}

function layer_digitAndDelete() {
	let hint = `\
0    1  2  3    4  5  6    7  8  9    +  -  /  *    .    ⌫_⌥_⌘  ⌦
N   M  ,   .     J  K  L    U  I  O    P  ;   /  ]    [      '   H   Y    \\`;
	let layer = duoLayer("d", ";").threshold(250).notification(hint);
	return layer.manipulators([
		// digits keypad_{i}
		withMapper([
			"n", //             // 0
			...["m", ",", "."], // 1 2 3
			...["j", "k", "l"], // 4 5 6
			...["u", "i", "o"], // 7 8 9
		] as const)((k, i) => map(k).to(`keypad_${i as 0}`)),

		// + - / * .
		{
			p: toKey("=", "⇧"), // +
			";": toKey("-"), // // -
			// / stay           // /
			"]": toKey(8, "⇧"), // *

			"[": toKey("keypad_period"),
		},

		// delete ⌫ ⌦
		{
			"\\": toKey("⌦"),

			"'": toKey("⌫"),
			h: toKey("⌫", "⌥"),
			y: toKey("⌫", "⌘"),
		},

		// F1 - F9
		withMapper([1, 2, 3, 4, 5, 6, 7, 8, 9])((k) => map(k).to(`f${k}`)),
	]);
}

// Make a screenshot with double tap 4
function screenshot() {
	// return mapDoubleTap("4").to("4", "cmd", "shift").singleTap(toKey("4"));
	// return map("4").toIfHeldDown("4", "cmd", "shift").singleTap(toKey("4"));
	return rule("screenshot").manipulators([
		mapDoubleTap("4").to("4", "⌘⇧").singleTap(toKey("4")).parameters({
			"basic.to_delayed_action_delay_milliseconds": 100,
			"basic.to_if_held_down_threshold_milliseconds": 100,
		}),
	]);
}

// map meh + d to escape
function escape() {
	return rule("escape").manipulators([
		withModifier("Meh")([map("d").to("escape")]),
	]);
}

/** Modifiers via 2 keys. e.g. f+d -> ⌘ */
export function duoModifiers(
	v: Partial<
		Record<
			"⌘" | "⌥" | "⌃" | "⇧" | MultiModifierAlias,
			`${LetterKeyCode | KeyAlias}${LetterKeyCode | KeyAlias}`[]
		>
	>
) {
	let result = [];

	for (let [m, k] of Object.entries(v)) {
		for (let keys of k) {
			let id = k + m;
			let [firstMod, ...restMods] = (
				m in modifierKeyAliases
					? [modifierKeyAliases[m as ModifierKeyAlias]]
					: multiModifierAliases[m as MultiModifierAlias]
			) as Array<"command" | "control" | "option" | "shift">;

			result.push(
				mapSimultaneous(keys.split("") as (LetterKeyCode | KeyAlias)[], {
					to_after_key_up: [toRemoveNotificationMessage(id)],
				})
					.toNotificationMessage(id, m) // Must go first or to() doesn't work
					.to(`left_${firstMod}`, restMods)
			);
		}
	}

	return result;
}

function rule_duoModifiers() {
	return rule("duo-modifiers").manipulators(
		duoModifiers({
			"⌘": ["fd", "jk"], // ⌘ first as used the most
			"⌃": ["fs", "jl"], // ⌃ second as Vim uses it
			"⌥": ["fa", "j;"], // ⌥ last as used the least

			"⇧": ["ds", "kl"],

			"⌘⇧": ["gd", "hk"],
			"⌃⇧": ["gs", "hl"],
			"⌥⇧": ["ga", "h;"],

			"⌘⌥": ["vc", "m,"],
			"⌘⌃": ["vx", "m."],
			"⌥⌃": ["cx", ",."],

			"⌘⌥⌃": ["vz", "m/"],
		})
	);
}

writeToProfile(
	"Default profile",
	[
		basicModifiers(),
		// navigateWithFunction(),
		rightCommandToCommandTab(),
		// appsLauncher(),
		...appsLauncherWithManipulator(),
		// windowManager(),
		...nextPreviousEntity(),
		...backAndForth(),
		// moveMultipleLines(),
		// navigateWithFunctionMore(),
		// raycast(),
		// arrowNavigation(),
		// arrowNavigationJumpWord(),
		// powerArrowNavigation(),
		rectangleWindowNavigation(),
		...navigationLayer(),
		deleteWord(),
		// numpad(),
		layer_digitAndDelete(),
		togglePanels(),
		screenshot(),
		escape(),
		// rule_duoModifiers(),
		// homeRowMods(),
		// delayedLayer(),
		hrmRule,
	],
	{
		"basic.to_if_held_down_threshold_milliseconds": 100,
		"basic.to_delayed_action_delay_milliseconds": 200,
		"basic.simultaneous_threshold_milliseconds": 50,
	}
);
