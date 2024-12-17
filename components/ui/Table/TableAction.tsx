import React from 'react';
import { IconSearch } from '@tabler/icons-react';
import Input from '@components/ui/Input';
import FilterButton from '@components/ui/Table/Action/FilterButton';
import RowSizeDropdown from '@components/ui/Table/Action/RowSizeDropdown';
import SelectColumnDropdown, {
  SelectColumnDropdownProps,
} from '@components/ui/Table/Action/SelectColumnDropdown';
import ExportButton from '@components/ui/Table/Action/ExportButton';
import PrintButton from '@components/ui/Table/Action/PrintButton';
import { AccessorKeyColumnDef, ColumnDef } from '@tanstack/react-table';
import { RowSizeType } from '../../../types/client/table';

export interface TableActionProps {
  data: any[];
  search?: string;
  columns: AccessorKeyColumnDef<any, any>[] | ColumnDef<any, any>[];
  columnSelector: SelectColumnDropdownProps;
  rowSize: RowSizeType;
  showSearch?: boolean;
  showPrint?: boolean;
  showExport?: boolean;
  showColumnSelector?: boolean;
  showRowSizeSelector?: boolean;
  onSearch: (keyword: string) => void;
  onFilter?: () => void;
  onRowSizeChange: (size: RowSizeType) => void;
}

const TableAction: React.FC<TableActionProps> = ({
  data,
  columns,
  columnSelector,
  rowSize,
  search,
  showSearch = true,
  showPrint = true,
  showExport = true,
  showColumnSelector = true,
  showRowSizeSelector = true,
  onSearch,
  onFilter,
  onRowSizeChange,
}) => (
  <div className="flex justify-between gap-2 z-20">
    <div className="flex gap-2 flex-1 w-full">
      {showSearch && (
        <Input
          placeholder="Search..."
          end_icon={{
            icon: IconSearch,
            className: 'text-[#354052]',
          }}
          value={search}
          onChange={(e) => onSearch(e.target.value)}
          className="w-min"
        />
      )}
      {onFilter && <FilterButton onClick={onFilter} />}
      {showRowSizeSelector && (
        <RowSizeDropdown active={rowSize} action={onRowSizeChange} />
      )}
      {showColumnSelector && <SelectColumnDropdown {...columnSelector} />}
      <div className="flex items-center justify-end w-full h-full gap-2">
        {showPrint && (
          <PrintButton data={data} columns={columns as ColumnDef<any>[]} />
        )}
        {showExport && (
          <ExportButton data={data} columns={columns as ColumnDef<any>[]} />
        )}
      </div>
    </div>
  </div>
);

export default TableAction;
