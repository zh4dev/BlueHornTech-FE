import { useNavigate } from "react-router-dom";
import { AppRouteConstant } from "../commons/constants/AppRouteConstant";
import { useUserStore } from "../stores/useUserStore";

export function useLogout() {
  const { setUser } = useUserStore();
  const navigate = useNavigate();

  const onLogout = () => {
    setUser(null);
    navigate(AppRouteConstant.initPage);
  };

  return { onLogout };
}
