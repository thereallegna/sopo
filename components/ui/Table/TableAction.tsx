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

interface TableActionProps {
  data: any[];
  search?: string;
  columns: AccessorKeyColumnDef<any, any>[] | ColumnDef<any, any>[];
  columnSelector: SelectColumnDropdownProps;
  rowSize: RowSizeType;
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
  onSearch,
  onFilter,
  onRowSizeChange,
}) => (
  <div className="flex justify-between gap-2">
    <div className="flex gap-2 flex-1 w-full">
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
      {onFilter && <FilterButton onClick={onFilter} />}
      <RowSizeDropdown active={rowSize} action={onRowSizeChange} />
      <SelectColumnDropdown {...columnSelector} />
      <div className="flex items-center justify-end w-full h-full gap-2">
        <PrintButton data={data} columns={columns as ColumnDef<any>[]} />
        <ExportButton data={data} columns={columns as ColumnDef<any>[]} />
      </div>
    </div>
  </div>
);

export default TableAction;
