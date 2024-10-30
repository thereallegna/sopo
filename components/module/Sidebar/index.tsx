'use client';

import React from 'react';
import { cn } from '@libs/classNames';
import { useSidebar } from '@hooks/useSidebar';
import SidebarHeader from './SidebarHeader';
import SidebarContent from './SidebarContent';
import SidebarFooter from './SidebarFooter';

const Sidebar: React.FC = () => {
  const { isOpen } = useSidebar();

  return (
    <aside
      className={cn(
        'flex flex-col border border-Neutral-200 border-solid transition-all duration-300 overflow-hidden',
        isOpen ? 'w-[240px]' : 'w-[56px]'
      )}
    >
      <SidebarHeader />
      <SidebarContent />
      <SidebarFooter />
    </aside>
  );
};

export default Sidebar;
