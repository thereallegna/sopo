'use client';

import React from 'react';
import Content from '@components/module/Content';
import HeaderContent from '@components/module/Content/HeaderContent';
import BodyContent from '@components/module/Content/BodyContent';
import Image from 'next/image';
import FilterButton from '@components/ui/Table/Action/FilterButton';
import { useDrawerStore } from '@stores/useDrawerStore';
import { GET_WAREHOUSE_CATEGORY } from '@constants/queryKey';
import dynamic from 'next/dynamic';
import { getWarehouseCatrgory } from '@services/fetcher/configuration/material-item-warehouse-management';

// Dynamically import Drawer components
const FilterCountry = dynamic(
  () => import('@components/shared/Drawer/Filter/CountryFilter'),
  { ssr: false }
);
const TableDrawer = dynamic(
  () => import('@components/shared/Drawer/Table/TableDrawer'),
  { ssr: false }
);
const CreateCountry = dynamic(
  () =>
    import(
      '@components/module/Configuration/InventoryMaterialManagement/WarehouseCategory/Create'
    ),
  { ssr: false }
);
const DetailCountry = dynamic(
  () =>
    import(
      '@components/module/Configuration/InventoryMaterialManagement/WarehouseCategory/Detail'
    ),
  { ssr: false }
);
const EditCountry = dynamic(
  () =>
    import(
      '@components/module/Configuration/InventoryMaterialManagement/WarehouseCategory/Edit'
    ),
  { ssr: false }
);

const WarehouseCategory = () => {
  const { openFilterDrawer, openTableDrawer, closeFilterDrawer, openDrawer } =
    useDrawerStore();

  const handleOpenAdd = () => {
    openDrawer();
  };

  const handleOpenFilter = () => {
    openFilterDrawer('filterWarehouseCategory');
  };

  const handleOpenTable = () => {
    closeFilterDrawer();
    openTableDrawer();
  };

  return (
    <>
      <Content>
        <HeaderContent title="Warehouse Category" onAdd={handleOpenAdd} />
        <BodyContent>
          <div className="flex flex-col gap-4 py-2 items-center">
            <Image
              src="/images/api-empty-state.png"
              alt="api-empty-state"
              width={213}
              height={213}
            />
            <p className="text-Neutral-500 text-lg">
              Filter to find data Warehouse Category
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
      <FilterCountry />
      <TableDrawer
        title="Find Warehouse Category"
        queryKey={GET_WAREHOUSE_CATEGORY}
        columns={{
          columns: [
            {
              accessor: 'number',
              header: '#',
            },
            {
              accessor: 'warehouse_code',
              header: 'Warehouse Category Code',
            },
            {
              accessor: 'warehouse_name',
              header: 'Warehouse Category Name',
            },
            {
              accessor: 'create_date',
              header: 'Create Date',
            },
          ],
        }}
        queryFn={getWarehouseCatrgory}
      />
      <CreateCountry />
      <DetailCountry />
      <EditCountry />
    </>
  );
};

export default WarehouseCategory;
