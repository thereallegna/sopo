import React from 'react';
import { IconSearch } from '@tabler/icons-react';
import Input from '@components/ui/Input';
import FilterButton from '@components/ui/Table/Action/FilterButton';
import LayoutDropdownButton from '@components/ui/Table/Action/LayoutDropdownButton';
import SelectColumnDropdown, {
  SelectColumnDropdownProps,
} from '@components/ui/Table/Action/SelectColumnDropdown';
import ExportButton from '@components/ui/Table/Action/ExportButton';
import PrintButton from '@components/ui/Table/Action/PrintButton';
import { AccessorKeyColumnDef, ColumnDef } from '@tanstack/react-table';

interface TableActionProps {
  data: any[];
  columns: AccessorKeyColumnDef<any, any>[] | ColumnDef<any, any>[];
  onSearch: (keyword: string) => void;
  onFilter?: () => void;
  columnSelector: SelectColumnDropdownProps;
}

const TableAction: React.FC<TableActionProps> = ({
  data,
  columns,
  columnSelector,
  onSearch,
  onFilter,
}) => (
  <div className="flex justify-between gap-2">
    <div className="flex gap-2 flex-1 w-full">
      <Input
        placeholder="Search..."
        end_icon={{
          icon: IconSearch,
          className: 'text-[#354052]',
        }}
        onChange={(e) => onSearch(e.target.value)}
      />
      {onFilter && <FilterButton onClick={onFilter} />}
      <LayoutDropdownButton />
      <SelectColumnDropdown {...columnSelector} />
      <div className="flex items-center justify-end w-full gap-2">
        <PrintButton data={data} columns={columns as ColumnDef<any>[]} />
        <ExportButton data={data} columns={columns as ColumnDef<any>[]} />
      </div>
    </div>
  </div>
);

export default TableAction;
