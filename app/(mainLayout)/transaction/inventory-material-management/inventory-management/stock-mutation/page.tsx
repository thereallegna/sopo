'use client';

import React from 'react';
import Content from '@components/module/Content';
import HeaderContent from '@components/module/Content/HeaderContent';
import BodyContent from '@components/module/Content/BodyContent';
import Image from 'next/image';
import FilterButton from '@components/ui/Table/Action/FilterButton';
import { useDrawerStore } from '@stores/useDrawerStore';
import { GET_STOCK_MUTATION } from '@constants/queryKey';
import dynamic from 'next/dynamic';
import { getStockMutation } from '@services/fetcher/transaction/inventory-management';

const FilterUOM = dynamic(
  () => import('@components/shared/Drawer/Filter/UOMFilter'),
  { ssr: false }
);
const TableDrawer = dynamic(
  () => import('@components/shared/Drawer/Table/TableDrawer'),
  { ssr: false }
);
const CreateStockMutation = dynamic(
  () =>
    import(
      '@components/module/Transaction/InventoryManagement/StockMutation/Create'
    ),
  { ssr: false }
);
const DetailStockMutation = dynamic(
  () =>
    import(
      '@components/module/Transaction/InventoryManagement/StockMutation/Detail'
    ),
  { ssr: false }
);
const EditStockMutation = dynamic(
  () =>
    import(
      '@components/module/Transaction/InventoryManagement/StockMutation/Edit'
    ),
  { ssr: false }
);

const StockMutation = () => {
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
        <HeaderContent title="Stock Mutation" onAdd={handleOpenAdd} />
        <BodyContent>
          <div className="flex flex-col gap-4 py-2 items-center">
            <Image
              src="/images/api-empty-state.png"
              alt="api-empty-state"
              width={213}
              height={213}
            />
            <p className="text-Neutral-500 text-lg">
              Filter to find data Stock Mutation
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
      <TableDrawer
        title="Find Stock Mutation"
        queryKey={GET_STOCK_MUTATION}
        columns={{
          columns: [
            {
              accessor: 'number',
              header: '#',
            },
            {
              accessor: 'document',
              header: 'Document',
            },
            {
              accessor: 'date',
              header: 'Date',
            },
            {
              accessor: 'cancel',
              header: 'Cancel',
            },
            {
              accessor: 'werehouse',
              header: 'Werehouse',
            },
            {
              accessor: 'from/to',
              header: 'From/To',
            },
            {
              accessor: 'item_name',
              header: 'Item Name',
            },
            {
              accessor: 'batch',
              header: 'Batch',
            },
          ],
        }}
        queryFn={getStockMutation}
      />
      <CreateStockMutation />
      <DetailStockMutation />
      <EditStockMutation />
    </>
  );
};

export default StockMutation;
