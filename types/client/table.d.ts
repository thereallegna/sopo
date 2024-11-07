import {
  GroupingState,
  PaginationState,
  Updater,
  VisibilityState,
} from '@tanstack/react-table';

type ColumnKey = {
  accessor: string;
  header: string;
};

type GenerateColumnsOption = {
  columns: ColumnKey[];
  id: string;
  hasAction?: boolean;
};

type TableState = {
  options: Record<string, TableOptionState>;
  setPagination: (
    key: string,
    pagination: PaginationState | ((prev: PaginationState) => PaginationState)
  ) => void;
  setSearch: (key: string, keyword: string) => void;
  setColumnVisibility: (key: string, val: VisibilityState) => void;
  setGrouping: (key: string, val: GroupingState) => void;
  setRowSize: (key: string, size: RowSizeType) => void;
};

type TableOptionState = {
  grouping: GroupingState;
  pagination: PaginationState;
  columnVisibility: VisibilityState;
  search?: string;
  rowSize: RowSizeType;
};

type TableContentProps<T> = {
  data?: ApiResultResponse<T[]>;
  columns: GenerateColumnsOption;
  option: TableOptionState;
  onPagination: (
    pg: PaginationState | ((prev: PaginationState) => PaginationState)
  ) => void;
  onSearch: (keyword: string) => void;
  onFilter?: () => void;
  onColumnVisibility: (column: Updater<VisibilityState>) => void;
  onGrouping?: (group: Updater<GroupingState>) => void;
  onRowSizeChange: (size: RowSizeType) => void;
};

type PaginationPartial =
  | PaginationState
  | ((prev: PaginationState) => PaginationState);

type RowSizeType = 'normal' | 'compact' | 'narrow' | null | undefined;
