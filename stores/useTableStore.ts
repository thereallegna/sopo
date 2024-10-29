import { GET_COUNTRY } from '@constants/queryKey';
import { PaginationState } from '@tanstack/react-table';
import { create } from 'zustand';

type PaginationStoreState = {
  pagination: PaginationState;
};

type TableState = {
  paginations: Record<string, PaginationStoreState>;
  setPagination: (
    key: string,
    pagination: PaginationState | ((prev: PaginationState) => PaginationState)
  ) => void;
};

const initialTableState = {
  paginations: {
    [GET_COUNTRY]: {
      pagination: {
        pageIndex: 1,
        pageSize: 10,
      },
    },
  } as Record<string, PaginationStoreState>,
};

export const useTableStore = create<TableState>((set) => ({
  ...initialTableState,
  setPagination: (key, pagination) => {
    set((state) => {
      const currentPaginations = state.paginations[key] || {
        pagination: {
          pageIndex: 1,
          pageSize: 10,
        },
      };

      const newPagination =
        typeof pagination === 'function'
          ? pagination(currentPaginations.pagination)
          : pagination;

      return {
        paginations: {
          ...state.paginations,
          [key]: {
            ...currentPaginations,
            pagination: newPagination,
          },
        },
      };
    });
  },
}));
