import React, { PropsWithChildren } from 'react';
import Content from '@components/module/Content';
import Navbar from '@components/module/Navbar';
import Sidebar from '@components/module/Sidebar';
import PreventNavigationDialog from '@components/shared/Alert';
import dynamic from 'next/dynamic';

const HistoryLog = dynamic(() => import('@components/shared/Drawer/Log'), {
  ssr: false,
});

const MainLayout = ({ children }: PropsWithChildren) => (
  <main className="flex flex-col h-screen">
    <Navbar />
    <div className="flex flex-1 overflow-hidden">
      <Sidebar />
      <Content className="relative w-full h-full flex-1 flex-grow flex flex-col gap-[10px]">
        {children}
        <PreventNavigationDialog />
        <HistoryLog />
      </Content>
    </div>
  </main>
);

export default MainLayout;
