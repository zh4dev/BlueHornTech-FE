import ApiPathConstant from "../commons/constants/ApiPathContant";
import { http } from "./support/htppService";
import type { iTaskUpdateRequest } from "../interfaces/task/iTaskUpdateRequest";
import type { iResponse } from "../interfaces/server/iResponse";
import type { iTask } from "../interfaces/task/iTask";
import type { iTaskCreateRequest } from "../interfaces/task/iTaskCreateRequest";

export const taskService = {
  create: (data: iTaskCreateRequest) =>
    http.post<iResponse<iTask>>(ApiPathConstant.tasks, data),

  update: (id: number, data: Partial<iTaskUpdateRequest>) =>
    http.put<iResponse<iTask>>(ApiPathConstant.taskById(id), data),
};
