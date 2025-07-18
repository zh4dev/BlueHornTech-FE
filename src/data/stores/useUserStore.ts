import { create } from "zustand";
import { getCookie, setCookie, deleteCookie } from "cookies-next";
import type { iUser } from "../interfaces/user/iUser"; // Define your user type
import LocalStorageConstant from "../commons/constants/LocalStorageConstant";

type UserState = {
  user: iUser | null;
  setUser: (user: iUser | null) => void;
  logout: () => void;
  getUser: () => iUser | null;
};

export const useUserStore = create<UserState>((set) => ({
  user:
    typeof window !== "undefined"
      ? getCookie(LocalStorageConstant.userStorage)
        ? JSON.parse(getCookie(LocalStorageConstant.userStorage) as string)
        : null
      : null,
  getUser: (): iUser | null => {
    const userData = getCookie(LocalStorageConstant.userStorage);
    if (userData) {
      return JSON.parse(userData as string);
    }
    return null;
  },
  setUser: (user) => {
    if (user) {
      setCookie(LocalStorageConstant.userStorage, JSON.stringify(user), {
        maxAge: 60 * 60 * 24 * 2,
      });
    } else {
      deleteCookie(LocalStorageConstant.userStorage);
    }
    set({ user });
  },

  logout: () => {
    deleteCookie("user");
    set({ user: null });
  },
}));
