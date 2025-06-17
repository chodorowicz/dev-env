import {
  rule,
  withModifier,
  FromModifierParam,
  map,
  toApp,
  toSetVar,
  ifVar,
  withCondition,
} from "karabiner_ts";
import { appsConfig } from "./apps-config.ts";

export function appsLauncher(modifier: FromModifierParam = "Meh") {
  return [
    rule("Launch Apps").manipulators([
      withModifier(modifier)({
        ...appsConfig(),
      }),
    ]),
  ];
}

export function appsLauncherWithManipulator() {
  return [
    rule("apps").manipulators([
      withModifier("right_command")([
        map("b")
          .toVar("app_layer", "b")
          .toAfterKeyUp(toSetVar("app_layer", 0))
          .toIfAlone(toApp("BoltAI")),
        map("e")
          .toVar("app_layer", "e")
          .toAfterKeyUp(toSetVar("app_layer", 0))
          .toIfAlone(toApp("eM Client")),
        map("f")
          .toVar("app_layer", "f")
          .toAfterKeyUp(toSetVar("app_layer", 0))
          .toIfAlone(toApp("Finder")),
        map("s")
          .toVar("app_layer", "s")
          .toAfterKeyUp(toSetVar("app_layer", 0))
          .toIfAlone(toApp("Slack")),
        map("l")
          .toVar("app_layer", "l")
          .toAfterKeyUp(toSetVar("app_layer", 0))
          .toIfAlone(toApp("Linear")),
        map(";")
          .toVar("app_layer", ";")
          .toAfterKeyUp(toSetVar("app_layer", 0))
          .toIfAlone(toApp("Polypane")),
        map("m")
          .toVar("app_layer", "m")
          .toAfterKeyUp(toSetVar("app_layer", 0))
          .toIfAlone(toApp("Marvin")),
        map("n")
          .toVar("app_layer", "n")
          .toAfterKeyUp(toSetVar("app_layer", 0))
          .toIfAlone(toApp("Notion")),
        map("p")
          .toVar("app_layer", "p")
          .toAfterKeyUp(toSetVar("app_layer", 0))
          .toIfAlone(toApp("1Password")),
        withCondition(ifVar("app_layer", "f"))([map("o").to(toApp("Fork"))]),
        withCondition(ifVar("app_layer", "f"))([map("i").to(toApp("Figma"))]),
        withCondition(ifVar("app_layer", "s"))([map("i").to(toApp("Signal"))]),
        withCondition(ifVar("app_layer", "p"))([map("o").to(toApp("Postman"))]),
        withCondition(ifVar("app_layer", "m"))([map("a").to(toApp("Mail"))]),
        withCondition(ifVar("app_layer", "n"))([map("o").to(toApp("Notion Mail"))]),
      ]),
    ]),
    rule("apps").manipulators([withModifier(["right_command"])(appsConfig())]),
  ];
}
