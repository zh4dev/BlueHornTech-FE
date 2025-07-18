import ApiPathConstant from "../commons/constants/ApiPathContant";
import type iGetAllRequest from "../interfaces/iGetAllRequest";
import type { iResponse } from "../interfaces/server/iResponse";
import type { iResponseList } from "../interfaces/server/iResponseList";
import type { iUser } from "../interfaces/user/iUser";
import type { iUserRequest } from "../interfaces/user/iUserRequest";
import { http } from "./support/htppService";

export const userService = {
  getAll: (request: iGetAllRequest) =>
    http.get<iResponse<iResponseList<iUser>>>(ApiPathConstant.users, request),

  create: (data: iUserRequest) =>
    http.post<iResponse<iUser>>(ApiPathConstant.users, data),

  update: (id: number, data: Partial<iUserRequest>) =>
    http.put<iResponse<iUser>>(ApiPathConstant.userById(id), data),

  delete: (id: number) =>
    http.delete<iResponse<null>>(ApiPathConstant.userById(id)),
};
