export default class ApiPathConstant {
  static fallbackBaseApiUrl = "http://localhost:3005";

  /// Schedules
  static schedules = "/schedules";
  static scheduleById = (id: number) => `${this.schedules}/${id}`;
  static startVisit = (id: number) => `${this.scheduleById(id)}/start`;
  static endVisit = (id: number) => `${this.scheduleById(id)}/end`;
  static cancelVisit = (id: number) => `${this.scheduleById(id)}/cancel`;
  static startedSchedule = `${this.schedules}/started`;
  static resetGenerate = `${this.schedules}/reset-generate`;

  /// Users
  static users = "/users";
  static userById = (id: number) => `${this.users}/${id}`;

  /// Tasks
  static tasks = "/tasks";
  static taskById = (id: number) => `${this.tasks}/${id}`;
}
