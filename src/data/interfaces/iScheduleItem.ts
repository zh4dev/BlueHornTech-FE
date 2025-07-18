export type iScheduleItem = {
  id: number;
  status: string;
  name: string;
  profilePicture: string;
  service: string;
  location: string;
  date: string;
  time: string;
  visitStart: Date | null | undefined;
  visitEnd: Date | null | undefined;
  color: string;
};
