import Content from '@components/module/Content';
import Navbar from '@components/module/Navbar';
import Sidebar from '@components/module/Sidebar';
import React, { PropsWithChildren } from 'react';

const MainLayout = ({ children }: PropsWithChildren) => (
  <main className="w-full h-screen overflow-hidden bg-Neutral-white">
    <Navbar />
    <div className="flex">
      <Sidebar />
      <Content>{children}</Content>
    </div>
  </main>
);

export default MainLayout;
