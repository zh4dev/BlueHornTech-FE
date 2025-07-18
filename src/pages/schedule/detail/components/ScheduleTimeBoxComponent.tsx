import { CalendarDays, Clock } from "lucide-react";

type ScheduleTimeBoxProps = {
  date: string;
  time: string;
  className?: string;
};

export default function ScheduleTimeBoxComponent({
  date,
  time,
  className = "",
}: ScheduleTimeBoxProps) {
  return (
    <div
      className={`flex items-center text-sm text-gray-600 bg-blue-100 rounded-xl px-5 py-2 justify-between ${className}`}
    >
      <div className="flex flex-row gap-2 items-center">
        <CalendarDays className="w-4 h-4 text-sky-400" />
        <span>{date}</span>
      </div>
      <span>|</span>
      <div className="flex flex-row gap-2 items-center">
        <Clock className="w-4 h-4 text-sky-400" />
        <span>{time}</span>
      </div>
    </div>
  );
}
