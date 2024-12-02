import { useEffect } from 'react';
import { GroupingState, Updater, VisibilityState } from '@tanstack/react-table';
import { useTableStore } from '@stores/useTableStore';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import {
  // TableOptionState,
  TableContentProps,
  PaginationPartial,
  RowSizeType,
  GenerateColumnsOption,
} from '../types/client/table';
import { FetcherOptions } from '../types/client/fetcher';

type UseTableProps<T> = {
  queryKey: string;
  queryFn: (
    options?: FetcherOptions
  ) => Promise<AxiosResponse<ApiResponse<T[]>>>;
  columns: GenerateColumnsOption;
  pinnedColumns?: string[];
  showPrint?: boolean;
  showExport?: boolean;
  showColumnSelector?: boolean;
  showRowSizeSelector?: boolean;
  onSelectRow?: (data: T) => void;
  onFilter?: () => void;
};

const useTable = <T>({
  queryKey,
  columns,
  pinnedColumns,
  onSelectRow,
  queryFn,
  onFilter,
  showPrint,
  showExport,
  showColumnSelector,
  showRowSizeSelector,
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

  const isGrouping = option.grouping.length > 0;

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
    const validPageSize = Number.isNaN(pageSize) ? -1 : pageSize;

    // Hanya lanjutkan jika validPageSize bukan undefined atau NaN
    // if (validPageSize !== undefined) {
    // }
    setPagination(queryKey, {
      ...paginationState,
      pageIndex: validPageIndex,
      pageSize: validPageSize,
    });

    const url = new URLSearchParams(params);
    url.set('page_index', (validPageIndex + 1).toString());

    // Hanya set 'page_size' jika validPageSize ada
    if (validPageSize !== -1) {
      url.set('page_size', validPageSize.toString());
    }

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

  // Jika terdapat column group maka dependency paginationnya dihilangkan agar pagination otomatisnya menjadi berjalan
  const depnedencyKey = !isGrouping
    ? [
        queryKey,
        option.pagination.pageIndex,
        option.pagination.pageSize,
        option.search,
      ]
    : [queryKey];

  const { data: queryData } = useQuery<AxiosResponse<ApiResponse<T[]>>>({
    queryKey: depnedencyKey,
    queryFn: () => {
      const nextPagination = {
        ...option.pagination,
        pageIndex: option.pagination.pageIndex + 1,
      };
      return queryFn({
        pagination: nextPagination,
        search: option.search,
        all: option?.grouping && option.grouping.length > 0,
      });
    },
    placeholderData: keepPreviousData,
    enabled: option.pagination.pageSize !== -1,
  });

  const response = queryData?.data;
  const responseData = response?.data;

  return {
    data: responseData,
    columns,
    option,
    pinnedColumns,
    showPrint,
    showExport,
    showColumnSelector,
    showRowSizeSelector,
    onPagination,
    onSearch,
    onFilter,
    onColumnVisibility,
    onGrouping,
    onRowSizeChange,
    onSelectRow,
  };
};

export default useTable;
