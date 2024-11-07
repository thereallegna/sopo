import React, { useState } from 'react';
import { IconTablePlus, IconChevronDown } from '@tabler/icons-react';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@radix-ui/react-dropdown-menu';
import { Checkbox } from '@components/ui/Checkbox';
import IconComponent from '@components/ui/Icon';

const FilterDropdownButton: React.FC = () => {
  const [checkboxStates, setCheckboxStates] = useState({
    showAll: false,
    code: false,
    name: false,
    createDate: false,
    shortName: false,
    active: false,
    tax: false,
    phone: false,
    address: false,
    city: false,
  });

  const handleCheckboxChange = (key: keyof typeof checkboxStates) => {
    setCheckboxStates((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const checkboxItems: { label: string; key: keyof typeof checkboxStates }[] = [
    { label: 'Show All', key: 'showAll' },
    { label: 'Code', key: 'code' },
    { label: 'Name', key: 'name' },
    { label: 'Create Data', key: 'createDate' },
    { label: 'Short Name', key: 'shortName' },
    { label: 'Active', key: 'active' },
    { label: 'Tax', key: 'tax' },
    { label: 'Phone', key: 'phone' },
    { label: 'Address', key: 'address' },
    { label: 'City', key: 'city' },
  ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <div className="bg-white border border-neutral-200 rounded-[6px] flex items-center justify-between p-[7px_10px] cursor-pointer">
          <IconComponent icon={IconTablePlus} size="large" />
          <IconComponent icon={IconChevronDown} size="large" />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-white shadow-md rounded-md w-[140px] h-full border border-neutral-200 p-2 mt-1">
        {checkboxItems.map(({ label, key }) => (
          <DropdownMenuCheckboxItem
            key={String(key)}
            className="text-base font-normal p-[6px] flex items-center gap-2"
            checked={checkboxStates[key]}
            onCheckedChange={() => handleCheckboxChange(key)}
          >
            <Checkbox checked={checkboxStates[key]} />
            {label}
          </DropdownMenuCheckboxItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default FilterDropdownButton;
