import React from 'react';
import { IconSearch } from '@tabler/icons-react';
import Input from '../Input';
import { Button } from '../Button';

const TableAction = () => (
  <div className="flex justify-between">
    <div className="flex w-auto gap-2">
      <Input
        placeholder="Search.."
        end_icon={{
          icon: IconSearch,
          className: 'text-[#354052]',
        }}
      />
    </div>
    <div className="flex items-center gap-[8px]">
      <Button title="Print" />
      <Button title="Export" />
    </div>
  </div>
);

export default TableAction;
