import { create } from 'zustand';

export type DrawerType =
  | 'createCountry'
  | 'editCountry'
  | 'deleteCountry'
  | null;
export type FilterDrawerType = 'filterCountry' | null;
export type TableDrawerType = 'getCountry' | null;

type DrawerState = {
  drawerType: DrawerType;
  filterDrawerType: FilterDrawerType;
  isOpen: boolean;
  isOpenFilter: boolean;
  openDrawer: () => void;
  openFilterDrawer: (type?: FilterDrawerType) => void;
  closeDrawer: () => void;
  closeFilterDrawer: () => void;

  // Table Drawer
  isOpenTable: boolean;
  tableDrawerType: TableDrawerType;
  openTableDrawer: () => void;
  closeTableDrawer: () => void;
};

const initialDrawerState = {
  drawerType: null,
  filterDrawerType: null,
  tableDrawerType: null,
  isOpen: false,
  isOpenFilter: false,
  isOpenTable: false,
};

export const useDrawerStore = create<DrawerState>((set) => ({
  ...initialDrawerState,
  openDrawer: () =>
    set({
      isOpen: true,
    }),
  openFilterDrawer: (type) =>
    set({
      isOpenFilter: true,
      filterDrawerType: type,
    }),
  openTableDrawer: () =>
    set({
      isOpenTable: true,
    }),
  closeDrawer: () =>
    set((state) => ({
      ...state,
      isOpen: false,
    })),
  closeFilterDrawer: () =>
    set((state) => ({
      ...state,
      isOpenFilter: false,
    })),
  closeTableDrawer: () =>
    set((state) => ({
      ...state,
      isOpenTable: false,
    })),
}));
