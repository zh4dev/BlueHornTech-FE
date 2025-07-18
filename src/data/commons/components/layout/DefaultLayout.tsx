import { useEffect, type ReactNode } from "react";
import { useIsMobile } from "../../../hooks/useIsMobile";
import TextConstant from "../../constants/TextConstant";
import DesktopHeaderComponent from "../desktop/DesktopHeaderComponent";
import DesktopBottomComponent from "../desktop/DesktopBottomComponent";
import { useLogout } from "../../../hooks/useLogout";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useUserStore } from "../../../stores/useUserStore";
import ScheduleCompletedModal from "../modals/ScheduleCompleteModal";
import { useScheduleModalStore } from "../../../stores/useScheduleModalStore";

type Props = {
  children: ReactNode;
  isForceOpenMenu?: boolean;
};

export default function DefaultLayout({ children, isForceOpenMenu }: Props) {
  const { user } = useUserStore();
  const { onLogout } = useLogout();
  const isMobile = useIsMobile();
  const { showModal, date, time, duration, closeModal } =
    useScheduleModalStore();

  useEffect(() => {
    if (!user) {
      onLogout();
    }
  }, [user, onLogout]);

  return (
    <div className="min-h-screen flex flex-col">
      {!isMobile && (
        <DesktopHeaderComponent
          name={user?.name ?? TextConstant.unknown}
          email={user?.email ?? TextConstant.unknown}
          avatarUrl={user?.picture ?? TextConstant.unknown}
          onSignOut={onLogout}
          isForceOpenMenu={isForceOpenMenu}
        />
      )}
      <main className="flex-1">{children}</main>
      {!isMobile && <DesktopBottomComponent />}
      <ToastContainer />
      {showModal && (
        <ScheduleCompletedModal
          onClose={closeModal}
          date={date}
          time={time}
          duration={duration}
        />
      )}
    </div>
  );
}
