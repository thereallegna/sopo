import React from 'react';
import ToDetail from '@components/shared/TableContent/ToDetail';
import { createColumnHelper } from '@tanstack/react-table';
import { getCountry } from '@services/fetcher/configuration/general/country';
import { useTableStore } from '@stores/useTableStore';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { GET_COUNTRY } from '@constants/queryKey';

const columnHelper = createColumnHelper<ICountry>();

export const countryColumns = [
  columnHelper.accessor('country_code', {
    id: 'number',
    header: '#',
    cell: (props) => props.renderValue(),
    enableGrouping: true,
  }),
  columnHelper.accessor('country_code', {
    header: 'Country Code',
    cell: (props) => props.renderValue(),
    enableGrouping: true,
  }),
  columnHelper.accessor('country_name', {
    header: 'Country Name',
    cell: (props) => props.renderValue(),
    enableGrouping: true,
  }),
  columnHelper.accessor('create_date', {
    header: 'Create Date',
    cell: (props) => props.renderValue(),
    enableGrouping: true,
  }),
  columnHelper.display({
    id: 'action',
    cell: (props) => (
      <ToDetail href={`/${props.row.getValue('country_code')}`} />
    ),
  }),
];

const useCountry = () => {
  const { pagination, setPagination } = useTableStore();

  const { data: queryData } = useQuery({
    queryKey: [GET_COUNTRY, pagination],
    queryFn: () => getCountry(pagination),
    placeholderData: keepPreviousData,
  });

  return { data: queryData?.data.data, pagination, setPagination };
};

export default useCountry;
