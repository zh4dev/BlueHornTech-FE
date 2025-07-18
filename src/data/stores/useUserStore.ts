import { create } from "zustand";
import { getCookie, setCookie, deleteCookie } from "cookies-next";
import type { iUser } from "../interfaces/user/iUser";
import LocalStorageConstant from "../commons/constants/LocalStorageConstant";

const USER_KEY = LocalStorageConstant.userStorage;

const getStoredUser = (): iUser | null => {
  const data =
    typeof window !== "undefined"
      ? (getCookie(USER_KEY) as string) ?? localStorage.getItem(USER_KEY)
      : null;

  try {
    return data ? JSON.parse(data) : null;
  } catch {
    return null;
  }
};

const storeUser = (user: iUser) => {
  const userData = JSON.stringify(user);
  localStorage.setItem(USER_KEY, userData);
  setCookie(USER_KEY, userData);
};

const clearUser = () => {
  localStorage.removeItem(USER_KEY);
  deleteCookie(USER_KEY);
};

type UserState = {
  user: iUser | null;
  setUser: (user: iUser | null) => void;
  logout: () => void;
  getUser: () => iUser | null;
};

export const useUserStore = create<UserState>((set) => ({
  user: getStoredUser(),

  getUser: () => getStoredUser(),

  setUser: (user) => {
    if (user) {
      storeUser(user);
    } else {
      clearUser();
    }
    set({ user });
  },

  logout: () => {
    clearUser();
    set({ user: null });
  },
}));
