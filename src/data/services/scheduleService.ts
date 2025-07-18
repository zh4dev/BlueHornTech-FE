import ApiPathConstant from "../commons/constants/ApiPathContant";
import type { iCustomRescheduleResponseList } from "../interfaces/schedule/iCustomRescheduleResponseList";
import type { iScheduleDetail } from "../interfaces/schedule/iScheduleDetail";
import type { iSchedule } from "../interfaces/schedule/iSchedule";
import type { iScheduleGetRequest } from "../interfaces/schedule/iScheduleGetAllRequest";
import type { iScheduleRequest } from "../interfaces/schedule/iScheduleRequest";
import type { iVisitRequest } from "../interfaces/schedule/iVisitRequest";
import type { iResponse } from "../interfaces/server/iResponse";
import { http } from "./support/htppService";

export const scheduleService = {
  getAll: (request: iScheduleGetRequest) =>
    http.get<iResponse<iCustomRescheduleResponseList>>(
      ApiPathConstant.schedules,
      request
    ),

  getById: (id: number) =>
    http.get<iResponse<iScheduleDetail>>(ApiPathConstant.scheduleById(id)),

  create: (data: iScheduleRequest) =>
    http.post<iResponse<iScheduleDetail>>(ApiPathConstant.schedules, data),

  getStarted: (caregiverId: number) =>
    http.post<iResponse<iSchedule>>(ApiPathConstant.startedSchedule, {
      caregiverId,
    }),

  update: (id: number, data: Partial<iScheduleRequest>) =>
    http.put<iResponse<iScheduleDetail>>(
      ApiPathConstant.scheduleById(id),
      data
    ),

  delete: (id: number) =>
    http.delete<iResponse<null>>(ApiPathConstant.scheduleById(id)),

  startVisit: (id: number, data: iVisitRequest) =>
    http.post<iResponse<iScheduleDetail>>(ApiPathConstant.startVisit(id), data),

  resetGenerate: (data: iVisitRequest) =>
    http.post<iResponse<iScheduleDetail>>(ApiPathConstant.resetGenerate, data),

  endVisit: (id: number, data: iVisitRequest) =>
    http.post<iResponse<iScheduleDetail>>(ApiPathConstant.endVisit(id), data),

  cancelVisit: (id: number) =>
    http.put<iResponse<iScheduleDetail>>(ApiPathConstant.cancelVisit(id), {}),
};
