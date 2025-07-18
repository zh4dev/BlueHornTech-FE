import type { iTask } from "./iTask";

export type iTaskCreateRequest = Pick<iTask, "title" | "description"> & {
  scheduleId: number;
};
