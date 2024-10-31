import { create } from 'zustand';

type DrawerType = 'CREATE_COUNTRY' | 'EDIT_COUNTRY' | 'DELETE_COUNTRY' | null;
type FilterDrawerType = 'FILTER_COUNTRY' | null;
type TableDrawerType = 'GET_COUNTRY' | null;

type DrawerState = {
  drawerType: DrawerType;
  filterDrawerType: FilterDrawerType;
  tableDrawerType: TableDrawerType;
  isOpen: boolean;
  isOpenFilter: boolean;
  isOpenTable: boolean;
  openDrawer: (type?: DrawerType) => void;
  openFilterDrawer: (type?: FilterDrawerType) => void;
  openTableDrawer: (type?: TableDrawerType) => void;
  closeDrawer: () => void;
  closeFilterDrawer: () => void;
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
  openTableDrawer: (type) =>
    set({
      isOpenTable: true,
      tableDrawerType: type,
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
