'use client';

import dynamic from 'next/dynamic';
import React from 'react';
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

const DrawerProvider = () => (
  <>
    {/* Komponen Drawer */}
    <FilterCountryModal />
    <TableCountryModal />
    <CreateCountryModal />

    {/* Dialog konfirmasi navigasi */}
    <PreventNavigationDialog />
  </>
);

export default DrawerProvider;
