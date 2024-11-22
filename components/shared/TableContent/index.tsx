'use client';

import React, { CSSProperties } from 'react';
import Table, {
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from '@components/ui/Table';
import {
  Column,
  flexRender,
  getCoreRowModel,
  getExpandedRowModel,
  getFilteredRowModel,
  getGroupedRowModel,
  getPaginationRowModel,
  useReactTable,
} from '@tanstack/react-table';
import TableAction from '@components/ui/Table/TableAction';
import TablePagination from '@components/ui/Table/TablePagination';
import { IconChevronDown } from '@tabler/icons-react';
import { cn } from '@libs/classNames';
import IconComponent from '@components/ui/Icon';
import { TableContentProps } from '../../../types/client/table';
import { generateColumns } from '../../../utils/generateColumn';

export interface PaginationState {
  pageIndex: number;
  pageSize: number;
}

const getCommonPinningStyles = (column: Column<any>): CSSProperties => {
  const isPinned = column.getIsPinned();
  const isLastLeftPinnedColumn =
    isPinned === 'left' && column.getIsLastColumn('left');
  const isFirstRightPinnedColumn =
    isPinned === 'right' && column.getIsFirstColumn('right');

  let boxShadow: string | undefined;

  if (isLastLeftPinnedColumn) {
    boxShadow = '-1px 0 1px -1px gray inset';
  } else if (isFirstRightPinnedColumn) {
    boxShadow = '1px 0 1px -1px gray inset';
  }

  const left = isPinned === 'left' ? `${column.getStart('left')}px` : undefined;
  const right =
    isPinned === 'right' ? `${column.getAfter('right')}px` : undefined;

  const position = isPinned ? 'sticky' : 'relative';
  const zIndex = isPinned ? 1 : 0;

  return {
    boxShadow,
    left,
    right,
    position,
    width: column.getSize(),
    zIndex,
  };
};

const TableContent = <T,>({
  data,
  columns,
  option,
  pinnedColumns,
  onSelectRow,
  onPagination,
  onSearch,
  onFilter,
  onColumnVisibility,
  onGrouping,
  onRowSizeChange,
}: TableContentProps<T>) => {
  const defaultData = React.useMemo(() => [], []);
  const generatedColumns = generateColumns(columns);

  const isGrouping = option.grouping.length > 0;

  const table = useReactTable({
    data: data?.results ?? defaultData,
    columns: generatedColumns,
    // Jika ada grouping, gunakan pagination otomatis; jika tidak, manual
    manualPagination: !isGrouping,
    pageCount: !isGrouping ? data?.total_pages : undefined,
    state: {
      grouping: option.grouping,
      pagination: option.pagination,
      columnVisibility: option.columnVisibility,
      columnPinning: {
        left: pinnedColumns,
      },
    },
    getGroupedRowModel: getGroupedRowModel(),
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
    onColumnVisibilityChange: onColumnVisibility,
    onPaginationChange: onPagination,
    onGroupingChange: onGrouping,
  });

  return (
    <div className="flex flex-col gap-[10px]">
      <TableAction
        search={option.search}
        rowSize={option.rowSize}
        data={data?.results ?? defaultData}
        columns={generatedColumns}
        onSearch={onSearch}
        onFilter={onFilter}
        onRowSizeChange={onRowSizeChange}
        columnSelector={{
          isAllColumnsVisible: table.getIsAllColumnsVisible(),
          onSelectAll: table.getToggleAllColumnsVisibilityHandler(),
          columnVisible: table.getAllLeafColumns(),
        }}
      />
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead
                  key={header.id}
                  activeGroup={header.column.getIsGrouped()}
                  onGroup={
                    header.column.getCanGroup()
                      ? header.column.getToggleGroupingHandler()
                      : undefined
                  }
                  style={{ ...getCommonPinningStyles(header.column) }}
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
            <TableRow
              key={row.id}
              onClick={
                onSelectRow ? () => onSelectRow(row.original) : undefined
              }
            >
              {row.getVisibleCells().map((cell) => {
                if (cell.getIsGrouped()) {
                  return (
                    <TableCell
                      key={cell.id}
                      size={option.rowSize}
                      onClick={row.getToggleExpandedHandler()}
                      className={`${
                        row.getCanExpand() ? 'cursor-pointer' : ''
                      }`}
                      style={{ ...getCommonPinningStyles(cell.column) }}
                    >
                      <div className="flex items-center gap-[10px]">
                        {cell.getIsGrouped() && (
                          <IconComponent
                            icon={IconChevronDown}
                            color="secondary"
                            className={cn(
                              'transition-transform duration-200',
                              row.getIsExpanded() && 'rotate-180'
                            )}
                          />
                        )}
                        <div className="flex flex-col text-base">
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                          <p
                            className={`${
                              row.getIsExpanded()
                                ? 'text-Neutral-Black'
                                : 'text-Neutral-500'
                            }`}
                          >
                            ({row.subRows.length})
                          </p>
                        </div>
                      </div>
                    </TableCell>
                  );
                }
                if (cell.getIsAggregated()) {
                  return (
                    <TableCell
                      key={cell.id}
                      size={option.rowSize}
                      style={{ ...getCommonPinningStyles(cell.column) }}
                    >
                      {/* {
                          flexRender(
                            cell.column.columnDef.aggregatedCell ??
                              cell.column.columnDef.cell,
                            cell.getContext()
                          )
                        } */}
                    </TableCell>
                  );
                }
                return (
                  <TableCell
                    key={cell.id}
                    size={option.rowSize}
                    style={{ ...getCommonPinningStyles(cell.column) }}
                  >
                    {cell.getIsPlaceholder()
                      ? null
                      : flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                    {/* </div> */}
                  </TableCell>
                );
              })}
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <TablePagination
        page_size={option.pagination.pageSize}
        total_records={data?.total_records}
        total_pages={table.getPageCount()}
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
