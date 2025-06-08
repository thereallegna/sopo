'use client';

import React from 'react';
import Content from '@components/module/Content';
import HeaderContent from '@components/module/Content/HeaderContent';
import BodyContent from '@components/module/Content/BodyContent';
import Image from 'next/image';
import FilterButton from '@components/ui/Table/Action/FilterButton';
import { useDrawerStore } from '@stores/useDrawerStore';
import { getUOM } from '@services/fetcher/configuration/inventory-management';
import { GET_UOM } from '@constants/queryKey';
import dynamic from 'next/dynamic';

const FilterUOM = dynamic(
  () => import('@components/shared/Drawer/Filter/UOMFilter'),
  { ssr: false }
);
const TableDrawer = dynamic(
  () => import('@components/shared/Drawer/Table/TableDrawer'),
  { ssr: false }
);
const CreateUOM = dynamic(
  () =>
    import(
      '@components/module/Configuration/InventoryMaterialManagement/MaterialManagement/UoM/Create'
    ),
  { ssr: false }
);
const DetailUOM = dynamic(
  () =>
    import(
      '@components/module/Configuration/InventoryMaterialManagement/MaterialManagement/UoM/Detail'
    ),
  { ssr: false }
);
const EditUOM = dynamic(
  () =>
    import(
      '@components/module/Configuration/InventoryMaterialManagement/MaterialManagement/UoM/Edit'
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
        <HeaderContent title="UoM" onAdd={handleOpenAdd} />
        <BodyContent>
          <div className="flex flex-col gap-4 py-2 items-center">
            <Image
              src="/images/api-empty-state.png"
              alt="api-empty-state"
              width={213}
              height={213}
            />
            <p className="text-Neutral-500 text-lg">Filter to find data UoM</p>
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
      <TableDrawer
        title="Find UoM"
        queryKey={GET_UOM}
        columns={{
          columns: [
            {
              accessor: 'number',
              header: '#',
            },
            {
              accessor: 'uom_code',
              header: 'UoM Code',
            },
            {
              accessor: 'uom_name',
              header: 'UoM Name',
            },
            {
              accessor: 'create_date',
              header: 'Create Date',
            },
          ],
        }}
        queryFn={getUOM}
      />
      <CreateUOM />
      <DetailUOM />
      <EditUOM />
    </>
  );
};

export default Country;
