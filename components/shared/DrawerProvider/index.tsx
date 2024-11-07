'use client';

import dynamic from 'next/dynamic';
import React from 'react';
import { useDrawerStore } from '@stores/useDrawerStore';
import useFormStore from '@stores/useFormStore';

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

const PreventNavigationDialog = dynamic(() => import('../Alert'), {
  ssr: false,
});

const DrawerProvider = () => {
  const {
    tableSetting,
    isOpenFilter,
    isOpen,
    drawerType,
    filterDrawerType,
    isOpenTable,
  } = useDrawerStore();
  const { leavingPage } = useFormStore();
  return (
    <>
      {isOpenTable && tableSetting && <TableModal />}

      {isOpenFilter && filterDrawerType === 'filterCountry' && (
        <FilterCountryModal />
      )}

      {isOpen && drawerType === 'createCountry' && <CreateCountryModal />}

      {/* Dialog konfirmasi navigasi */}
      {leavingPage && <PreventNavigationDialog />}
    </>
  );
};

export default DrawerProvider;
