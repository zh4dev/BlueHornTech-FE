import { Home, User } from "lucide-react";
import { useEffect, useState } from "react";
import HomePage from "./home/HomePage";
import ProfilePage from "./ProfilePage";
import { useIsMobile } from "../data/hooks/useIsMobile";
import TextConstant from "../data/commons/constants/TextConstant";
import { useUserStore } from "../data/stores/useUserStore";

export function MainPage() {
  const [tabIndex, setTabIndex] = useState(0);
  const isMobile = useIsMobile();
  const [isForceOpenMenu, setIsForceOpenMenu] = useState(false);
  const { user } = useUserStore();

  useEffect(() => {
    if (!isMobile && tabIndex == 1) {
      setTabIndex(0);
      setIsForceOpenMenu(true);
    } else {
      setIsForceOpenMenu(false);
    }
  }, [isMobile, tabIndex]);

  if (isMobile) {
    return (
      <div className="m-5">
        <h2 className="text-xl font-semibold mb-5 text-left">
          Welcome {user?.name}!
        </h2>
        {tabIndex == 0 ? <HomePage /> : <ProfilePage />}
        <div className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 flex justify-around items-center h-16 shadow-md px-4">
          <button
            onClick={() => setTabIndex(0)}
            className={`flex flex-col items-center justify-center px-4 py-2 rounded-xl transition ${
              tabIndex === 0
                ? " text-emerald-700 font-semibold"
                : "text-gray-500 hover:bg-gray-100"
            }`}
          >
            <Home className="w-5 h-5 mb-0.5" />
            <span className="text-xs">{TextConstant.home}</span>
          </button>
          <button
            onClick={() => setTabIndex(1)}
            className={`flex flex-col items-center justify-center px-4 py-2 rounded-xl transition ${
              tabIndex === 1
                ? " text-emerald-700 font-semibold"
                : "text-gray-500 hover:bg-gray-100"
            }`}
          >
            <User className="w-5 h-5 mb-0.5" />
            <span className="text-xs">{TextConstant.profile}</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="m-5">
      <HomePage isForceOpenMenu={isForceOpenMenu} />
    </div>
  );
}
