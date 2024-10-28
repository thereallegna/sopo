import { PaginationState } from '@tanstack/react-table';
import { create } from 'zustand';

type TableState = {
  pagination: PaginationState;
  setPagination: (
    pagination: PaginationState | ((prev: PaginationState) => PaginationState)
  ) => void;
};

const initialTableState = {
  pagination: {
    pageIndex: 1,
    pageSize: 10,
  } as PaginationState,
};

export const useTableStore = create<TableState>((set) => ({
  ...initialTableState,
  setPagination: (pagination) =>
    set((state) => ({
      pagination:
        typeof pagination === 'function'
          ? pagination(state.pagination)
          : pagination,
    })),
}));
