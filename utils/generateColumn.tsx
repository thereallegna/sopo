import React from 'react';
import ToDetail from '@components/shared/TableContent/ToDetail';
import {
  AccessorKeyColumnDef,
  ColumnDef,
  createColumnHelper,
} from '@tanstack/react-table';
import { GenerateColumnsOption } from '../types/client/table';

export const generateColumns = ({
  columns,
  id,
  hasAction = true,
}: GenerateColumnsOption):
  | AccessorKeyColumnDef<any, any>[]
  | ColumnDef<any, any>[] => {
  const columnHelper = createColumnHelper<any>();

  const resultColumns: ColumnDef<any, any>[] = columns.map((column) =>
    columnHelper.accessor(column.accessor, {
      id: column.accessor,
      header: column.header,
      cell: (props) => props.renderValue(),
      enableGrouping: true,
    })
  );

  if (hasAction) {
    resultColumns.push(
      columnHelper.display({
        id: 'action',
        cell: (props) => <ToDetail href={`/${props.row.getValue(id)}`} />,
      })
    );
  }

  return resultColumns;
};
