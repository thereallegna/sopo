'use client';

import dynamic from 'next/dynamic';
import React from 'react';
import { useCloseDrawerOnPathChange } from '@hooks/useDrawer';
import { usePreventNavigation } from '@hooks/usePreventNavigation';
import PreventNavigationDialog from '../Alert';

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
  usePreventNavigation();

  useCloseDrawerOnPathChange();

  return (
    <>
      {/* Komponen Drawer */}
      <FilterCountryModal />
      <TableCountryModal />
      <CreateCountryModal />

      {/* Dialog konfirmasi navigasi */}
      <PreventNavigationDialog />
    </>
  );
};

export default DrawerProvider;
