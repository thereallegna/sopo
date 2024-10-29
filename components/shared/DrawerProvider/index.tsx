'use client';

import dynamic from 'next/dynamic';
import React from 'react';
import { useDrawerStore } from '@stores/useDrawerStore';

const CreateCountryModal = dynamic(
  // eslint-disable-next-line import/extensions
  () => import('@components/shared/Drawer/Create/CreateCountry'),
  {
    ssr: false,
  }
);

const DrawerProvider = () => {
  const { drawerType, isOpen } = useDrawerStore();

  if (!isOpen) return null;

  return <>{drawerType === 'CREATE_COUNTRY' && <CreateCountryModal />}</>;
};
export default DrawerProvider;
