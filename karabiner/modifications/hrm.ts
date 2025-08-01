import { Manipulator, map, rule } from "karabiner.ts";
import { hrm } from "karabiner.ts-greg-mods";

export const hrmRule = rule("Home row mods").manipulators(
	hrm(
		new Map([
			["a", "l⌃"],
			["s", "l⌥"],
			["d", "l⌘"],
			["f", "l⇧"],
			["j", "r⇧"],
			["k", "r⌘"],
			["l", "r⌥"],
			[";", "r⌃"],
		])
	)
		.lazy(true)
		.holdTapStrategy("permissive-hold")
		.chordalHold(true)
		// // Some overrides for modded keys:
		// .smartManipulators(
		//   "l⌃",
		//   map("h").to("⌫"),
		//   // In Chrome, L⌃ + I/O navigate history.
		//   map("i").to("→", "l⌘").condition(ifApp("Chrome")),
		//   map("o").to("←", "l⌘").condition(ifApp("Chrome")),
		//   // L⌃ + N/P navigate dropdowns.
		//   map("n").to("↓").condition(unlessKitty),
		//   map("p").to("↑").condition(unlessKitty)
		// )
		// .smartManipulators(
		//   "⌃",
		//   // ⌃W deletes a word.
		//   map("w").to("⌫", "l⌥").condition(unlessKitty)
		// )
		// .smartManipulators("l⌥", ...commaPeriodMoveChromeTabs)
		// I press this combo a lot nad it’s hard to roll over it, so use a more
		// responsive strategy.
		// .keys("l⌥", ["w", "q"], "hold-on-other-key-press")
		.build()
);
