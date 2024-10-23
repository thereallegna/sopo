import React from 'react';
import SidebarHeader from './SidebarHeader';
import SidebarContent from './SidebarContent';
import SidebarFooter from './SidebarFooter';

const Sidebar: React.FC = () => (
  <div className="w-[240px] sidebar-height p-3  flex flex-col ">
    <SidebarHeader />
    <SidebarContent />
    <SidebarFooter />
  </div>
);

export default Sidebar;
