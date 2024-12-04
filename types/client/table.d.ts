import { InputProps } from '@components/ui/Input';
import { TableActionProps } from '@components/ui/Table/TableAction';
import {
  GroupingState,
  PaginationState,
  Updater,
  VisibilityState,
} from '@tanstack/react-table';

type ColumnKey = {
  accessor: string;
  header: string;
  size?: number;
  type?: 'default' | 'input';
  inputProps?: InputProps;
};

type GenerateColumnsOption = {
  columns: ColumnKey[];
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
  pinnedColumns?: string[];
  showPrint?: boolean;
  showExport?: boolean;
  showColumnSelector?: boolean;
  showRowSizeSelector?: boolean;
  onSelectRow?: (data: T) => void;
  onPagination: (
    pg: PaginationState | ((prev: PaginationState) => PaginationState)
  ) => void;
  onSearch: (keyword: string) => void;
  onFilter?: () => void;
  onColumnVisibility: (column: Updater<VisibilityState>) => void;
  onGrouping?: (group: Updater<GroupingState>) => void;
  onRowSizeChange: (size: RowSizeType) => void;
  actionProps?: TableActionProps;
};

type TableFormProps<T> = {
  data?: T[];
  columns: GenerateColumnsOption;
  onChangeData?: (prev: T[]) => T[];
};

type PaginationPartial =
  | PaginationState
  | ((prev: PaginationState) => PaginationState);

type RowSizeType = 'normal' | 'compact' | 'narrow' | null | undefined;
