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
} from "karabiner_ts";
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
import { navigationLayer } from "./modifications/window-manager.ts";

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

writeToProfile("Default profile", [
	basicModifiers(),
	// navigateWithFunction(),
	rightCommandToCommandTab(),
	// appsLauncher(),
	...appsLauncherWithManipulator(),
	// windowManager(),
	nextPreviousEntity(),
	backAndForth(),
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
]);
