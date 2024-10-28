'use client';

import React, { Suspense } from 'react';
import TableContent from '@components/shared/TableContent';
import useCountry, { countryColumns } from '@hooks/module/useCountry';

const Country = () => {
  const { data, pagination, setPagination } = useCountry();
  return (
    <div>
      <div>Country</div>
      <div>
        <Suspense>
          <TableContent
            data={data?.results as ICountry[]}
            columns={countryColumns}
            total_pages={data?.total_pages}
            total_records={data?.total_records}
            pagination={pagination}
            onPaginationChange={setPagination}
          />
        </Suspense>
      </div>
    </div>
  );
};

export default Country;
