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
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from '@tanstack/react-table';
import TableAction from '@components/ui/Table/TableAction';
import TablePagination from '@components/ui/Table/TablePagination';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { TableContentProps } from '../../../types/client/table';

// export type TableContentProps = {
//   data: unknown[];
//   columns: AccessorKeyColumnDef<any, any>[] | ColumnDef<any, any>[];
//   pagination: PaginationState;
//   total_records?: number;
//   total_pages?: number;
//   onPaginationChange: OnChangeFn<PaginationState>;
// };

export interface PaginationState {
  pageIndex: number;
  pageSize: number;
}

const TableContent = <T,>({
  data,
  columns,
  option,
  onPagination,
  onSearch,
  onFilter,
}: TableContentProps<T>) => {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  const defaultData = React.useMemo(() => [], []);

  const table = useReactTable({
    data: data?.results ?? defaultData,
    columns,
    manualPagination: true,
    pageCount: data?.total_pages,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: (newPagination) => {
      const paginationState =
        typeof newPagination === 'function'
          ? newPagination(option.pagination)
          : newPagination;

      onPagination(paginationState);

      const { pageIndex, pageSize } = paginationState;
      const url = new URLSearchParams(params);
      url.set('page_index', (pageIndex + 1).toString());
      url.set('page_size', pageSize.toString());
      router.replace(`${pathname}?${url.toString()}`);
    },
    state: {
      pagination: option.pagination,
    },
  });

  return (
    <div className="flex flex-col gap-[10px]">
      <TableAction
        data={data?.results ?? defaultData}
        columns={columns}
        onSearch={onSearch}
        onFilter={onFilter}
      />
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
        page_size={option.pagination.pageSize}
        total_records={data?.total_records}
        total_pages={data?.total_pages}
        onNext={table.nextPage}
        nextButtonProps={{
          disabled: !table.getCanNextPage(),
        }}
        onPrev={table.previousPage}
        prevButtonProps={{
          disabled: !table.getCanPreviousPage(),
        }}
        page_index={table.getState().pagination.pageIndex + 1}
        onChangePageSize={(size: number) => table.setPageSize(size)}
      />
    </div>
  );
};

export default TableContent;
