'use client';

import React from 'react';
import Content from '@components/module/Content';
import HeaderContent from '@components/module/Content/HeaderContent';
import BodyContent from '@components/module/Content/BodyContent';
import Image from 'next/image';
import FilterButton from '@components/ui/Table/Action/FilterButton';
import { useDrawerStore } from '@stores/useDrawerStore';
import { GET_DIRECT_PURCHASE_RECEIVE } from '@constants/queryKey';
import dynamic from 'next/dynamic';
import { getDirectPurchaseReceive } from '@services/fetcher/transaction/inventory-material-management/material-management';

const FilterDirectPurchaseReceive = dynamic(
  () => import('@components/shared/Drawer/Filter/DirectPurchaseReceive'),
  { ssr: false }
);
const TableDrawer = dynamic(
  () => import('@components/shared/Drawer/Table/TableDrawer'),
  { ssr: false }
);
const CreateDirectPurchaseReceive = dynamic(
  () =>
    import(
      '@components/module/Transaction/InventoryMaterialManagement/MaterialManagement/InboundMaterialManagement/DirectPurchaseReceive/Create'
    ),
  { ssr: false }
);
const DetailDirectPurchaseReceive = dynamic(
  () =>
    import(
      '@components/module/Transaction/InventoryMaterialManagement/MaterialManagement/InboundMaterialManagement/DirectPurchaseReceive/Detail'
    ),
  { ssr: false }
);
const EditDirectPurchaseReceive = dynamic(
  () =>
    import(
      '@components/module/Transaction/InventoryMaterialManagement/MaterialManagement/InboundMaterialManagement/DirectPurchaseReceive/Edit'
    ),
  { ssr: false }
);

const DirectPurchaseReceive = () => {
  const { openFilterDrawer, openTableDrawer, closeFilterDrawer, openDrawer } =
    useDrawerStore();

  const handleOpenAdd = () => {
    openDrawer();
  };

  const handleOpenFilter = () => {
    openFilterDrawer('filterDirectPurchaseReceive');
  };

  const handleOpenTable = () => {
    closeFilterDrawer();
    openTableDrawer();
  };

  return (
    <>
      <Content>
        <HeaderContent title="Direct Purchase Receive" onAdd={handleOpenAdd} />
        <BodyContent>
          <div className="flex flex-col gap-4 py-2 items-center">
            <Image
              src="/images/api-empty-state.png"
              alt="api-empty-state"
              width={213}
              height={213}
            />
            <p className="text-Neutral-500 text-lg">
              Filter to find data Direct Purchase Receive
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
      <FilterDirectPurchaseReceive />
      <TableDrawer
        title="Find Direct Purchase Receive"
        queryKey={GET_DIRECT_PURCHASE_RECEIVE}
        columns={{
          columns: [
            {
              accessor: 'number',
              header: '#',
              size: 65,
            },
            {
              accessor: 'item_name',
              header: "Item's Name",
            },
            {
              accessor: 'local_code',
              header: 'Local Code',
            },
            {
              accessor: 'batch',
              header: 'Batch#',
            },
            {
              accessor: 'price',
              header: 'Price',
            },
            {
              accessor: 'quantity',
              header: 'Quantity (Inventory)',
            },
            {
              accessor: 'uom',
              header: 'UOM (Inventory)',
            },
            {
              accessor: 'discount',
              header: 'Discount%',
            },
            {
              accessor: 'rounding',
              header: 'Rounding',
            },
            {
              accessor: 'total',
              header: 'Total',
            },
            {
              accessor: 'remark',
              header: 'Remark',
            },
            {
              accessor: 'expired',
              header: 'Expired',
            },
          ],
        }}
        pinnedColumns={['number', 'item_name']}
        queryFn={getDirectPurchaseReceive}
      />
      <CreateDirectPurchaseReceive />
      <DetailDirectPurchaseReceive />
      <EditDirectPurchaseReceive />
    </>
  );
};

export default DirectPurchaseReceive;
