import React, { useEffect } from 'react';
import ToDetail from '@components/shared/TableContent/ToDetail';
import {
  AccessorKeyColumnDef,
  ColumnDef,
  createColumnHelper,
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
    header: '#',
    cell: (props) => props.renderValue(),
    enableGrouping: true,
  }),
  columnHelper.accessor('country_code', {
    header: 'Country Code',
    cell: (props) => props.renderValue(),
    enableGrouping: true,
  }),
  columnHelper.accessor('country_name', {
    header: 'Country Name',
    cell: (props) => props.renderValue(),
    enableGrouping: true,
  }),
  columnHelper.accessor('create_date', {
    header: 'Create Date',
    cell: (props) => props.renderValue(),
    enableGrouping: true,
  }),
  columnHelper.display({
    id: 'action',
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
};

const useTable = <T,>({
  queryKey,
  columns,
  queryFn,
}: UseTableProps<T>): TableContentProps<T> => {
  const params = useSearchParams();
  const setPagination = useTableStore((state) => state.setPagination);
  const setSearch = useTableStore((state) => state.setSearch);

  const option = useTableStore((state) => state.options[queryKey]);

  const onPagination = (paginationFn: PaginationPartial) => {
    setPagination(queryKey, paginationFn);
  };

  const onSearch = (keyword: string) => {
    setSearch(queryKey, keyword);
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
    queryFn: () => queryFn(option),
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
  };
};

export default useTable;
