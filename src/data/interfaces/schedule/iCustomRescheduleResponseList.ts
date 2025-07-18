import type { iResponseList } from "../server/iResponseList";
import type { iSchedule } from "./iSchedule";
import type { iStats } from "./iStats";

export type iCustomRescheduleResponseList = iResponseList<iSchedule> & {
  stats: iStats | null;
  totalSchedules: number | null;
};
