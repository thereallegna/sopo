'use client';

import React from 'react';
import Table, {
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from '@components/ui/Table';
import {
  AccessorKeyColumnDef,
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  OnChangeFn,
  useReactTable,
} from '@tanstack/react-table';
import TableAction from '@components/ui/Table/TableAction';
import TablePagination from '@components/ui/Table/TablePagination';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

export type TableContentProps = {
  data?: unknown[];
  columns: AccessorKeyColumnDef<any, any>[] | ColumnDef<any, any>[];
  pagination: PaginationState;
  total_records?: number;
  total_pages?: number;
  onPaginationChange: OnChangeFn<PaginationState>;
};

export interface PaginationState {
  pageIndex: number;
  pageSize: number;
}

const TableContent = ({
  data,
  columns,
  pagination,
  total_records,
  total_pages,
  onPaginationChange,
}: TableContentProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  const defaultData = React.useMemo(() => [], []);

  const table = useReactTable({
    data: data ?? defaultData,
    columns,
    manualPagination: true,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: (newPagination) => {
      const paginationState =
        typeof newPagination === 'function'
          ? newPagination(pagination)
          : newPagination;

      onPaginationChange(paginationState);

      console.log(paginationState);

      const { pageIndex, pageSize } = paginationState;
      const url = new URLSearchParams(params);
      url.set('current_page', pageIndex.toString());
      url.set('page_size', pageSize.toString());
      router.replace(`${pathname}?${url.toString()}`);
    },
    state: {
      pagination,
    },
  });

  return (
    <div className="flex flex-col gap-[10px]">
      <TableAction data={data ?? defaultData} />
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead
                  key={header.id}
                  onGroup={header.column.getCanGroup() ? () => {} : undefined}
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
      <TablePagination
        page_size={pagination.pageSize}
        total_records={total_records}
        total_pages={total_pages}
        onNext={table.nextPage}
        onPrev={table.previousPage}
        page_index={pagination.pageIndex}
        onChangePageSize={(size: number) => table.setPageSize(size)}
      />
    </div>
  );
};

export default TableContent;
