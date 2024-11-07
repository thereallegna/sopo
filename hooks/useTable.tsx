import React, { useEffect } from 'react';
import ToDetail from '@components/shared/TableContent/ToDetail';
import {
  AccessorKeyColumnDef,
  ColumnDef,
  createColumnHelper,
  VisibilityState,
} from '@tanstack/react-table';
import { useTableStore } from '@stores/useTableStore';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import { useSearchParams } from 'next/navigation';
import {
  TableOptionState,
  TableContentProps,
  PaginationPartial,
} from '../types/client/table';

const columnHelper = createColumnHelper<ICountry>();

export const countryColumns = [
  columnHelper.accessor('number', {
    id: 'Number',
    header: '#',
    cell: (props) => props.renderValue(),
    enableGrouping: true,
  }),
  columnHelper.accessor('country_code', {
    id: 'Country Code',
    header: 'Country Code',
    cell: (props) => props.renderValue(),
    enableGrouping: true,
  }),
  columnHelper.accessor('country_name', {
    id: 'Country Name',
    header: 'Country Name',
    cell: (props) => props.renderValue(),
    enableGrouping: true,
  }),
  columnHelper.accessor('create_date', {
    id: 'Create Date',
    header: 'Create Date',
    cell: (props) => props.renderValue(),
    enableGrouping: true,
  }),
  columnHelper.display({
    id: 'Action',
    cell: (props) => (
      <ToDetail href={`/${props.row.getValue('country_code')}`} />
    ),
  }),
];

type UseTableProps<T> = {
  queryKey: string;
  queryFn: (
    options: TableOptionState
  ) => Promise<AxiosResponse<ApiResponse<T[]>>>;
  columns: AccessorKeyColumnDef<any, any>[] | ColumnDef<any, any>[];
  onFilter?: () => void;
};

const useTable = <T,>({
  queryKey,
  columns,
  queryFn,
  onFilter,
}: UseTableProps<T>): TableContentProps<T> => {
  const params = useSearchParams();
  const setPagination = useTableStore((state) => state.setPagination);
  const setSearch = useTableStore((state) => state.setSearch);
  const setColumnVisibility = useTableStore(
    (state) => state.setColumnVisibility
  );

  const option = useTableStore((state) => state.options[queryKey]);

  const onPagination = (paginationFn: PaginationPartial) => {
    setPagination(queryKey, paginationFn);
  };

  const onSearch = (keyword: string) => {
    setSearch(queryKey, keyword);
  };

  const onColumnVisibility = (column: VisibilityState) => {
    setColumnVisibility(queryKey, column);
  };

  const initPagination = () => {
    const pgState = { ...option.pagination };
    const pageSize = params.get('page_size');
    const pageIndex = params.get('page_index');
    if (pageSize) {
      pgState.pageSize = parseFloat(pageSize);
    }
    if (pageIndex) {
      pgState.pageIndex = parseFloat(pageIndex) - 1;
    }
    onPagination(pgState);
  };

  useEffect(() => {
    initPagination();
  }, []);

  const { data: queryData } = useQuery<AxiosResponse<ApiResponse<T[]>>>({
    queryKey: [queryKey, option],
    queryFn: () => {
      const nextPagination = {
        ...option.pagination,
        pageIndex: option.pagination.pageIndex + 1,
      };
      return queryFn({ ...option, pagination: nextPagination });
    },
    placeholderData: keepPreviousData,
  });

  const response = queryData?.data;
  const responseData = response?.data;

  return {
    data: responseData,
    columns,
    option,
    onPagination,
    onSearch,
    onFilter,
    onColumnVisibility,
  };
};

export default useTable;
