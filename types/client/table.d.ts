import { PaginationState } from '@tanstack/react-table';

type TableOptionState = {
  search?: string;
  pagination: PaginationState;
};

type TableContentProps<T> = {
  data?: ApiResultResponse<T[]>;
  columns: AccessorKeyColumnDef<any, any>[] | ColumnDef<any, any>[];
  option: TableOptionState;
  onPagination: (
    pg: PaginationState | ((prev: PaginationState) => PaginationState)
  ) => void;
  onSearch: (keyword: string) => void;
  onFilter?: () => void;
};

type PaginationPartial =
  | PaginationState
  | ((prev: PaginationState) => PaginationState);
