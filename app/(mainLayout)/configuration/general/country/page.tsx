'use client';

import React, { Suspense } from 'react';
import TableContent from '@components/shared/TableContent';
import useTable, { countryColumns } from '@hooks/useTable';
import { GET_COUNTRY } from '@constants/queryKey';
import { getCountry } from '@services/fetcher/configuration/general/country';

const Country = () => {
  const { data, pagination, onPaginationChange } = useTable<ICountry[]>({
    queryKey: GET_COUNTRY,
    queryFn: getCountry,
  });
  return (
    <div>
      <div>Country</div>
      <div>
        <Suspense>
          <TableContent
            data={data?.results}
            columns={countryColumns}
            total_pages={data?.total_pages}
            total_records={data?.total_records}
            pagination={pagination}
            onPaginationChange={onPaginationChange}
          />
        </Suspense>
      </div>
    </div>
  );
};

export default Country;
