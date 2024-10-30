import React from 'react';
import { IconLayoutNavbar, IconChevronDown } from '@tabler/icons-react';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@radix-ui/react-dropdown-menu';
import IconComponent from '@components/ui/Icon';

const LayoutDropdownButton: React.FC = () => {
  const labels = ['Normal', 'Compact', 'Narrow'];
  labels.forEach((label) => console.log(label));

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <div className="bg-white border border-neutral-200 rounded-sm flex items-center justify-between p-[7px_10px] cursor-pointer">
          <IconComponent icon={IconLayoutNavbar} size="large" />
          <IconComponent icon={IconChevronDown} size="large" />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-white shadow:md rounded-md w-[124px] h-[96px] border border-neutral-200 p-2 mt-2">
        {labels.map((label) => (
          <DropdownMenuCheckboxItem
            key={label}
            className="text-base font-normal p-[5px_12px] flex items-center gap-2"
          >
            <IconComponent icon={IconLayoutNavbar} size="large" />
            {label}
          </DropdownMenuCheckboxItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LayoutDropdownButton;
