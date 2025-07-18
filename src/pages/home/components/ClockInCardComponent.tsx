import { Clock1, MapPin, Timer } from "lucide-react";
import CustomButtonComponent from "../../../data/commons/components/CustomButtonComponent";
import UserInfoCardComponent from "../../../data/commons/components/UserInfoCardComponent";
import TimerComponent from "../../../data/commons/components/TimerComponent";
import TextConstant from "../../../data/commons/constants/TextConstant";
import useGeolocation from "../../../data/hooks/useGeolocation";
import ScheduleHelper from "../../../data/commons/helpers/ScheduleHelper";
import { scheduleService } from "../../../data/services/scheduleService";
import { showConfirmDialog } from "../../../data/commons/components/AlertDialog";
import { useScheduleModalStore } from "../../../data/stores/useScheduleModalStore";

type Props = {
  id: number;
  name: string;
  time: string;
  picture: string;
  location: string;
  startDateTime: Date;
};

export default function ClockInCardComponent({
  id,
  name,
  time,
  picture,
  startDateTime,
  location,
}: Props) {
  const { lat, lng, error } = useGeolocation();
  const openModal = useScheduleModalStore((state) => state.openModal);

  const onCheckOut = (id: number) => {
    showConfirmDialog(
      TextConstant.clockOutTitle,
      TextConstant.clockOutDesc,
      () => {
        ScheduleHelper.handleVisit(
          id,
          lat,
          lng,
          error,
          "check-out",
          scheduleService.endVisit,
          openModal
        );
      }
    );
  };

  return (
    <div className="rounded-xl bg-primary flex flex-col p-5 mb-5">
      <TimerComponent
        startDateTime={startDateTime}
        className="text-white"
      ></TimerComponent>
      <UserInfoCardComponent
        name={name}
        avatarUrl={picture}
        className="text-white"
      />
      <div className="flex flex-row items-center gap-2 text-white mt-2">
        <MapPin className="w-4 h-4" />
        <p className="text-sm text-left">{location}</p>
      </div>
      <div className="flex flex-row items-center gap-2 text-white mt-2">
        <Clock1 className="w-4 h-4" />
        <p className="text-sm text-left">{time}</p>
      </div>
      <CustomButtonComponent
        variant="outline"
        className="mt-3 bg-white"
        onClick={() => onCheckOut(id)}
      >
        <div className="flex flex-row items-center justify-center gap-2 self-center">
          <Timer />
          <span className="font-bold">{TextConstant.clockOut}</span>
        </div>
      </CustomButtonComponent>
    </div>
  );
}
