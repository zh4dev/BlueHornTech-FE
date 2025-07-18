import type { iTask } from "../task/iTask";

export interface iScheduleRequest {
  date: string;
  startTime: string;
  endTime: string;
  caregiverId: number;
  clientId: number;
  tasks: iTask[];
}
