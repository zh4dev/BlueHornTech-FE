import { useEffect, useState } from "react";
import HeaderWithBackButtonComponent from "../../data/commons/components/HeaderWithBackButtonComponent";
import DefaultLayout from "../../data/commons/components/layout/DefaultLayout";
import TextConstant from "../../data/commons/constants/TextConstant";
import { scheduleService } from "../../data/services/scheduleService";
import type { iScheduleGetRequest } from "../../data/interfaces/schedule/iScheduleGetAllRequest";
import GlobalHelper from "../../data/commons/helpers/GlobalHelper";
import ScheduleCardListComponent from "./detail/components/ScheduleCardListComponent";
import { AppRouteConstant } from "../../data/commons/constants/AppRouteConstant";
import { useNavigate } from "react-router-dom";
import { PaginationComponent } from "../../data/commons/components/PaginationComponent";
import { usePagination } from "../../data/hooks/usePagination";
import GlobalConstant from "../../data/commons/constants/GlobalConstant";
import { eventBus } from "../../data/commons/helpers/EventBusHelper";
import EventBusConstant from "../../data/commons/constants/EventBusConstant";
import { useUserStore } from "../../store/useRoleStore";
import { UserRole } from "../../data/commons/constants/GlobalEnumConstant";
import type { iSchedule } from "../../data/interfaces/schedule/iSchedule";

export default function ScheduleListPage() {
  const navigate = useNavigate();

  const [schedules, setSchedules] = useState<iSchedule[]>([]);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [totalSchedule, setTotalSchedule] = useState<number>(0);

  const schedulePagination = usePagination(1, 16);
  const [totalPages, setTotalPages] = useState(1);

  const { user } = useUserStore();

  useEffect(() => {
    initializeData();
  }, []);

  useEffect(() => {
    eventBus.on(EventBusConstant.refreshScheduleList, initializeData);
    return () => {
      eventBus.off(EventBusConstant.refreshScheduleList, initializeData);
    };
  }, []);

  const initializeData = async () => {
    setLoading(true);
    setSchedules([]);
    setTotalSchedule(0);

    try {
      const request: iScheduleGetRequest = {
        pageNumber: schedulePagination.pageNumber,
        pageSize: GlobalConstant.maximumItemShow,
        caregiverId: user!.role == UserRole.CAREGIVER ? user!.id : undefined,
        clientId: user!.role == UserRole.CLIENT ? user!.id : undefined,
      };

      const val = await scheduleService.getAll(request);

      setTotalSchedule(val?.data?.totalSchedules ?? 0);

      if (val?.data?.list) {
        setSchedules(val.data.list);
      }

      setTotalPages(val.data?.totalPages ?? 0);
    } catch (error) {
      GlobalHelper.onCatchErrorMessage(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col m-5">
      <DefaultLayout>
        <HeaderWithBackButtonComponent
          title={TextConstant.scheduleList}
          onBackPressed={() => navigate(AppRouteConstant.mainPage)}
        />
        <ScheduleCardListComponent
          schedules={schedules}
          isLoading={isLoading}
          totalSchedules={totalSchedule}
          isSeeAll={false}
          onClick={(v) => navigate(AppRouteConstant.scheduleDetailsPage(v.id))}
        />
      </DefaultLayout>
      <PaginationComponent
        currentPage={schedulePagination.pageNumber}
        totalPages={totalPages}
        onPageChange={(page) => {
          schedulePagination.setPageNumber(page);
          initializeData();
        }}
      />
    </div>
  );
}
