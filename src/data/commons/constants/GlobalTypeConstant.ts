export type Answer = {
  selected: boolean | null;
  reason?: string;
};

export type ScheduleStatus =
  | "completed"
  | "missed"
  | "in-progress"
  | "started"
  | "upcoming";
