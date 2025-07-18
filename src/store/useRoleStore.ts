import { create } from "zustand";
import { getCookie, setCookie, deleteCookie } from "cookies-next";
import type { iUser } from "../data/interfaces/user/iUser";
import LocalStorageConstant from "../data/commons/constants/LocalStorageConstant";

type UserState = {
  user: iUser | null;
  setUser: (user: iUser | null) => void;
  logout: () => void;
};

export const useUserStore = create<UserState>((set) => ({
  user:
    typeof window !== "undefined"
      ? getCookie(LocalStorageConstant.userStorage)
        ? JSON.parse(getCookie(LocalStorageConstant.userStorage) as string)
        : null
      : null,

  setUser: (user) => {
    if (user) {
      setCookie(LocalStorageConstant.userStorage, JSON.stringify(user), {
        maxAge: 60 * 60 * 24 * 7,
      });
    } else {
      deleteCookie(LocalStorageConstant.userStorage);
    }
    set({ user });
  },

  logout: () => {
    deleteCookie(LocalStorageConstant.userStorage);
    set({ user: null });
  },
}));
