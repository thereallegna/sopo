'use client';

import { useCloseDrawerOnPathChange } from '@hooks/useDrawer';
import dynamic from 'next/dynamic';
import React from 'react';

const CreateCountryModal = dynamic(
  () => import('@components/shared/Drawer/Create/CreateCountry'),
  { ssr: false }
);

const DrawerProvider = () => {
  useCloseDrawerOnPathChange();

  return <CreateCountryModal />;
};

export default DrawerProvider;
