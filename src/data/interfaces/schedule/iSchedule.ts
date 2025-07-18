import type { ScheduleStatus } from "../../commons/constants/GlobalTypeConstant";

export interface iSchedule {
  id: number;
  clientName: string;
  clientPicture: string;
  shiftTime: {
    start: Date;
    end: Date;
  };
  visitTime: {
    start: Date | null;
    end: Date | null;
  } | null;
  location: string;
  status: ScheduleStatus;
  serviceName: string;
  caregiver: {
    id: number;
    name: string;
  };
  date: string;
}
