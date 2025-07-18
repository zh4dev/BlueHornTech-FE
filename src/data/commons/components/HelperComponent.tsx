import type { iStatItem } from "../../interfaces/iStatItem";
import type { iStats } from "../../interfaces/schedule/iStats";
import TextConstant from "../constants/TextConstant";

export const renderSkeletons = (
  count: number,
  Component: React.ComponentType,
  props?: Record<string, any>
) => Array.from({ length: count }, (_, i) => <Component key={i} {...props} />);

export const getStatsFromResponse = (stats: iStats): iStatItem[] => [
  {
    value: stats.missed,
    color: "text-red-600",
    label: TextConstant.missedSchedule,
  },
  {
    value: stats.upcoming,
    color: "text-orange-500",
    label: (
      <>
        Upcoming Today&apos;s
        <br />
        Schedule
      </>
    ),
  },
  {
    value: stats.completed,
    color: "text-green-600",
    label: (
      <>
        Today&apos;s Completed
        <br />
        Schedule
      </>
    ),
  },
];
