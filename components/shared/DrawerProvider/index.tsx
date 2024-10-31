'use client';

import { useCloseDrawerOnPathChange } from '@hooks/useDrawer';
import dynamic from 'next/dynamic';
import React from 'react';

const CreateCountryModal = dynamic(
  () => import('@components/shared/Drawer/Create/CreateCountry'),
  { ssr: false }
);

const FilterCountryModal = dynamic(
  () => import('@components/shared/Drawer/Filter/CountryFilter'),
  { ssr: false }
);

const TableCountryModal = dynamic(
  () => import('@components/shared/Drawer/Table/TableCountryDrawer'),
  { ssr: false }
);

const DrawerProvider = () => {
  useCloseDrawerOnPathChange();

  return (
    <>
      <TableCountryModal />
      <FilterCountryModal />
      <CreateCountryModal />
    </>
  );
};

export default DrawerProvider;
