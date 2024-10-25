'use client';

import { Button } from '@components/ui/Button';
import Input from '@components/ui/Input';
import { IconChevronsLeft, IconSearch } from '@tabler/icons-react';
import { useSidebar } from '@hooks/useSidebar';
import { cn } from '@libs/classNames';
import React from 'react';
import { useSidebarStore } from '@stores/useSidebarStore';

const SidebarHeader: React.FC = () => {
  const toggleSidebar = useSidebarStore((state) => state.toggleSidebar);
  const { isOpen } = useSidebar();

  return (
    <div className="sticky top-0  flex flex-row gap-[10px] pb-3">
      <Input
        // jika menutup maka hidden
        className={cn(isOpen ? '' : 'hidden transition-all duration-300')}
        placeholder="Search menu.."
        end_icon={{
          icon: IconSearch,
          className: 'text-[#354052]',
        }}
      />

      <Button
        size="icon"
        className="flex-1 bg-Neutral-100 hover:bg-Neutral-200 focus:bg-Neutral-300"
        icon={{ icon: IconChevronsLeft, size: 'large', className: 'p-0' }}
        onClick={() => toggleSidebar()}
      />
    </div>
  );
};

export default SidebarHeader;
