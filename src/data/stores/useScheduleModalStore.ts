import { create } from "zustand";

interface ModalState {
  showModal: boolean;
  date: string;
  time: string;
  duration: string;
  openModal: (date: string, time: string, duration: string) => void;
  closeModal: () => void;
}

export const useScheduleModalStore = create<ModalState>((set) => ({
  showModal: false,
  date: "",
  time: "",
  duration: "",
  openModal: (date, time, duration) =>
    set({ showModal: true, date, time, duration }),
  closeModal: () => set({ showModal: false }),
}));
