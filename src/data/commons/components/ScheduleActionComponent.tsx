import React from "react";
import { useLocation } from "react-router-dom";
import { showConfirmDialog } from "./AlertDialog";
import TextConstant from "../constants/TextConstant";
import CustomButtonComponent from "./CustomButtonComponent";
import type { ScheduleStatus } from "../constants/GlobalTypeConstant";
import { useUserStore } from "../../stores/useUserStore";
import { UserRole } from "../constants/GlobalEnumConstant";
import { AppRouteConstant } from "../constants/AppRouteConstant";
import { useScheduleModalStore } from "../../stores/useScheduleModalStore";
import ScheduleHelper from "../helpers/ScheduleHelper";
import useGeolocation from "../../hooks/useGeolocation";
import { scheduleService } from "../../services/scheduleService";
import { toast } from "react-toastify";
import GlobalHelper from "../helpers/GlobalHelper";

interface ScheduleActionButtonsProps {
  id: number;
  status: ScheduleStatus;
}

const ScheduleActionComponent: React.FC<ScheduleActionButtonsProps> = ({
  id,
  status,
}) => {
  const { user } = useUserStore();

  const location = useLocation();
  const { lat, lng, error } = useGeolocation();

  const isClient = user?.role == UserRole.CLIENT;
  const isDetail = location.pathname.includes(
    AppRouteConstant.scheduleDetailsPage(id)
  );
  const openModal = useScheduleModalStore((state) => state.openModal);

  const handleClockIn = (e: React.MouseEvent) => {
    e.stopPropagation();
    showConfirmDialog(TextConstant.clockInTitle, TextConstant.clockInDesc, () =>
      ScheduleHelper.handleVisit(
        id,
        lat,
        lng,
        error,
        "check-in",
        scheduleService.startVisit
      )
    );
  };

  const handleClockOut = (e: React.MouseEvent) => {
    e.stopPropagation();
    showConfirmDialog(
      TextConstant.clockOutTitle,
      TextConstant.clockOutDesc,
      () =>
        ScheduleHelper.handleVisit(
          id,
          lat,
          lng,
          error,
          "check-in",
          scheduleService.endVisit,
          openModal
        )
    );
  };

  const onCancelVisit = async () => {
    try {
      const val = await scheduleService.cancelVisit(id);
      if (val?.success) {
        toast(
          val?.message ??
            `${GlobalHelper.capitalizeFirstWord(
              TextConstant.cancelVisitSuccess
            )} Succeed`
        );
      }
      ScheduleHelper.onRefreshScheduleData();
    } catch (err) {
      GlobalHelper.onCatchErrorMessage(err);
    }
  };

  const handleStatusProgress = () => {
    if (isDetail) {
      showConfirmDialog(
        TextConstant.cancelVisitTitle,
        TextConstant.cancelVisitDesc,
        onCancelVisit
      );
    }
  };

  const handleViewReport = () => {};

  if (status === "completed" && !isDetail) {
    return (
      <CustomButtonComponent
        variant="outline"
        className="mt-3"
        onClick={handleViewReport}
      >
        {TextConstant.viewReport}
      </CustomButtonComponent>
    );
  }

  if (status === "in-progress" && !isClient) {
    return (
      <div className="flex gap-3 mt-3 justify-between w-full">
        <CustomButtonComponent
          variant={isDetail ? "outlineWarning" : "outline"}
          onClick={handleStatusProgress}
          className="flex-1"
        >
          {isDetail ? TextConstant.cancelClockIn : TextConstant.viewProgress}
        </CustomButtonComponent>
        <CustomButtonComponent
          variant="primary"
          onClick={handleClockOut}
          className="flex-1"
        >
          {TextConstant.clockOutNow}
        </CustomButtonComponent>
      </div>
    );
  }

  if (status === "started" && !isClient) {
    return (
      <CustomButtonComponent
        variant="primary"
        className="mt-3"
        onClick={handleClockIn}
      >
        {TextConstant.clockInNow}
      </CustomButtonComponent>
    );
  }

  return null;
};

export default ScheduleActionComponent;
