import { CheckboxProps } from '@components/ui/Checkbox';
import { InputProps } from '@components/ui/Input';
import { TableActionProps } from '@components/ui/Table/TableAction';
import {
  GroupingState,
  PaginationState,
  Updater,
  VisibilityState,
} from '@tanstack/react-table';
import { AxiosResponse } from 'axios';
import { FieldError } from 'react-hook-form';
import { ButtonProps } from '@components/ui/Button';
import { FetcherOptions } from './fetcher';

type ColumnKey = {
  accessor: string;
  header: string;
  size?: number;
  type?: 'default' | 'input' | 'checkbox' | 'button';
  inputProps?: InputProps;
  buttonProps?: ButtonProps;
  checkboxProps?: CheckboxProps;
};

type GenerateColumnsOption = {
  columns: ColumnKey[];
  hasAction?: boolean;
  disableAll?: boolean;
  errors?: FieldError<any>;
  onInputChange?: (rowIndex: number, columnId: string, value: string) => void;
  onCheckedChange?: (
    rowIndex: number,
    columnId: string,
    value: boolean
  ) => void;
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
  title: string;
  data: T[];
  columns: GenerateColumnsOption;
  errors?: FieldError<T>;
  getDataModalProps?: SelectableModalProps;
  getDataButtonProps?: ButtonProps;
  onChangeData?: (rowIndex: number, columnId: string, value: string) => void;
  // onChangeData?: (prev: T[]) => void;
  onShowGetDataModal?: () => void;
  onDeleteRow?: (index: number) => void;
};

type PaginationPartial =
  | PaginationState
  | ((prev: PaginationState) => PaginationState);

type RowSizeType = 'normal' | 'compact' | 'narrow' | null | undefined;

type SelectableModalProps = {
  isOpen: boolean;
  title: string;
  columns: GenerateColumnsOption;
  queryKey: string;
  multipleSelect?: boolean;
  idSelected?: string;
  targetIdSelector?: string;
  valueSelected?: string[];
  pinnedColumns?: string[];
  onClose: (val: boolean) => void;
  queryFn: (option?: FetcherOptions) => Promise<AxiosResponse<any, any>>;
  onSelectRow?: (data: any) => void;
};
