import {
  GET_CITY,
  GET_COUNTRY,
  GET_UOM,
  GET_PROVINCE,
  GET_CATEGORY_MATERIAL_MANAGEMENT,
  // GET_COA,
  GET_MASTER_ITEM_MATERIAL_MANAGEMENT,
  GET_STOCK_MUTATION,
  GET_CURRENCY,
  GET_INITIAL_STOCK,
  GET_WAREHOUSE_CATEGORY,
  GET_WAREHOUSE,
  GET_STOCK_SUMMARY,
  GET_STOCK_MOVEMENT,
  GET_STOCK_ADJUSTMENT,
  GET_DETAIL_BY_WAREHOUSE_STOCK_ADJUSTMENT,
  GET_DETAIL_STOCK_MUTATION,
  GET_DIRECT_PURCHASE_RECEIVE,
} from '@constants/queryKey';
import { create } from 'zustand';
import { paginationStateDefaultValue } from '@constants/defaultValues';
import { TableState } from '../types/client/table';

const initialTableState = {
  options: {
    [GET_COUNTRY]: paginationStateDefaultValue,
    [GET_CITY]: paginationStateDefaultValue,
    [GET_PROVINCE]: paginationStateDefaultValue,
    // [GET_COA]: paginationStateDefaultValue,
    [GET_UOM]: paginationStateDefaultValue,
    [GET_CATEGORY_MATERIAL_MANAGEMENT]: paginationStateDefaultValue,
    [GET_MASTER_ITEM_MATERIAL_MANAGEMENT]: paginationStateDefaultValue,
    [GET_STOCK_MUTATION]: paginationStateDefaultValue,
    [GET_CURRENCY]: paginationStateDefaultValue,
    [GET_INITIAL_STOCK]: paginationStateDefaultValue,
    [GET_STOCK_ADJUSTMENT]: paginationStateDefaultValue,
    [GET_WAREHOUSE_CATEGORY]: paginationStateDefaultValue,
    [GET_WAREHOUSE]: paginationStateDefaultValue,
    [GET_STOCK_SUMMARY]: paginationStateDefaultValue,
    [GET_DETAIL_BY_WAREHOUSE_STOCK_ADJUSTMENT]: paginationStateDefaultValue,
    [GET_STOCK_MOVEMENT]: paginationStateDefaultValue,
    [GET_DETAIL_STOCK_MUTATION]: paginationStateDefaultValue,
    [GET_DIRECT_PURCHASE_RECEIVE]: paginationStateDefaultValue,
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
  setQuery: (key, query) => {
    set((state) => {
      const currentOption = state.options[key];
      return {
        options: {
          ...state.options,
          [key]: {
            ...currentOption,
            query,
          },
        },
      };
    });
  },
}));
