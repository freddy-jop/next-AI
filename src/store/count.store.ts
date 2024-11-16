import { create } from "zustand";

export type FreeCount = {
  freeCount: number;
  setFreeCount: () => void;
  isMounted: boolean;
  updateAvailableCount: (enabled: boolean) => void;
};

export const useFreeCountStore = create<FreeCount>((set) => ({
  freeCount: 0,
  isMounted: true,
  setFreeCount: () =>
    set((state) => ({
      freeCount: state.freeCount + 1,
    })),
  updateAvailableCount: (enabled: boolean) =>
    set({
      isMounted: enabled,
    }),
}));
