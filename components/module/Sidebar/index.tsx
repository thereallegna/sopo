'use client';

import React from 'react';
import SidebarHeader from './SidebarHeader';
import SidebarContent from './SidebarContent';
import SidebarFooter from './SidebarFooter';

const Sidebar: React.FC = () => (
  <div className="w-[240px]  flex flex-col ">
    <SidebarHeader />
    <SidebarContent />
    <SidebarFooter />
  </div>
);

export default Sidebar;
