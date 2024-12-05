'use client';

import React from 'react';
import Content from '@components/module/Content';
import HeaderContent from '@components/module/Content/HeaderContent';
import BodyContent from '@components/module/Content/BodyContent';
import Image from 'next/image';
import FilterButton from '@components/ui/Table/Action/FilterButton';
import { useDrawerStore } from '@stores/useDrawerStore';
import { getInitialStock } from '@services/fetcher/transaction/inventory-material-management';
import { GET_INITIAL_STOCK } from '@constants/queryKey';
import dynamic from 'next/dynamic';

const FilterInitialStock = dynamic(
  () => import('@components/shared/Drawer/Filter/InitialStockFilter'),
  { ssr: false }
);
const TableDrawer = dynamic(
  () => import('@components/shared/Drawer/Table/TableDrawer'),
  { ssr: false }
);
const CreateInitialStock = dynamic(
  () =>
    import(
      '@components/module/Transaction/InventoryMaterialManagement/InitialStock/Create'
    ),
  { ssr: false }
);
const DetailInitialStock = dynamic(
  () =>
    import(
      '@components/module/Transaction/InventoryMaterialManagement/InitialStock/Detail'
    ),
  { ssr: false }
);
const EditInitialStock = dynamic(
  () =>
    import(
      '@components/module/Transaction/InventoryMaterialManagement/InitialStock/Edit'
    ),
  { ssr: false }
);

const InitialStock = () => {
  const { openFilterDrawer, openTableDrawer, closeFilterDrawer, openDrawer } =
    useDrawerStore();

  const handleOpenAdd = () => {
    openDrawer();
  };

  const handleOpenFilter = () => {
    openFilterDrawer('filterInitialStock');
  };

  const handleOpenTable = () => {
    closeFilterDrawer();
    openTableDrawer();
  };

  return (
    <>
      <Content>
        <HeaderContent title="Initial Stock" onAdd={handleOpenAdd} />
        <BodyContent>
          <div className="flex flex-col gap-4 py-2 items-center">
            <Image
              src="/images/api-empty-state.png"
              alt="api-empyt-state"
              width={213}
              height={213}
            />
            <p className="text-Neutral-500 text-lg">
              Filter to find data Initial Stock
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
      <FilterInitialStock />
      <TableDrawer
        title="Find Initial Stock"
        queryKey={GET_INITIAL_STOCK}
        columns={{
          columns: [
            {
              accessor: 'number',
              header: '#',
            },
            {
              accessor: 'document_number',
              header: 'Document',
            },
            {
              accessor: 'document_date',
              header: 'Date',
            },
            {
              accessor: 'currency',
              header: 'Currency',
            },
            {
              accessor: 'warehouse_name',
              header: 'Warehouse',
            },
            {
              accessor: 'item_name',
              header: "Item's Name",
            },
            {
              accessor: 'batch',
              header: 'Batch',
            },
          ],
        }}
        queryFn={getInitialStock}
      />
      <CreateInitialStock />
      <DetailInitialStock />
      <EditInitialStock />
    </>
  );
};

export default InitialStock;
