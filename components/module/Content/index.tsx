'use client';

import DrawerProvider from '@components/shared/DrawerProvider';
import React, { PropsWithChildren, Suspense } from 'react';
import HeaderContent from './HeaderContent';

const Content = ({ children }: PropsWithChildren) => (
  <div className="relative w-full h-full flex-1 flex-grow m-5 flex flex-col gap-5">
    <HeaderContent />
    <DrawerProvider />
    <Suspense>{children}</Suspense>
  </div>
);

export default Content;
