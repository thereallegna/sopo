'use client';

import React from 'react';
import Content from '@components/module/Content';
import HeaderContent from '@components/module/Content/HeaderContent';
import BodyContent from '@components/module/Content/BodyContent';
import Image from 'next/image';
import FilterButton from '@components/ui/Table/Action/FilterButton';
import { useDrawerStore } from '@stores/useDrawerStore';
import { GET_DIRECT_SALES_DELIVERY } from '@constants/queryKey';
import dynamic from 'next/dynamic';
import { getDirectSalesDelivery } from '@services/fetcher/transaction/inventory-material-management/material-management';

const FilterDirectSalesDelivery = dynamic(
  () => import('@components/shared/Drawer/Filter/DirectSalesDelivery'),
  { ssr: false }
);
const TableDrawer = dynamic(
  () => import('@components/shared/Drawer/Table/TableDrawer'),
  { ssr: false }
);
const CreateDirectSalesDelivery = dynamic(
  () =>
    import(
      '@components/module/Transaction/InventoryMaterialManagement/MaterialManagement/OutboundMaterialManagement/DirectSalesDelivery/Create'
    ),
  { ssr: false }
);
const DetailDirectSalesDelivery = dynamic(
  () =>
    import(
      '@components/module/Transaction/InventoryMaterialManagement/MaterialManagement/OutboundMaterialManagement/DirectSalesDelivery/Detail'
    ),
  { ssr: false }
);
const EditDirectSalesDelivery = dynamic(
  () =>
    import(
      '@components/module/Transaction/InventoryMaterialManagement/MaterialManagement/OutboundMaterialManagement/DirectSalesDelivery/Edit'
    ),
  { ssr: false }
);

const DirectSalesDelivery = () => {
  const { openFilterDrawer, openTableDrawer, closeFilterDrawer, openDrawer } =
    useDrawerStore();

  const handleOpenAdd = () => {
    openDrawer();
  };

  const handleOpenFilter = () => {
    openFilterDrawer('filterDirectSalesDelivery');
  };

  const handleOpenTable = () => {
    closeFilterDrawer();
    openTableDrawer();
  };

  return (
    <>
      <Content>
        <HeaderContent title="Direct Sales Delivery" onAdd={handleOpenAdd} />
        <BodyContent>
          <div className="flex flex-col gap-4 py-2 items-center">
            <Image
              src="/images/api-empty-state.png"
              alt="api-empty-state"
              width={213}
              height={213}
            />
            <p className="text-Neutral-500 text-lg">
              Filter to find data Direct Sales Delivery
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
      <FilterDirectSalesDelivery />
      <TableDrawer
        title="Find Direct Sales Delivery"
        queryKey={GET_DIRECT_SALES_DELIVERY}
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
              accessor: 'batch',
              header: 'Batch#',
            },
            {
              accessor: 'stock',
              header: 'Stock',
            },
            {
              accessor: 'quantity',
              header: 'Quantity',
            },
            {
              accessor: 'uom',
              header: 'UOM',
            },
            {
              accessor: 'do_price',
              header: "DO's Price",
            },
            {
              accessor: 'amount',
              header: 'Amount',
            },
            {
              accessor: 'remark',
              header: 'Remark',
            },
          ],
        }}
        queryFn={getDirectSalesDelivery}
      />
      <CreateDirectSalesDelivery />
      <DetailDirectSalesDelivery />
      <EditDirectSalesDelivery />
    </>
  );
};

export default DirectSalesDelivery;
