'use client';

import React from 'react';
// import TableContent from '@components/shared/TableContent';
// import useTable, { countryColumns } from '@hooks/useTable';
// import { GET_COUNTRY } from '@constants/queryKey';
// import { getCountry } from '@services/fetcher/configuration/general';
import Content from '@components/module/Content';
import HeaderContent from '@components/module/Content/HeaderContent';
import BodyContent from '@components/module/Content/BodyContent';
import { useDrawerStore } from '@stores/useDrawerStore';
import Image from 'next/image';
import FilterButton from '@components/ui/Table/Action/FilterButton';

const Country = () => {
  const { openFilterDrawer, openTableDrawer } = useDrawerStore();

  const handleOpenFilter = () => {
    openFilterDrawer('FILTER_COUNTRY');
  };

  const handleOpenTable = () => {
    openTableDrawer('GET_COUNTRY');
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
            <FilterButton variant="outlined" onClick={handleOpenFilter} />
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
