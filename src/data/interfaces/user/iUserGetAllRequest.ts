import type { UserRole } from "../../commons/constants/GlobalEnumConstant";
import iGetAllRequest from "../iGetAllRequest";

export class iUserGetAllRequest extends iGetAllRequest {
  role?: UserRole;
}
