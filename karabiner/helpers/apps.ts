import { ifApp, type BasicManipulatorBuilder } from "karabiner.ts";

// Per-map `withCondition` alternative that keeps the basic-manipulator type,
// so the result can go into hold-tap layers' permissiveHoldManipulators.
export const inApps = (file_paths: string[], ...ms: BasicManipulatorBuilder[]) =>
	ms.map((m) => m.condition(ifApp({ file_paths })));
