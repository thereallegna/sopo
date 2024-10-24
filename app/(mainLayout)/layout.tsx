import Content from '@components/module/Content';
import Navbar from '@components/module/Navbar';
import Sidebar from '@components/module/Sidebar';
import React, { PropsWithChildren } from 'react';

const MainLayout = ({ children }: PropsWithChildren) => (
  <main className="flex flex-col h-screen">
    <Navbar />
    <div className="flex flex-1 overflow-hidden">
      <Sidebar />
      <Content>{children}</Content>
    </div>
  </main>
);

export default MainLayout;
