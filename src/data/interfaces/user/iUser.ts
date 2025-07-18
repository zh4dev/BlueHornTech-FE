import type { UserRole } from "../../commons/constants/GlobalEnumConstant";

export interface iUser {
  id: number;
  name: string;
  address: string;
  email: string;
  phone: string;
  picture: string;
  role: UserRole;
}
