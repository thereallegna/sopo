'use client';

import React from 'react';
import Content from '@components/module/Content';
import HeaderContent from '@components/module/Content/HeaderContent';
import BodyContent from '@components/module/Content/BodyContent';
import Image from 'next/image';
import FilterButton from '@components/ui/Table/Action/FilterButton';
import { useDrawerStore } from '@stores/useDrawerStore';
import { getItem } from '@services/fetcher/configuration/material-management';
import { GET_MASTER_ITEM_MATERIAL_MANAGEMENT } from '@constants/queryKey';
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
  () => import('@components/shared/Drawer/Create/CreateUoM'),
  { ssr: false }
);
const DetailUOM = dynamic(
  () => import('@components/shared/Drawer/Detail/DetailUOM'),
  { ssr: false }
);
const EditUOM = dynamic(
  () => import('@components/shared/Drawer/Edit/EditUOM'),
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
      <TableDrawer
        title="Find Master Items"
        queryKey={GET_MASTER_ITEM_MATERIAL_MANAGEMENT}
        columns={{
          columns: [
            {
              accessor: 'number',
              header: '#',
            },
            {
              accessor: 'item_code',
              header: 'Item Code',
            },
            {
              accessor: 'item_name',
              header: 'Item Name',
            },
            {
              accessor: 'local_code',
              header: 'Local Code',
            },
            {
              accessor: 'foreign_name',
              header: 'Foreign Name',
            },
            {
              accessor: 'old_code',
              header: 'Old Code',
            },
            {
              accessor: 'category_name',
              header: 'Category Name',
            },
            {
              accessor: 'spesification',
              header: 'Specification',
            },
            {
              accessor: 'active',
              header: 'Active',
            },
            {
              accessor: 'create_date',
              header: 'Create Date',
            },
          ],
        }}
        queryFn={getItem}
      />
      <CreateUOM />
      <DetailUOM />
      <EditUOM />
    </>
  );
};

export default Country;
