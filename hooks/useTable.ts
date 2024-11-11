import { useEffect } from 'react';
import { GroupingState, Updater, VisibilityState } from '@tanstack/react-table';
import { useTableStore } from '@stores/useTableStore';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import {
  TableOptionState,
  TableContentProps,
  PaginationPartial,
  RowSizeType,
  GenerateColumnsOption,
} from '../types/client/table';

type UseTableProps<T> = {
  queryKey: string;
  queryFn: (
    options?: TableOptionState
  ) => Promise<AxiosResponse<ApiResponse<T[]>>>;
  columns: GenerateColumnsOption;
  onFilter?: () => void;
};

const useTable = <T>({
  queryKey,
  columns,
  queryFn,
  onFilter,
}: UseTableProps<T>): TableContentProps<T> => {
  const params = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const {
    setColumnVisibility,
    setGrouping,
    setPagination,
    setSearch,
    setRowSize,
  } = useTableStore();

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
    const { pageIndex = 0, pageSize = 10 } = paginationState;
    const validPageIndex = Number.isNaN(pageIndex) ? 0 : pageIndex;
    const validPageSize = Number.isNaN(pageSize) ? 10 : pageSize;

    setPagination(queryKey, {
      ...paginationState,
      pageIndex: validPageIndex,
      pageSize: validPageSize,
    });

    const url = new URLSearchParams(params);

    url.set('page_index', (validPageIndex + 1).toString());
    url.set('page_size', validPageSize.toString());

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

  const onRowSizeChange = (size: RowSizeType) => {
    setRowSize(queryKey, size);
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
    setPagination(queryKey, pgState);
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
    onRowSizeChange,
  };
};

export default useTable;
