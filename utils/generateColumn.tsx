import React from 'react';
import {
  AccessorKeyColumnDef,
  ColumnDef,
  createColumnHelper,
} from '@tanstack/react-table';
// import Input from '@components/ui/Input';
import GoToDetail from '@components/shared/TableContent/ToDetail';
import { IconCircleCheckFilled } from '@tabler/icons-react';
import { Checkbox } from '@components/ui/Checkbox';
import InputField from '@components/shared/InputField';
import { Button } from '@components/ui/Button';
import { GenerateColumnsOption } from '../types/client/table';

export const generateColumns = ({
  key,
  columns,
  hasAction = true,
  disableAll,
  errors,
  onInputChange,
  onCheckedChange,
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
        const rowIndex = props.row.index; // Dapatkan indeks baris
        const columnId = props.column.id;

        if (column.type === 'button') {
          return <Button data-row-index={rowIndex} {...column.buttonProps} />;
        }

        if (column.type === 'input') {
          return (
            <InputField
              type="small"
              value={value}
              disabled={disableAll}
              onChange={(e) =>
                onInputChange &&
                onInputChange(
                  rowIndex,
                  columnId,
                  e.target.value,
                  column.inputProps?.type
                )
              }
              message={
                errors &&
                errors[key] &&
                errors[key][rowIndex] &&
                errors[key][rowIndex][columnId] &&
                errors[key][rowIndex][columnId]?.message !== undefined
                  ? {
                      text: errors[key][rowIndex][columnId].message,
                      type: 'danger',
                    }
                  : undefined
              }
              inputProps={{
                ...column.inputProps,
                defaultValue: value,
              }}
            />
          );
        }

        if (column.type === 'checkbox') {
          return (
            <Checkbox
              checked={value}
              onCheckedChange={(check) =>
                onCheckedChange && onCheckedChange(rowIndex, columnId, check)
              }
              disabled={disableAll}
              {...column.checkboxProps}
            />
          );
        }

        if (typeof value === 'boolean') {
          return value ? (
            <IconCircleCheckFilled size={16} className="text-Green-500" />
          ) : null;
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
