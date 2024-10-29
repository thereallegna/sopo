import React, { useEffect } from 'react';
import ToDetail from '@components/shared/TableContent/ToDetail';
import { createColumnHelper, PaginationState } from '@tanstack/react-table';
import { useTableStore } from '@stores/useTableStore';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import { useSearchParams } from 'next/navigation';

const columnHelper = createColumnHelper<ICountry>();

export const countryColumns = [
  columnHelper.accessor('country_code', {
    id: 'number',
    header: '#',
    cell: (props) => props.row.index + 1,
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
    pagination: PaginationState
  ) => Promise<AxiosResponse<ApiResponse<ApiResultResponse<T>>>>;
};

const useTable = <T,>({ queryKey, queryFn }: UseTableProps<T>) => {
  const params = useSearchParams();
  const setPagination = useTableStore((state) => state.setPagination);
  const { pagination } = useTableStore((state) => state.paginations[queryKey]);

  const onPaginationChange = (
    paginationFn: PaginationState | ((prev: PaginationState) => PaginationState)
  ) => {
    setPagination(queryKey, paginationFn);
  };

  const initPagination = () => {
    const pgState: PaginationState = { ...pagination }; // Clone pagination state
    const pageSize = params.get('page_size');
    const pageIndex = params.get('page_index');
    if (pageSize) {
      pgState.pageSize = parseFloat(pageSize);
    }
    if (pageIndex) {
      pgState.pageIndex = parseFloat(pageIndex);
    }
    onPaginationChange(pgState);
  };

  useEffect(() => {
    initPagination();
  }, []);

  const { data: queryData } = useQuery<
    AxiosResponse<ApiResponse<ApiResultResponse<T>>>
  >({
    queryKey: [queryKey, pagination],
    queryFn: () => queryFn(pagination),
    placeholderData: keepPreviousData,
    staleTime: 5 * 1000,
  });

  return { data: queryData?.data.data, pagination, onPaginationChange };
};

export default useTable;
