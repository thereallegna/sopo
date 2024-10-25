'use client';

import { useUserSession } from '@hooks/useUserSession';
import React, { useState } from 'react';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@radix-ui/react-dropdown-menu';
import IconComponent from '@components/ui/Icon';
import {
  IconLayoutNavbar,
  IconTablePlus,
  IconChevronDown,
  IconLayoutRows,
} from '@tabler/icons-react';
import { Checkbox } from '@components/ui/Checkbox';

const Dashboard = () => {
  const { isLoading, data } = useUserSession();

  const [checkboxStates, setCheckboxStates] = useState({
    showAll: false,
    code: false,
    name: false,
    createData: false,
    shortName: false,
    active: false,
    tax: false,
    phone: false,
    address: false,
    city: false,
  });

  const handleCheckboxChange = (key: keyof typeof checkboxStates) => {
    setCheckboxStates((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div>
      <div>Dashboard {isLoading ? 'loading...' : data?.usercode}</div>

      <div className="flex items-center gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger>
            <div className="bg-white border border-neutral-200 rounded-sm flex items-center justify-between p-[7px_10px] cursor-pointer">
              <div className="flex items-center gap-2">
                <IconComponent icon={IconLayoutNavbar} size="large" />
                <IconComponent icon={IconChevronDown} size="large" />
              </div>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="bg-white shadow-md rounded-md w-[124px] h-[96px] border border-neutral-200 p-2 mt-2"
            sideOffset={8}
            align="start"
          >
            <DropdownMenuCheckboxItem className="text-base font-normal p-[5px_12px] flex items-center gap-2">
              <IconComponent icon={IconLayoutNavbar} size="large" />
              Normal
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem className="text-base font-normal p-[5px_12px] flex items-center gap-2">
              <IconComponent icon={IconLayoutRows} size="large" />
              Compact
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem className="text-base font-normal p-[5px_12px] flex items-center gap-2">
              <IconComponent icon={IconLayoutNavbar} size="large" />
              Narrow
            </DropdownMenuCheckboxItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger>
            <div className="bg-white border border-neutral-200 rounded-[6px] flex items-center justify-between p-[7px_10px] cursor-pointer">
              <div className="flex items-center gap-2">
                <IconComponent icon={IconTablePlus} size="large" />
                <IconComponent icon={IconChevronDown} size="large" />
              </div>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="bg-white shadow-md rounded-md w-[140px] h-full border border-neutral-200 p-2 mt-2"
            sideOffset={8}
            align="start"
          >
            <DropdownMenuCheckboxItem className="text-base font-normal p-[6px] flex items-center gap-2">
              <Checkbox
                checked={checkboxStates.showAll}
                onCheckedChange={() => handleCheckboxChange('showAll')}
              />
              Show All
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem className="text-base font-normal p-[6px] flex items-center gap-2">
              <Checkbox
                checked={checkboxStates.code}
                onCheckedChange={() => handleCheckboxChange('code')}
              />
              Code
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem className="text-base font-normal p-[6px] flex items-center gap-2">
              <Checkbox
                checked={checkboxStates.name}
                onCheckedChange={() => handleCheckboxChange('name')}
              />
              Name
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem className="text-base font-normal p-[6px] flex items-center gap-2">
              <Checkbox
                checked={checkboxStates.createData}
                onCheckedChange={() => handleCheckboxChange('createData')}
              />
              Create Data
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem className="text-base font-normal p-[6px] flex items-center gap-2">
              <Checkbox
                checked={checkboxStates.shortName}
                onCheckedChange={() => handleCheckboxChange('shortName')}
              />
              Short Name
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem className="text-base font-norma p-[6px] flex items-center gap-2">
              <Checkbox
                checked={checkboxStates.active}
                onCheckedChange={() => handleCheckboxChange('active')}
              />
              Active
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem className="text-base font-normal p-[6px] flex items-center gap-2">
              <Checkbox
                checked={checkboxStates.tax}
                onCheckedChange={() => handleCheckboxChange('tax')}
              />
              Tax
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem className="text-base font-normal p-[6px] flex items-center gap-2">
              <Checkbox
                checked={checkboxStates.phone}
                onCheckedChange={() => handleCheckboxChange('phone')}
              />
              Phone
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem className="text-base font-normal p-[6px] flex items-center gap-2">
              <Checkbox
                checked={checkboxStates.address}
                onCheckedChange={() => handleCheckboxChange('address')}
              />
              Address
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem className="text-base font-normal p-[6px] flex items-center gap-2">
              <Checkbox
                checked={checkboxStates.city}
                onCheckedChange={() => handleCheckboxChange('city')}
              />
              City
            </DropdownMenuCheckboxItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default Dashboard;
