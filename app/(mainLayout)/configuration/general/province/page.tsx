'use client';

import React from 'react';
import Content from '@components/module/Content';
import HeaderContent from '@components/module/Content/HeaderContent';
import BodyContent from '@components/module/Content/BodyContent';
import Image from 'next/image';
import FilterButton from '@components/ui/Table/Action/FilterButton';
import { useDrawerStore } from '@stores/useDrawerStore';
import { getProvince } from '@services/fetcher/configuration/general';
import { GET_PROVINCE } from '@constants/queryKey';
import dynamic from 'next/dynamic';

// Dynamically import Drawer components
const FilterProvince = dynamic(
  () => import('@components/shared/Drawer/Filter/ProvinceFilter'),
  { ssr: false }
);
const TableDrawer = dynamic(
  () => import('@components/shared/Drawer/Table/TableDrawer'),
  { ssr: false }
);
const CreateProvince = dynamic(
  () => import('@components/module/Configuration/General/Province/Create'),
  { ssr: false }
);
const DetailProvince = dynamic(
  () => import('@components/module/Configuration/General/Province/Detail'),
  { ssr: false }
);
const EditProvince = dynamic(
  () => import('@components/module/Configuration/General/Province/Edit'),
  { ssr: false }
);

const Province = () => {
  const { openFilterDrawer, openTableDrawer, closeFilterDrawer, openDrawer } =
    useDrawerStore();

  const handleOpenAdd = () => {
    openDrawer();
  };

  const handleOpenFilter = () => {
    openFilterDrawer('filterProvince');
  };

  const handleOpenTable = () => {
    closeFilterDrawer();
    openTableDrawer();
  };

  return (
    <>
      <Content>
        <HeaderContent title="Province" onAdd={handleOpenAdd} />
        <BodyContent>
          <div className="flex flex-col gap-4 py-2 items-center">
            <Image
              src="/images/api-empty-state.png"
              alt="api-empty-state"
              width={213}
              height={213}
            />
            <p className="text-Neutral-500 text-lg">
              Filter to find data Province
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
      <FilterProvince />
      <TableDrawer
        title="Find Province"
        queryKey={GET_PROVINCE}
        queryFn={getProvince}
        columns={{
          columns: [
            {
              accessor: 'number',
              header: '#',
            },
            {
              accessor: 'province_code',
              header: 'Province Code',
            },
            {
              accessor: 'province_name',
              header: 'Province Name',
            },
            {
              accessor: 'country',
              header: 'Country',
            },
            {
              accessor: 'create_date',
              header: 'Create Date',
            },
          ],
        }}
      />
      <CreateProvince />
      <DetailProvince />
      <EditProvince />
    </>
  );
};

export default Province;
