import iGetAllRequest from "../iGetAllRequest";

export class iScheduleGetRequest extends iGetAllRequest {
  caregiverId?: number;
  clientId?: number;
  showToday?: boolean;
}
