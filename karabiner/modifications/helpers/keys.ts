import { FromAndToKeyCode, KeyAlias } from "karabiner.ts";

export const qwertyLeftHandKeys: (FromAndToKeyCode | KeyAlias)[] = [
	"q",
	"w",
	"e",
	"r",
	"t",
	"a",
	"s",
	"d",
	"f",
	"g",
	"z",
	"x",
	"c",
	"v",
	"b",
];

export const qwertyRightHandKeys: (FromAndToKeyCode | KeyAlias)[] = [
	"y",
	"u",
	"i",
	"o",
	"p",
	"[",
	"]",
	"\\",
	"h",
	"j",
	"k",
	"l",
	";",
	"'",
	"n",
	"m",
	",",
	".",
	"/",
	"␣",
	"⏎",
];

export const qwertyKeys = [...qwertyLeftHandKeys, ...qwertyRightHandKeys];
