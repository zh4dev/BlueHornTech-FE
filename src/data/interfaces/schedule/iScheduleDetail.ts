import type { ScheduleStatus } from "../../commons/constants/GlobalTypeConstant";
import type { iTask } from "../task/iTask";
import type { iUser } from "../user/iUser";

export interface iScheduleDetail {
  id: number;
  date: Date;
  startTime: Date;
  endTime: Date;
  caregiverId: number;
  clientId: number;
  createdAt: Date;
  serviceName: string;
  serviceNotes: string;
  updatedAt: Date;
  status: ScheduleStatus;
  client: iUser;
  address: string;
  caregiver: iUser;
  visitLog?: iVisitLog;
  tasks: iTask[];
}

interface iVisitLog {
  id: number;
  scheduleId: number;
  address: string | null;
  startTime: Date;
  startLat: number;
  startLng: number;
  endTime: Date;
  endLat: number;
  endLng: number;
  createdAt: Date;
  updatedAt: Date;
}
