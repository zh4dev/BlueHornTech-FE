import type { iSchedule } from "../../interfaces/schedule/iSchedule";
import type { iScheduleItem } from "../../interfaces/iScheduleItem";
import DateHelper from "./DateHelper";
import { toast } from "react-toastify";
import TextConstant from "../constants/TextConstant";
import GlobalHelper from "./GlobalHelper";
import { eventBus } from "./EventBusHelper";
import EventBusConstant from "../constants/EventBusConstant";
import type { iResponse } from "../../interfaces/server/iResponse";
import type { ScheduleStatus } from "../constants/GlobalTypeConstant";
import type { iScheduleDetail } from "../../interfaces/schedule/iScheduleDetail";

class ScheduleHelper {
  static formatDateTimeWithDuration = (startTime: Date) => {
    const now = new Date();
    const durationMs = now.getTime() - startTime.getTime();

    const hours = Math.floor(durationMs / (1000 * 60 * 60));
    const minutes = Math.floor((durationMs % (1000 * 60 * 60)) / (1000 * 60));

    let durationText = "";
    if (hours > 0) durationText += `${hours} hour${hours > 1 ? "s" : ""}`;
    if (minutes > 0) {
      if (durationText) durationText += " ";
      durationText += `${minutes} minute${minutes > 1 ? "s" : ""}`;
    }
    if (!durationText) durationText = "0 minutes";

    const date = now.toLocaleDateString("en-US", {
      weekday: "short",
      day: "numeric",
      month: "long",
      year: "numeric",
    });

    const time = now.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });

    return {
      date,
      time,
      duration: `(${durationText})`,
    };
  };

  static handleVisit = async (
    id: number,
    lat: number | null,
    lng: number | null,
    error: string | null,
    action: "check-in" | "check-out",
    serviceFn: (
      id: number,
      payload: { lat: number; lng: number }
    ) => Promise<iResponse<iScheduleDetail>>,
    openModal?: (date: string, time: string, duration: string) => void
  ) => {
    if (!lat || !lng) {
      toast(error ?? TextConstant.fetchingLocation);
      return;
    }

    try {
      const val = await serviceFn(id, { lat, lng });
      if (val?.success) {
        toast(
          val?.message ?? `${GlobalHelper.capitalizeFirstWord(action)} Succeed`
        );

        const startTime = val.data?.visitLog?.startTime;
        if (openModal && startTime) {
          const value = this.formatDateTimeWithDuration(startTime);
          openModal(value.date, value.time, value.duration);
        }
      }
      this.onRefreshScheduleData();
    } catch (err) {
      GlobalHelper.onCatchErrorMessage(err);
    }
  };

  static onRefreshScheduleData = () => {
    eventBus.emit(EventBusConstant.refreshHome);
    eventBus.emit(EventBusConstant.refreshScheduleList);
    eventBus.emit(EventBusConstant.refreshScheduleDetail);
  };

  static getScheduleColor = (status: ScheduleStatus): string => {
    const colorMap: Partial<Record<ScheduleStatus, string>> = {
      completed: "bg-green-700",
      missed: "bg-red-600",
      "in-progress": "bg-orange-500",
      upcoming: "bg-gray-600",
    };
    return colorMap[status] ?? "bg-gray-400";
  };

  static convertScheduleItem = (e: iSchedule): iScheduleItem => {
    const {
      id,
      status,
      shiftTime,
      clientName,
      clientPicture,
      serviceName,
      location,
      visitTime,
    } = e;
    const shiftStart = shiftTime.start;
    const shiftEnd = shiftTime.end;
    return {
      id,
      status,
      name: clientName,
      service: GlobalHelper.capitalizeEachWord(
        serviceName.replaceAll("_", " ")
      ),
      profilePicture: clientPicture,
      location,
      date: DateHelper.getFormattedDate(shiftStart),
      time: DateHelper.getFormattedTime(shiftStart, shiftEnd),
      visitStart: visitTime?.start,
      visitEnd: visitTime?.end,
      color: this.getScheduleColor(status),
    };
  };
}

export default ScheduleHelper;
