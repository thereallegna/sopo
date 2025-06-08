'use client';

import React from 'react';
import Content from '@components/module/Content';
import HeaderContent from '@components/module/Content/HeaderContent';
import BodyContent from '@components/module/Content/BodyContent';
import Image from 'next/image';
import FilterButton from '@components/ui/Table/Action/FilterButton';
import { useDrawerStore } from '@stores/useDrawerStore';
import dynamic from 'next/dynamic';
import TableMasterItem from '@components/module/Configuration/InventoryMaterialManagement/MaterialManagement/MasterItem/Table';

const FilterUOM = dynamic(
  () => import('@components/shared/Drawer/Filter/UOMFilter'),
  { ssr: false }
);
const CreateMasterItem = dynamic(
  () =>
    import(
      '@components/module/Configuration/InventoryMaterialManagement/MaterialManagement/MasterItem/Create'
    ),
  { ssr: false }
);
const DetailMasterItem = dynamic(
  () =>
    import(
      '@components/module/Configuration/InventoryMaterialManagement/MaterialManagement/MasterItem/Detail'
    ),
  { ssr: false }
);
const EditMasterItem = dynamic(
  () =>
    import(
      '@components/module/Configuration/InventoryMaterialManagement/MaterialManagement/MasterItem/Edit'
    ),
  { ssr: false }
);

const Country = () => {
  const { openFilterDrawer, openTableDrawer, closeFilterDrawer, openDrawer } =
    useDrawerStore();

  const handleOpenAdd = () => {
    openDrawer();
  };

  const handleOpenFilter = () => {
    openFilterDrawer('filterUOM');
  };

  const handleOpenTable = () => {
    closeFilterDrawer();
    openTableDrawer();
  };

  return (
    <>
      <Content>
        <HeaderContent title="Master Items" onAdd={handleOpenAdd} />
        <BodyContent>
          <div className="flex flex-col gap-4 py-2 items-center">
            <Image
              src="/images/api-empty-state.png"
              alt="api-empty-state"
              width={213}
              height={213}
            />
            <p className="text-Neutral-500 text-lg">
              Filter to find data Master Items
            </p>
            <div className="pb-[10px]">
              <FilterButton
                iconColor="secondary"
                variant="outlined"
                onClick={handleOpenFilter}
              />
            </div>
            <button
              type="button"
              onClick={handleOpenTable}
              className="underline text-base text-Blue-500"
            >
              Show latest data
            </button>
          </div>
        </BodyContent>
      </Content>
      <FilterUOM />
      <TableMasterItem />
      <CreateMasterItem />
      <DetailMasterItem />
      <EditMasterItem />
    </>
  );
};

export default Country;
