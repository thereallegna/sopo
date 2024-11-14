import { create } from 'zustand';

export type FilterDrawerType = 'filterCountry' | 'filterUOM' | null;
export type TableDrawerType = 'getCountry' | 'getUOM' | null;
export type DetailDataType = ICountry | IProvince | ICity | IUOM | null;

type DrawerState = {
  filterDrawerType: FilterDrawerType;
  isOpen: boolean;
  isOpenDetail: boolean;
  isOpenEdit: boolean;
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

  // Detail Data Drawer
  detail_data: DetailDataType;
  setDetailData: (data: DetailDataType) => void; // Add this function
  openDetailDrawer: (data: DetailDataType) => void;
  closeDetailDrawer: () => void;

  // Edit Data Drawer
  openEditDrawer: () => void;
  closeEditDrawer: () => void;

  // Close All
  closeAllDrawer: () => void;
};

const initialDrawerState = {
  filterDrawerType: null,
  tableDrawerType: null,
  isOpen: false,
  isOpenFilter: false,
  isOpenTable: false,
  detail_data: null,
  isOpenDetail: false,
  isOpenEdit: false,
};

export const useDrawerStore = create<DrawerState>((set) => ({
  ...initialDrawerState,

  openEditDrawer: () =>
    set({
      isOpenEdit: true,
    }),
  openDetailDrawer: (data) =>
    set({
      detail_data: data,
      isOpenDetail: true,
    }),
  setDetailData: (data) =>
    set({
      detail_data: data,
    }), // This function updates the detail_data without affecting isOpenDetail

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
  closeDetailDrawer: () =>
    set((state) => ({
      ...state,
      isOpenDetail: false,
      detail_data: null,
    })),
  closeEditDrawer: () =>
    set((state) => ({
      ...state,
      isOpenEdit: false,
    })),
  closeAllDrawer: () =>
    set((state) => ({
      ...state,
      isOpen: false,
      isOpenFilter: false,
      isOpenTable: false,
      isOpenDetail: false,
      isOpenEdit: false,
    })),
}));
