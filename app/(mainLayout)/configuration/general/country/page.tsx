'use client';

import TableContent from '@components/shared/TableContent';
import ToDetail from '@components/shared/TableContent/ToDetail';
import { createColumnHelper } from '@tanstack/react-table';
import React from 'react';

const columnHelper = createColumnHelper<any>();

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
      <TableContent data={[]} columns={columns} />
    </div>
  </div>
);

export default page;
