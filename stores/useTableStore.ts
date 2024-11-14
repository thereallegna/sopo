import { GET_CITY, GET_COUNTRY, GET_UOM } from '@constants/queryKey';
import { create } from 'zustand';
import { TableState } from '../types/client/table';

const initialTableState = {
  options: {
    [GET_COUNTRY]: {
      columnVisibility: {},
      pagination: {
        pageIndex: 0,
        pageSize: 10,
      },
      grouping: [],
      rowSize: undefined,
    },
    [GET_CITY]: {
      columnVisibility: {},
      pagination: {
        pageIndex: 0,
        pageSize: 10,
      },
      grouping: [],
      rowSize: undefined,
    },
    [GET_UOM]: {
      columnVisibility: {},
      pagination: {
        pageIndex: 0,
        pageSize: 10,
      },
      grouping: [],
      rowSize: undefined,
    },
  },
};

export const useTableStore = create<TableState>((set) => ({
  ...initialTableState,
  setPagination: (key, pagination) => {
    set((state) => {
      const currentPaginations = state.options[key] || {
        pagination: {
          pageIndex: 0,
          pageSize: 10,
        },
      };

      const newPagination =
        typeof pagination === 'function'
          ? pagination(currentPaginations.pagination)
          : pagination;

      return {
        options: {
          ...state.options,
          [key]: {
            ...currentPaginations,
            pagination: newPagination,
          },
        },
      };
    });
  },
  setSearch: (key, keyword) => {
    set((state) => {
      const currentOption = state.options[key];
      return {
        options: {
          ...state.options,
          [key]: {
            ...currentOption,
            search: keyword,
          },
        },
      };
    });
  },
  setColumnVisibility: (key, val) => {
    set((state) => {
      const currentOption = state.options[key];
      return {
        options: {
          ...state.options,
          [key]: {
            ...currentOption,
            columnVisibility: val,
          },
        },
      };
    });
  },
  setGrouping: (key, group) => {
    set((state) => {
      const currentOption = state.options[key];
      return {
        options: {
          ...state.options,
          [key]: {
            ...currentOption,
            grouping: group,
          },
        },
      };
    });
  },
  setRowSize: (key, size) => {
    set((state) => {
      const currentOption = state.options[key];
      return {
        options: {
          ...state.options,
          [key]: {
            ...currentOption,
            rowSize: size,
          },
        },
      };
    });
  },
}));
