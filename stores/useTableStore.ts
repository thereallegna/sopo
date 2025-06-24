import {
  GET_CITY,
  GET_COUNTRY,
  GET_UOM,
  GET_PROVINCE,
  GET_CATEGORY_MATERIAL_MANAGEMENT,
  // GET_COA,
  GET_SITE,
  GET_TAX_GROUP,
  GET_TAX,
  GET_VENDOR_CATEGORY,
  GET_VENDOR,
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
import { PaginationStateDefaultValue } from '@constants/defaultValues';
import { TableState } from '../types/client/table';

const initialTableState = {
  options: {
    [GET_COUNTRY]: PaginationStateDefaultValue,
    [GET_PROVINCE]: PaginationStateDefaultValue,
    [GET_CITY]: PaginationStateDefaultValue,
    [GET_CURRENCY]: PaginationStateDefaultValue,
    // [GET_COA]: paginationStateDefaultValue,
    [GET_SITE]: PaginationStateDefaultValue,
    [GET_TAX_GROUP]: PaginationStateDefaultValue,
    [GET_TAX]: PaginationStateDefaultValue,
    [GET_VENDOR_CATEGORY]: PaginationStateDefaultValue,
    [GET_VENDOR]: PaginationStateDefaultValue,
    [GET_UOM]: PaginationStateDefaultValue,
    [GET_CATEGORY_MATERIAL_MANAGEMENT]: PaginationStateDefaultValue,
    [GET_MASTER_ITEM_MATERIAL_MANAGEMENT]: PaginationStateDefaultValue,
    [GET_WAREHOUSE_CATEGORY]: PaginationStateDefaultValue,
    [GET_WAREHOUSE]: PaginationStateDefaultValue,
    [GET_INITIAL_STOCK]: PaginationStateDefaultValue,
    [GET_STOCK_ADJUSTMENT]: PaginationStateDefaultValue,
    [GET_STOCK_MUTATION]: PaginationStateDefaultValue,
    [GET_STOCK_SUMMARY]: PaginationStateDefaultValue,
    [GET_DETAIL_BY_WAREHOUSE_STOCK_ADJUSTMENT]: PaginationStateDefaultValue,
    [GET_STOCK_MOVEMENT]: PaginationStateDefaultValue,
    [GET_DETAIL_STOCK_MUTATION]: PaginationStateDefaultValue,
    [GET_DIRECT_PURCHASE_RECEIVE]: PaginationStateDefaultValue,
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
