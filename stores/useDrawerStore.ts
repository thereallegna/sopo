import { create } from 'zustand';

export type FilterDrawerType =
  | 'filterCountry'
  | 'filterUOM'
  | 'filterItemCategory'
  | null;
export type TableDrawerType =
  | 'getCountry'
  | 'getUOM'
  | 'getItemCategory'
  | null;
export type DetailDataType =
  | ICountry
  | IProvince
  | ICity
  | IUOM
  | ICategoryMM
  | null;

type DrawerState = {
  filterDrawerType: FilterDrawerType;
  isOpen: boolean;
  isOpenDetail: boolean;
  isOpenEdit: boolean;
  isOpenFilter: boolean;
  isOpenHistoryLog: boolean;
  openDrawer: () => void;
  openFilterDrawer: (type?: FilterDrawerType) => void;
  closeDrawer: () => void;
  closeFilterDrawer: () => void;
  closeHistoryLogDrawer: () => void;

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

  // History Log Drawer
  // data query for history log
  data_log_history_query: {
    data: TimelineQuery | null;
  };
  // data log history
  openHistoryLogDrawer: (data: TimelineQuery) => void;

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
  data_log_history_query: {
    data: null,
  },
  isOpenDetail: false,
  isOpenEdit: false,
  isOpenHistoryLog: false,
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
    }),

  openDrawer: () =>
    set({
      isOpen: true,
    }),
  openFilterDrawer: (type) =>
    set({
      isOpenFilter: true,
      filterDrawerType: type,
    }),
  openHistoryLogDrawer: (data: TimelineQuery) =>
    set({
      isOpenHistoryLog: true,
      data_log_history_query: {
        data,
      },
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
  closeHistoryLogDrawer: () =>
    set((state) => ({
      ...state,
      isOpenHistoryLog: false,
      data_log_history_query: {
        data: null,
      },
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
      isOpenHistoryLog: false,
    })),
}));
