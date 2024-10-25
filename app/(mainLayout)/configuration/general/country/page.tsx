'use client';

import TableContent from '@components/shared/TableContent';
import ToDetail from '@components/shared/TableContent/ToDetail';
import { createColumnHelper } from '@tanstack/react-table';
import React from 'react';

const dummyResponse = {
  status: '00',
  message: 'success',
  data: {
    results: [
      {
        country_code: 'ADR',
        country_name: 'Andorra',
        create_date: '29 May 2015, 16:29',
      },
      {
        country_code: 'AFG',
        country_name: 'Afghanistan',
        create_date: '29 May 2015, 16:28',
      },
      {
        country_code: 'AG',
        country_name: 'ANTIGUA AND BARBUDA',
        create_date: '29 May 2015, 16:30',
      },
      {
        country_code: 'AI',
        country_name: 'Anguilla',
        create_date: '29 May 2015, 16:30',
      },
      {
        country_code: 'ALB',
        country_name: 'Albania',
        create_date: '29 May 2015, 16:28',
      },
      {
        country_code: 'AO',
        country_name: 'Angola',
        create_date: '29 May 2015, 16:29',
      },
      {
        country_code: 'AQ',
        country_name: 'Antarctica',
        create_date: '29 May 2015, 16:30',
      },
      {
        country_code: 'ARG',
        country_name: 'ARGENTINA',
        create_date: '29 May 2015, 16:30',
      },
      {
        country_code: 'ARM',
        country_name: 'ARMENIA',
        create_date: '29 May 2015, 16:31',
      },
      {
        country_code: 'ASM',
        country_name: 'American Samoa',
        create_date: '29 May 2015, 16:29',
      },
      {
        country_code: 'ADR',
        country_name: 'Andorra',
        create_date: '29 May 2015, 16:29',
      },
      {
        country_code: 'AFG',
        country_name: 'Afghanistan',
        create_date: '29 May 2015, 16:28',
      },
      {
        country_code: 'AG',
        country_name: 'ANTIGUA AND BARBUDA',
        create_date: '29 May 2015, 16:30',
      },
      {
        country_code: 'AI',
        country_name: 'Anguilla',
        create_date: '29 May 2015, 16:30',
      },
      {
        country_code: 'ALB',
        country_name: 'Albania',
        create_date: '29 May 2015, 16:28',
      },
      {
        country_code: 'AO',
        country_name: 'Angola',
        create_date: '29 May 2015, 16:29',
      },
      {
        country_code: 'AQ',
        country_name: 'Antarctica',
        create_date: '29 May 2015, 16:30',
      },
      {
        country_code: 'ARG',
        country_name: 'ARGENTINA',
        create_date: '29 May 2015, 16:30',
      },
      {
        country_code: 'ARM',
        country_name: 'ARMENIA',
        create_date: '29 May 2015, 16:31',
      },
      {
        country_code: 'ASM',
        country_name: 'American Samoa',
        create_date: '29 May 2015, 16:29',
      },
    ],
    total_records: 169,
    total_pages: 17,
    current_page: 1,
    page_size: 10,
    has_next: true,
    has_previous: false,
  },
};

const columnHelper = createColumnHelper<typeof dummyResponse.data.results>();

const columns = [
  columnHelper.accessor('country_code', {
    id: 'number',
    header: '#',
    cell: (props) => props.row.index + 1,
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

const page = () => (
  <div>
    <div>Country</div>
    <div>
      <TableContent data={dummyResponse.data.results} columns={columns} />
    </div>
  </div>
);

export default page;
