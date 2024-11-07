import React from 'react';
import { IconTablePlus, IconChevronDown } from '@tabler/icons-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@radix-ui/react-dropdown-menu';
import { Checkbox } from '@components/ui/Checkbox';
import IconComponent from '@components/ui/Icon';
import { Column } from '@tanstack/react-table';

export type SelectColumnDropdownProps = {
  isAllColumnsVisible: boolean;
  columnVisible: Column<any, unknown>[];
  onSelectAll: (event: unknown) => void;
};

const SelectColumnDropdown: React.FC<SelectColumnDropdownProps> = ({
  isAllColumnsVisible,
  columnVisible,
  onSelectAll,
}: SelectColumnDropdownProps) => (
  <DropdownMenu>
    <DropdownMenuTrigger className="w-min">
      <div className="bg-white border border-neutral-200 rounded-[6px] flex items-center justify-between p-[7px_10px] cursor-pointer">
        <IconComponent icon={IconTablePlus} size="large" />
        <IconComponent icon={IconChevronDown} size="large" />
      </div>
    </DropdownMenuTrigger>
    <DropdownMenuContent
      onSelect={(e) => e.preventDefault()}
      className="bg-white shadow-md rounded-md w-[140px] h-full border border-neutral-200 p-2 mt-2"
    >
      <Checkbox
        label="Show All"
        className="text-base font-normal m-[6px] flex items-center"
        preChecked
        checked={isAllColumnsVisible}
        onCheckedChange={onSelectAll}
      />
      {columnVisible.map((column) => (
        <Checkbox
          key={column.id}
          label={column.id}
          className="text-base font-normal m-[6px] flex items-center"
          checked={column.getIsVisible()}
          onClick={column.getToggleVisibilityHandler()}
        />
      ))}
    </DropdownMenuContent>
  </DropdownMenu>
);

export default SelectColumnDropdown;
