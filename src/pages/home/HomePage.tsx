import { useNavigate } from "react-router-dom";
import UserStatSectionComponent from "./components/UserStatActionComponent";
import ScheduleCardListComponent from "../schedule/detail/components/ScheduleCardListComponent";
import ClockInCardComponent from "./components/ClockInCardComponent";
import { AppRouteConstant } from "../../data/commons/constants/AppRouteConstant";
import DefaultLayout from "../../data/commons/components/layout/DefaultLayout";
import { useIsMobile } from "../../data/hooks/useIsMobile";
import { scheduleService } from "../../data/services/scheduleService";
import { useEffect, useState } from "react";
import type { iScheduleGetRequest } from "../../data/interfaces/schedule/iScheduleGetAllRequest";
import type { iStatItem } from "../../data/interfaces/iStatItem";
import type { iScheduleItem } from "../../data/interfaces/iScheduleItem";
import GlobalHelper from "../../data/commons/helpers/GlobalHelper";
import { getStatsFromResponse } from "../../data/commons/components/HelperComponent";
import GlobalConstant from "../../data/commons/constants/GlobalConstant";
import ScheduleHelper from "../../data/commons/helpers/ScheduleHelper";
import { eventBus } from "../../data/commons/helpers/EventBusHelper";
import EventBusConstant from "../../data/commons/constants/EventBusConstant";
import { useUserStore } from "../../store/useRoleStore";
import { UserRole } from "../../data/commons/constants/GlobalEnumConstant";
import type { iSchedule } from "../../data/interfaces/schedule/iSchedule";

export default function HomePage({
  isForceOpenMenu = false,
}: {
  isForceOpenMenu?: boolean;
}) {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const { user } = useUserStore();

  const [schedules, setSchedules] = useState<iSchedule[]>([]);
  const [startedSchedule, setStartedSchedule] = useState<iScheduleItem>();
  const [stats, setStats] = useState<iStatItem[]>([]);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [totalSchedule, setTotalSchedule] = useState<number>(0);

  useEffect(() => {
    initializeData();
  }, []);

  useEffect(() => {
    eventBus.on(EventBusConstant.refreshHome, initializeData);
    return () => {
      eventBus.off(EventBusConstant.refreshHome, initializeData);
    };
  }, []);

  const initializeData = async (): Promise<void> => {
    setLoading(true);
    setSchedules([]);
    setTotalSchedule(0);

    await getAllSchedule();
    await getStartedSchedule();

    setLoading(false);
  };

  const getStartedSchedule = async () => {
    if (!isClient) {
      try {
        const val = await scheduleService.getStarted(user!.id);
        if (val?.data) {
          setStartedSchedule(ScheduleHelper.convertScheduleItem(val.data));
        }
      } catch (error) {
        GlobalHelper.onCatchErrorMessage(error);
      }
    }
  };

  const isClient = user?.role == UserRole.CLIENT;

  const getAllSchedule = async () => {
    try {
      const request: iScheduleGetRequest = {
        pageNumber: 1,
        pageSize: GlobalConstant.highlightItemShow,
        caregiverId: user!.role == UserRole.CAREGIVER ? user!.id : undefined,
        clientId: user!.role == UserRole.CLIENT ? user!.id : undefined,
        showToday: true,
      };

      const val = await scheduleService.getAll(request);

      setTotalSchedule(val?.data?.totalSchedules ?? 0);

      if (val?.data?.list) {
        setSchedules(val.data.list);
      }

      if (val?.data?.stats) {
        setStats(getStatsFromResponse(val.data.stats));
      }
    } catch (error) {
      GlobalHelper.onCatchErrorMessage(error);
    }
  };

  return (
    <DefaultLayout isForceOpenMenu={isForceOpenMenu}>
      {!isMobile && (
        <h2 className="text-xl font-semibold my-5 text-left">Dashboard</h2>
      )}
      {startedSchedule?.visitStart && (
        <ClockInCardComponent
          id={startedSchedule.id}
          name={startedSchedule.name}
          time={startedSchedule.time}
          location={startedSchedule.location}
          startDateTime={startedSchedule.visitStart}
          picture={startedSchedule.profilePicture}
        />
      )}
      <UserStatSectionComponent stats={stats} isLoading={isLoading} />
      <div className="mt-3"></div>
      <ScheduleCardListComponent
        schedules={schedules}
        isLoading={isLoading}
        totalSchedules={totalSchedule}
        isSeeAll={true}
        onClick={(v) => navigate(AppRouteConstant.scheduleDetailsPage(v.id))}
      />
    </DefaultLayout>
  );
}
