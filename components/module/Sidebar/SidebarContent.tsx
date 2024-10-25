'use client';

import React from 'react';
import { sidebarConstant } from '@constants/sidebarConstant';
import SidebarItems from './SidebarItems';

const SidebarContent: React.FC = () => (
  <div className="flex-1 overflow-y-auto  custom-scrollbar ">
    <SidebarItems items={sidebarConstant} />
  </div>
);

export default SidebarContent;
