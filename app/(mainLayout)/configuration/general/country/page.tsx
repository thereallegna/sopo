'use client';

import React from 'react';
import TableContent from '@components/shared/TableContent';
import useTable, { countryColumns } from '@hooks/useTable';
import { GET_COUNTRY } from '@constants/queryKey';
import { getCountry } from '@services/fetcher/configuration/general';
import Content from '@components/module/Content';
import HeaderContent from '@components/module/Content/HeaderContent';
import BodyContent from '@components/module/Content/BodyContent';

const Country = () => {
  const { data, pagination, onPaginationChange } = useTable<ICountry[]>({
    queryKey: GET_COUNTRY,
    queryFn: getCountry,
  });
  return (
    <Content>
      <HeaderContent title="Country" onAdd={() => {}} />
      <BodyContent>
        <TableContent
          data={data?.results}
          columns={countryColumns}
          total_pages={data?.total_pages}
          total_records={data?.total_records}
          pagination={pagination}
          onPaginationChange={onPaginationChange}
        />
      </BodyContent>
    </Content>
  );
};

export default Country;
