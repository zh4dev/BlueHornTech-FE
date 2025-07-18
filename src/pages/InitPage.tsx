import { Heart, UserCheck } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import CustomButtonComponent from "../data/commons/components/CustomButtonComponent";
import { AppRouteConstant } from "../data/commons/constants/AppRouteConstant";
import { UserRole } from "../data/commons/constants/GlobalEnumConstant";
import type { iUser } from "../data/interfaces/user/iUser";
import { userService } from "../data/services/userService";
import type { iUserGetAllRequest } from "../data/interfaces/user/iUserGetAllRequest";
import type { iResponseList } from "../data/interfaces/server/iResponseList";
import GlobalHelper from "../data/commons/helpers/GlobalHelper";
import { usePagination } from "../data/hooks/usePagination";
import { PaginationComponent } from "../data/commons/components/PaginationComponent";
import type { iResponse } from "../data/interfaces/server/iResponse";
import GlobalConstant from "../data/commons/constants/GlobalConstant";
import TextConstant from "../data/commons/constants/TextConstant";
import ErrorMessageConstant from "../data/commons/constants/message/ErrorMessageConstant";
import { useUserStore } from "../store/useRoleStore";
import { scheduleService } from "../data/services/scheduleService";
import useGeolocation from "../data/hooks/useGeolocation";
import { toast, ToastContainer } from "react-toastify";

export function InitPage() {
  const navigate = useNavigate();
  const { lat, lng, error } = useGeolocation();

  const [tabIndex, setTabIndex] = useState(-1);
  const [loadingIndex, setLoadingIndex] = useState<number | null>(null);
  const [isLoadingGenerate, setLoadingGenerate] = useState<boolean>(false);

  const [caregivers, setCaregivers] = useState<iUser[]>([]);
  const [clients, setClients] = useState<iUser[]>([]);
  const [isLoadingUsers, setIsLoadingUsers] = useState(false);

  const caregiverPagination = usePagination(1, 16);
  const clientPagination = usePagination(1, 16);
  const [totalPages, setTotalPages] = useState(1);

  const { setUser } = useUserStore();

  const tabs = [
    { label: TextConstant.caregiver, icon: <Heart className="w-4 h-4 mr-1" /> },
    {
      label: TextConstant.client,
      icon: <UserCheck className="w-4 h-4 mr-1" />,
    },
  ];

  const onTapLabel = async (i: number) => {
    setTabIndex(i);
    setLoadingIndex(i);
    setIsLoadingUsers(true);

    const isCaregiver = i === 0;
    const pagination = isCaregiver ? caregiverPagination : clientPagination;

    const response = await getAllUserByRole(
      isCaregiver ? UserRole.CAREGIVER : UserRole.CLIENT,
      pagination.pageNumber
    );

    if (response?.data) {
      if (response.data.list) {
        if (isCaregiver) {
          setCaregivers(response.data.list);
        } else {
          setClients(response.data.list);
        }
      }
      const total = Math.ceil(
        (response?.data.totalItems ?? 0) / pagination.pageSize
      );
      setTotalPages(total);
    }

    setLoadingIndex(null);
    setIsLoadingUsers(false);
  };

  const handleSelectUser = (user: iUser) => {
    setUser(user);
    navigate(AppRouteConstant.mainPage);
  };

  const getAllUserByRole = async (
    role: UserRole,
    pageNumber: number
  ): Promise<iResponse<iResponseList<iUser>> | null> => {
    try {
      const request: iUserGetAllRequest = {
        pageSize: GlobalConstant.maximumItemShow,
        pageNumber,
        role,
      };
      return await userService.getAll(request);
    } catch (e) {
      GlobalHelper.onCatchErrorMessage(e);
      return null;
    }
  };

  const renderUsers = (users: iUser[]) => {
    if (isLoadingUsers) {
      return <p className="text-gray-500 mt-4">{TextConstant.loading}</p>;
    }

    if (users.length === 0) {
      return (
        <p className="text-gray-500 mt-4">{ErrorMessageConstant.noUserFound}</p>
      );
    }

    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-6 w-full max-w-3xl">
        {users.map((user) => (
          <div
            key={user.id}
            onClick={() => handleSelectUser(user)}
            className="cursor-pointer p-4 border border-gray-300 rounded-xl hover:shadow-lg transition duration-200 bg-white"
          >
            <h3 className="font-semibold text-lg mb-1">{user.name}</h3>
            <p className="text-sm text-gray-600 mb-1">{user.email}</p>
            <p className="text-xs text-gray-400">{user.role}</p>
          </div>
        ))}
      </div>
    );
  };

  const resetScheduleData = async (): Promise<void> => {
    if (!lat || !lng) {
      toast(error ?? ErrorMessageConstant.unableRetrieveLocation);
      return;
    }

    setLoadingGenerate(true);

    try {
      const value = await scheduleService.resetGenerate({
        lat,
        lng,
      });
      toast(value.message ?? TextConstant.successResetGenerateData);
    } catch (e) {
      GlobalHelper.onCatchErrorMessage(e);
    }

    setLoadingGenerate(false);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-10 bg-gray-50">
      <h2 className="text-2xl font-semibold mb-6">Select your User</h2>

      <div className="flex gap-4 mb-6">
        {tabs.map((tab, i) => (
          <CustomButtonComponent
            key={tab.label}
            onClick={() => onTapLabel(i)}
            isLoading={loadingIndex === i}
            isDisable={loadingIndex !== null}
            variant={tabIndex === i ? "primary" : "outline"}
            className="flex items-center px-4 py-2 rounded-full border transition font-medium"
          >
            {tab.icon}
            {tab.label}
          </CustomButtonComponent>
        ))}
      </div>

      <CustomButtonComponent
        variant="outlineWarning"
        className="w-min mb-8"
        isLoading={isLoadingGenerate}
        onClick={resetScheduleData}
      >
        {TextConstant.resetScheduleData}
      </CustomButtonComponent>

      {tabIndex >= 0 && (
        <>
          <div className="text-gray-700 mb-4">
            {TextConstant.youreViewing}{" "}
            <b>
              {tabIndex === 0 ? TextConstant.caregiver : TextConstant.client}
            </b>
            .{TextConstant.selectToContinue}
          </div>

          {tabIndex === 0 ? renderUsers(caregivers) : renderUsers(clients)}

          <PaginationComponent
            currentPage={
              tabIndex === 0
                ? caregiverPagination.pageNumber
                : clientPagination.pageNumber
            }
            totalPages={totalPages}
            onPageChange={(page) => {
              const pagination =
                tabIndex === 0 ? caregiverPagination : clientPagination;
              pagination.setPageNumber(page);
              onTapLabel(tabIndex);
            }}
          />
        </>
      )}
      <ToastContainer />
    </div>
  );
}
