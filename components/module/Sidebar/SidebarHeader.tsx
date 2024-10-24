'use client';

import { Button } from '@components/ui/Button';
import Input from '@components/ui/Input';
import { IconChevronsLeft, IconSearch } from '@tabler/icons-react';
import React from 'react';

const SidebarHeader: React.FC = () => (
  <div className="sticky top-0 p-3 flex flex-row gap-[10px] ">
    <Input
      placeholder="Search menu.."
      end_icon={{
        icon: IconSearch,
        className: 'text-[#354052]',
      }}
    />

    <Button
      size="icon"
      className="flex-1 bg-Neutral-100 hover:bg-Neutral-200 focus:bg-Neutral-300 "
      icon={{ icon: IconChevronsLeft, size: 'large', className: 'p-0' }}
    />
  </div>
);

export default SidebarHeader;
