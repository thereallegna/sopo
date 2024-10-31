import { create } from 'zustand';

type DrawerType = 'CREATE_COUNTRY' | 'EDIT_COUNTRY' | 'DELETE_COUNTRY' | null;
type FilterDrawerType = 'FILTER_COUNTRY' | null;

type DrawerState = {
  drawerType: DrawerType;
  filterDrawerType: FilterDrawerType;
  isOpen: boolean;
  isOpenFilter: boolean;
  openDrawer: (type?: DrawerType) => void;
  openFilterDrawer: (type?: FilterDrawerType) => void;
  closeDrawer: () => void;
};

const initialDrawerState = {
  drawerType: null,
  filterDrawerType: null,
  isOpen: false,
  isOpenFilter: false,
};

export const useDrawerStore = create<DrawerState>((set) => ({
  ...initialDrawerState,
  openDrawer: (type) =>
    set({
      drawerType: type,
      isOpen: true,
    }),
  openFilterDrawer: (type) =>
    set({
      isOpenFilter: true,
      filterDrawerType: type,
    }),
  closeDrawer: () => set({ ...initialDrawerState }),
}));
