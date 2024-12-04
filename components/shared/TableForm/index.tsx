'use client';

import React, { useState } from 'react';
import Table, {
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from '@components/ui/Table';
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import SelectColumnDropdown from '@components/ui/Table/Action/SelectColumnDropdown';
import { TableFormProps } from '../../../types/client/table';
import { generateColumns } from '../../../utils/generateColumn';

const TableForm = <T,>({ data, columns }: TableFormProps<T>) => {
  const defaultData = React.useMemo(() => [], []);
  const generatedColumns = generateColumns(columns);

  const [columnVisibility, setColumnVisibility] = useState({});

  const table = useReactTable({
    data: data ?? defaultData,
    columns: generatedColumns,
    state: {
      columnVisibility,
    },
    getCoreRowModel: getCoreRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
  });

  return (
    <div className="flex flex-col gap-[10px] w-full">
      <div className="flex justify-between items-center z-40">
        <p className="text-lg font-bold">Mutated From </p>
        <SelectColumnDropdown
          isAllColumnsVisible={table.getIsAllColumnsVisible()}
          onSelectAll={table.getToggleAllColumnsVisibilityHandler()}
          columnVisible={table.getAllLeafColumns()}
        />
      </div>
      <Table type="form">
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead
                  key={header.id}
                  activeGroup={header.column.getIsGrouped()}
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows.map((row) => (
            <TableRow key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <TableCell key={cell.id}>
                  {cell.getIsPlaceholder()
                    ? null
                    : flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <hr />
      <div className="w-full flex justify-end mt-[10px]">
        <p className="text-base font-bold">Total 43 Pcs</p>
      </div>
    </div>
  );
};

export default TableForm;
