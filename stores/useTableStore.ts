import { GET_COUNTRY } from '@constants/queryKey';
import { PaginationState, VisibilityState } from '@tanstack/react-table';
import { create } from 'zustand';
import { TableOptionState } from '../types/client/table';

type TableState = {
  options: Record<string, TableOptionState>;
  setPagination: (
    key: string,
    pagination: PaginationState | ((prev: PaginationState) => PaginationState)
  ) => void;
  setSearch: (key: string, keyword: string) => void;
  setColumnVisibility: (key: string, val: VisibilityState) => void;
};

const initialTableState = {
  options: {
    [GET_COUNTRY]: {
      columnVisibility: {},
      pagination: {
        pageIndex: 0,
        pageSize: 10,
      },
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
}));
