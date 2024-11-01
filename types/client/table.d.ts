import { PaginationState, VisibilityState } from '@tanstack/react-table';

type TableOptionState = {
  search?: string;
  columnVisibility: VisibilityState;
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
  onColumnVisibility: (column: VisibilityState) => void;
};

type PaginationPartial =
  | PaginationState
  | ((prev: PaginationState) => PaginationState);
