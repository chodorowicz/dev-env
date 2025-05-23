import { to$ } from "karabiner_ts";

export function toRectanglePro(action: string) {
	return to$(`open -g "rectangle-pro://execute-action?name=${action}"`);
}
