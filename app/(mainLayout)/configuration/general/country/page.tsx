'use client';

import React from 'react';
import Content from '@components/module/Content';
import HeaderContent from '@components/module/Content/HeaderContent';
import BodyContent from '@components/module/Content/BodyContent';
import { useDrawerStore } from '@stores/useDrawerStore';
import Image from 'next/image';
import FilterButton from '@components/ui/Table/Action/FilterButton';
import { getCountry } from '@services/fetcher/configuration/general';
import { GET_COUNTRY } from '@constants/queryKey';
import useSetTableState from '@hooks/useSetTableState';

const Country = () => {
  useSetTableState({
    title: 'Find Country',
    columns: {
      columns: [
        {
          accessor: 'number',
          header: '#',
        },
        {
          accessor: 'country_code',
          header: 'Country Code',
        },
        {
          accessor: 'country_name',
          header: 'Country Name',
        },
        {
          accessor: 'create_date',
          header: 'Create Date',
        },
      ],
      id: 'country_code',
    },
    queryFn: getCountry,
    keyTableDrawer: GET_COUNTRY,
    keyCreateDrawer: 'createCountry',
  });

  const { openFilterDrawer, openTableDrawer, closeFilterDrawer } =
    useDrawerStore();

  const handleOpenFilter = () => {
    openFilterDrawer('filterCountry');
  };

  const handleOpenTable = () => {
    closeFilterDrawer();
    openTableDrawer();
  };

  return (
    <Content>
      <HeaderContent title="Country" />
      <BodyContent>
        <div className="flex flex-col gap-4 py-2 items-center">
          <Image
            src="/images/api-empty-state.png"
            alt="api-empty-state"
            width={213}
            height={213}
          />
          <p className="text-Neutral-500 text-lg">
            Filter to find data Master Vendor
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
        {/* <TableContent {...tableProps} /> */}
      </BodyContent>
    </Content>
  );
};

export default Country;
