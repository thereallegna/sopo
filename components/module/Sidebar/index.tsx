'use client';

import React from 'react';
import SidebarHeader from './SidebarHeader';
import SidebarContent from './SidebarContent';
import SidebarFooter from './SidebarFooter';

const Sidebar: React.FC = () => (
  <div className="w-[240px] flex flex-col border border-Neutral-200 border-solid">
    <SidebarHeader />
    <SidebarContent />
    <SidebarFooter />
  </div>
);

export default Sidebar;
