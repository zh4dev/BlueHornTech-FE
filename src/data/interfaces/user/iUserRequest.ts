import type { iUser } from "./iUser";

export type iUserRequest = Omit<iUser, "id">;
