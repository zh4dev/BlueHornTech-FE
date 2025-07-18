import type { iTask } from "./iTask";

export type iTaskUpdateRequest = Pick<iTask, "completed" | "reason">;
