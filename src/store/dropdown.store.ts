import { create } from "zustand";

export type DropDownType = {
  openDropdown: boolean;
  toggleDropdown: () => void;
};

export const useDropdownStore = create<DropDownType>((set) => ({
  openDropdown: false,
  toggleDropdown: () =>
    set((state) => ({
      openDropdown: !state.openDropdown,
    })),
}));
