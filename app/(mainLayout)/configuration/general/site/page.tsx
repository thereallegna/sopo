'use client';

import React from 'react';
import Content from '@components/module/Content';
import HeaderContent from '@components/module/Content/HeaderContent';
import BodyContent from '@components/module/Content/BodyContent';
import Image from 'next/image';
import FilterButton from '@components/ui/Table/Action/FilterButton';
import { useDrawerStore } from '@stores/useDrawerStore';
import { getSite } from '@services/fetcher/configuration/general';
import { GET_SITE } from '@constants/queryKey';
import dynamic from 'next/dynamic';

const FilterSite = dynamic(
  () => import('@components/shared/Drawer/Filter/SiteFilter'),
  { ssr: false }
);
const TableDrawer = dynamic(
  () => import('@components/shared/Drawer/Table/TableDrawer'),
  { ssr: false }
);
const CreateSite = dynamic(
  () => import('@components/module/Configuration/General/Site/Create'),
  { ssr: false }
);
const DetailSite = dynamic(
  () => import('@components/module/Configuration/General/Site/Detail'),
  { ssr: false }
);
const EditSite = dynamic(
  () => import('@components/module/Configuration/General/Site/Edit'),
  { ssr: false }
);

const Site = () => {
  const { openFilterDrawer, openTableDrawer, closeFilterDrawer, openDrawer } =
    useDrawerStore();

  const handleOpenAdd = () => {
    openDrawer();
  };

  const handleOpenFilter = () => {
    openFilterDrawer('filterSite');
  };

  const handleOpenTable = () => {
    closeFilterDrawer();
    openTableDrawer();
  };

  return (
    <>
      <Content>
        <HeaderContent title="Site" onAdd={handleOpenAdd} />
        <BodyContent>
          <div className="flex flex-col gap-4 py-2 items-center">
            <Image
              src="/images/api-empty-state.png"
              alt="Empty State"
              width={200}
              height={200}
            />
            <p className="text-Neutral-500 text-lg">Filter to find data Site</p>
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
      <FilterSite />
      <TableDrawer
        title="Find Site"
        queryKey={GET_SITE}
        columns={{
          columns: [
            {
              accessor: 'number',
              header: '#',
            },
            {
              accessor: 'site_code',
              header: 'Site Code',
            },
            {
              accessor: 'site_name',
              header: 'Site Name',
            },
            {
              accessor: 'address',
              header: 'Address',
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
        queryFn={getSite}
      />
      <CreateSite />
      <DetailSite />
      <EditSite />
    </>
  );
};

export default Site;
