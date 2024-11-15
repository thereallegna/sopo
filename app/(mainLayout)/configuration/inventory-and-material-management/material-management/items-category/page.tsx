'use client';

import React from 'react';
import Content from '@components/module/Content';
import HeaderContent from '@components/module/Content/HeaderContent';
import BodyContent from '@components/module/Content/BodyContent';
import Image from 'next/image';
import FilterButton from '@components/ui/Table/Action/FilterButton';
import { useDrawerStore } from '@stores/useDrawerStore';
import { getCategoryMM } from '@services/fetcher/configuration/material-management';
import { GET_CATEGORY_MATERIAL_MANAGEMENT } from '@constants/queryKey';
import dynamic from 'next/dynamic';

const FilterCategory = dynamic(
  () => import('@components/shared/Drawer/Filter/CategoryMMFilter'),
  { ssr: false }
);
const TableDrawer = dynamic(
  () => import('@components/shared/Drawer/Table/TableDrawer'),
  { ssr: false }
);
const CreateCategory = dynamic(
  () => import('@components/shared/Drawer/Create/CreateCategoryMM'),
  { ssr: false }
);
const DetailCategory = dynamic(
  () => import('@components/shared/Drawer/Detail/DetailCategoryMM'),
  { ssr: false }
);
const EditCategory = dynamic(
  () => import('@components/shared/Drawer/Edit/EditCategoryMM'),
  { ssr: false }
);

const Country = () => {
  const { openFilterDrawer, openTableDrawer, closeFilterDrawer, openDrawer } =
    useDrawerStore();

  const handleOpenAdd = () => {
    openDrawer();
  };

  const handleOpenFilter = () => {
    openFilterDrawer('filterCategoryMM');
  };

  const handleOpenTable = () => {
    closeFilterDrawer();
    openTableDrawer();
  };

  return (
    <>
      <Content>
        <HeaderContent title="CategoryMM" onAdd={handleOpenAdd} />
        <BodyContent>
          <div className="flex flex-col gap-4 py-2 items-center">
            <Image
              src="/images/api-empty-state.png"
              alt="api-empty-state"
              width={213}
              height={213}
            />
            <p className="text-Neutral-500 text-lg">
              Filter to find data Country
            </p>
            <div>
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
      <FilterCategory />
      <TableDrawer
        title="Find CategoryMM"
        queryKey={GET_CATEGORY_MATERIAL_MANAGEMENT}
        columns={{
          columns: [
            {
              accessor: 'number',
              header: '#',
            },
            {
              accessor: 'categoryMM_code',
              header: 'Category MM Code',
            },
            {
              accessor: 'categoryMM_name',
              header: 'Category MM Name',
            },
            {
              accessor: 'create_date',
              header: 'Create MM Date',
            },
          ],
        }}
        queryFn={getCategoryMM}
      />
      <CreateCategory />
      <DetailCategory />
      <EditCategory />
    </>
  );
};

export default Country;
