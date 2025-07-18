export interface iTask {
  id: number;
  title: string;
  description: string;
  completed: boolean;
  reason: string;
  scheduleId: number;
  createdAt: string;
  updatedAt: string;
}
