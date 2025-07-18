import { MapPin } from "lucide-react";
import UserInfoCardComponent from "../../../../data/commons/components/UserInfoCardComponent";
import ScheduleTimeBoxComponent from "./ScheduleTimeBoxComponent";
import type { iScheduleItem } from "../../../../data/interfaces/iScheduleItem";
import SkeletonCardComponent from "../../../../data/commons/components/loading/SkeletonCardComponent";
import { renderSkeletons } from "../../../../data/commons/components/HelperComponent";
import GlobalHelper from "../../../../data/commons/helpers/GlobalHelper";
import TextConstant from "../../../../data/commons/constants/TextConstant";
import { useNavigate } from "react-router-dom";
import { AppRouteConstant } from "../../../../data/commons/constants/AppRouteConstant";
import ScheduleActionComponent from "../../../../data/commons/components/ScheduleActionComponent";
import type { ScheduleStatus } from "../../../../data/commons/constants/GlobalTypeConstant";
import type { iSchedule } from "../../../../data/interfaces/schedule/iSchedule";
import ScheduleHelper from "../../../../data/commons/helpers/ScheduleHelper";

type Props = {
  schedules: iSchedule[];
  totalSchedules: number;
  onClick: (item: iScheduleItem) => void;
  isLoading: boolean;
  isSeeAll: boolean;
};

export default function ScheduleCardListComponent({
  schedules,
  totalSchedules,
  onClick,
  isLoading,
  isSeeAll = true,
}: Props) {
  const navigate = useNavigate();

  const onNavigateScheduleAll = () => {
    navigate(AppRouteConstant.schedules);
  };

  return (
    <div className="flex flex-col">
      <div className="flex justify-between items-center py-4">
        <h2 className="text-lg font-semibold">
          {TextConstant.schedule}
          {totalSchedules != 0 && (
            <span className="bg-cyan-500 text-white text-base rounded-full px-2 py-1 ml-2">
              {schedules.length}
            </span>
          )}
        </h2>
        {isSeeAll && (
          <span className="btn-see" onClick={onNavigateScheduleAll}>
            {TextConstant.seeAll}
          </span>
        )}
      </div>
      <div className="space-y-4">
        {isLoading
          ? renderSkeletons(3, SkeletonCardComponent)
          : schedules.map((e, index) => {
              const item = ScheduleHelper.convertScheduleItem(e);
              return (
                <div
                  key={index}
                  className="bg-white w-full rounded-xl shadow p-4 last:mb-30"
                  onClick={() => onClick(item)}
                >
                  <div className="flex items-center justify-between mb-4">
                    <span
                      className={`text-white text-sm px-3 py-1 rounded-full ${item.color}`}
                    >
                      {GlobalHelper.capitalizeFirstWord(item.status)}
                    </span>
                  </div>
                  <UserInfoCardComponent
                    name={item.name}
                    additionalValue={item.service}
                    avatarUrl={item.profilePicture}
                  />
                  <div className="flex flex-row items-center gap-2">
                    <MapPin className="w-5.5 h-5.5" />
                    <p className="text-xs text-gray-400 text-left my-4">
                      {item.location}
                    </p>
                  </div>
                  <ScheduleTimeBoxComponent date={item.date} time={item.time} />
                  <ScheduleActionComponent
                    id={item.id}
                    status={item.status as ScheduleStatus}
                  />
                </div>
              );
            })}
      </div>
    </div>
  );
}
