import React, { useEffect } from 'react';
import ToDetail from '@components/shared/TableContent/ToDetail';
import {
  AccessorKeyColumnDef,
  ColumnDef,
  createColumnHelper,
  GroupingState,
  Updater,
  VisibilityState,
} from '@tanstack/react-table';
import { useTableStore } from '@stores/useTableStore';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
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
      <ToDetail href={`/${props.row.getValue('Country Code')}`} />
    ),
  }),
];

type UseTableProps<T> = {
  queryKey: string;
  queryFn: (
    options?: TableOptionState
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
  const pathname = usePathname();
  const router = useRouter();
  const setPagination = useTableStore((state) => state.setPagination);
  const setSearch = useTableStore((state) => state.setSearch);
  const setGrouping = useTableStore((state) => state.setGrouping);
  const setColumnVisibility = useTableStore(
    (state) => state.setColumnVisibility
  );

  const option = useTableStore((state) => state.options[queryKey]);

  const onGrouping = (group: Updater<GroupingState>) => {
    const groupingState =
      typeof group === 'function' ? group(option.grouping) : group;
    setGrouping(queryKey, groupingState);
  };

  const onPagination = (paginationFn: PaginationPartial) => {
    const paginationState =
      typeof paginationFn === 'function'
        ? paginationFn(option.pagination)
        : paginationFn;
    setPagination(queryKey, paginationState);
    const { pageIndex, pageSize } = paginationState;
    const url = new URLSearchParams(params);
    url.set('page_index', (pageIndex + 1).toString());
    url.set('page_size', pageSize.toString());
    router.replace(`${pathname}?${url.toString()}`);
  };

  const onSearch = (keyword: string) => {
    onPagination((state) => ({ ...state, pageIndex: 0 }));
    setSearch(queryKey, keyword);
  };

  const onColumnVisibility = (visibility: Updater<VisibilityState>) => {
    const visibilityState =
      typeof visibility === 'function'
        ? visibility(option.columnVisibility)
        : visibility;
    setColumnVisibility(queryKey, visibilityState);
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
    queryKey: [queryKey, option.pagination, option.search],
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
    onGrouping,
  };
};

export default useTable;
