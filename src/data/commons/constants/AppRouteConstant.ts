export class AppRouteConstant {
  static initPage: string = `/`;
  static mainPage: string = `/main`;
  static scheduleDetailsPage = (id?: number) =>
    `/schedule/${id ? `${id}` : ":id"}`;
  static schedules: string = `/schedules`;
}
