'use client';

import dynamic from 'next/dynamic';
import React from 'react';
import { useDrawerStore } from '@stores/useDrawerStore';
import PreventNavigationDialog from '../Alert';

const CreateCountryModal = dynamic(
  () => import('@components/shared/Drawer/Create/CreateCountry'),
  { ssr: false }
);

const FilterCountryModal = dynamic(
  () => import('@components/shared/Drawer/Filter/CountryFilter'),
  { ssr: false }
);

const TableModal = dynamic(
  () => import('@components/shared/Drawer/Table/TableCountryDrawer'),
  { ssr: false }
);

// const PreventNavigationDialog = dynamic(() => import('../Alert'), {
//   ssr: false,
// });

const DrawerProvider = () => {
  const {
    tableSetting,
    isOpenFilter,
    isOpen,
    drawerType,
    filterDrawerType,
    isOpenTable,
  } = useDrawerStore();
  return (
    <>
      {isOpenTable && tableSetting && <TableModal />}

      {isOpenFilter && filterDrawerType === 'filterCountry' && (
        <FilterCountryModal />
      )}

      {isOpen && drawerType === 'createCountry' && <CreateCountryModal />}

      <PreventNavigationDialog />
    </>
  );
};

export default DrawerProvider;
