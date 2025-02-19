'use client';

import React from 'react';
import Content from '@components/module/Content';
import HeaderContent from '@components/module/Content/HeaderContent';
import BodyContent from '@components/module/Content/BodyContent';
import Image from 'next/image';
import FilterButton from '@components/ui/Table/Action/FilterButton';
import { useDrawerStore } from '@stores/useDrawerStore';
import { getStockAdjustment } from '@services/fetcher/transaction/inventory-material-management/inventory-management';
import { GET_STOCK_ADJUSTMENT } from '@constants/queryKey';
import dynamic from 'next/dynamic';

const FilterStockAdjustment = dynamic(
  () => import('@components/shared/Drawer/Filter/InitialStockFilter'),
  { ssr: false }
);
const TableDrawer = dynamic(
  () => import('@components/shared/Drawer/Table/TableDrawer'),
  { ssr: false }
);
const CreateStockAdjustment = dynamic(
  () =>
    import(
      '@components/module/Transaction/InventoryMaterialManagement/InventoryManagement/StockAdjustment/Create'
    ),
  { ssr: false }
);
const DetailStockAdjustment = dynamic(
  () =>
    import(
      '@components/module/Transaction/InventoryMaterialManagement/InventoryManagement/StockAdjustment/Detail'
    ),
  { ssr: false }
);

const StockAdjustment = () => {
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
        <HeaderContent title=" Stock Adjustment" onAdd={handleOpenAdd} />
        <BodyContent>
          <div className="flex flex-col gap-4 py-2 items-center">
            <Image
              src="/images/api-empty-state.png"
              alt="api-empyt-state"
              width={213}
              height={213}
            />
            <p className="text-Neutral-500 text-lg">
              Filter to find data Stock Adjustment
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
      <FilterStockAdjustment />
      <TableDrawer
        title="Find Stock Adjustment"
        queryKey={GET_STOCK_ADJUSTMENT}
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
              accessor: 'date',
              header: 'Date',
            },
            {
              accessor: 'warehouse_name',
              header: 'Warehouse',
            },
          ],
        }}
        queryFn={getStockAdjustment}
      />
      <CreateStockAdjustment />
      <DetailStockAdjustment />
    </>
  );
};

export default StockAdjustment;
