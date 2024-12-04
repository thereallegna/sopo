import React from 'react';
import {
  AccessorKeyColumnDef,
  ColumnDef,
  createColumnHelper,
} from '@tanstack/react-table';
import Input from '@components/ui/Input';
import GoToDetail from '@components/shared/TableContent/ToDetail';
import { IconCircleCheckFilled } from '@tabler/icons-react';
import { GenerateColumnsOption } from '../types/client/table';

export const generateColumns = ({
  columns,
  hasAction = true,
}: GenerateColumnsOption):
  | AccessorKeyColumnDef<any, any>[]
  | ColumnDef<any, any>[] => {
  const columnHelper = createColumnHelper<any>();

  const resultColumns: ColumnDef<any, any>[] = columns.map((column) =>
    columnHelper.accessor(column.accessor, {
      id: column.accessor,
      header: column.header,
      cell: (props) => {
        const value = props.renderValue();

        if (typeof value === 'boolean') {
          return value ? (
            <IconCircleCheckFilled size={16} className="text-Green-500" />
          ) : null;
        }

        if (column.type === 'input') {
          return <Input defaultValue={value} {...column.inputProps} />;
        }
        return value;
      },
      enableGrouping: true,
      size: column.size,
    })
  );

  if (hasAction) {
    resultColumns.push(
      columnHelper.display({
        id: 'action',
        cell: (props) => <GoToDetail data={props.row.original} />,
      })
    );
  }

  return resultColumns;
};
