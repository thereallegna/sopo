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
import SelectableModal from '@components/ui/Modal';
// import { GET_COA, GET_MASTER_ITEM_MATERIAL_MANAGEMENT } from '@constants/queryKey';
import { GET_MASTER_ITEM_MATERIAL_MANAGEMENT } from '@constants/queryKey';
// import { getCoa } from '@services/fetcher/configuration/general';
import { getItem } from '@services/fetcher/configuration/material-item-warehouse-management';
import { Button } from '@components/ui/Button';
import IconComponent from '@components/ui/Icon';
import { IconTablePlus, IconChevronDown } from '@tabler/icons-react';
import { TableFormProps } from '../../../types/client/table';
import { generateColumns } from '../../../utils/generateColumn';

const TableForm = <T,>({ data, columns, onChangeData }: TableFormProps<T>) => {
  const [localData, setLocalData] = useState<T[]>(data ?? [{} as T]);
  const [showModalSelectable, setShowModalSelectable] =
    useState<boolean>(false);

  const handleInputChange = (
    rowIndex: number,
    columnId: string,
    value: string
  ) => {
    setLocalData((prevData) => {
      const updatedData = [...prevData];
      updatedData[rowIndex] = { ...updatedData[rowIndex], [columnId]: value };

      const lastRow = updatedData[updatedData.length - 1];
      const secondLastRow = updatedData[updatedData.length - 2];

      const isRowEmpty = (row: any) =>
        row
          ? Object.values(row).every((v) => v === '' || v === undefined)
          : false;

      const isLastRowEmpty = isRowEmpty(lastRow);
      const isSecondLastRowEmpty = isRowEmpty(secondLastRow);

      if (!isLastRowEmpty) {
        updatedData.push({} as T);
      }

      if (isSecondLastRowEmpty && isLastRowEmpty) {
        updatedData.pop();
      }

      onChangeData?.(updatedData);
      return updatedData;
    });
  };

  const generatedColumns = React.useMemo(
    () =>
      generateColumns({
        ...columns,
        onInputChange: handleInputChange,
      }),
    [columns]
  );

  const table = useReactTable({
    data: localData,
    columns: generatedColumns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="flex flex-col gap-[10px] w-full">
      <div className="flex justify-between items-center z-40">
        <p className="text-lg font-bold">Mutated From </p>
        <div>
          <Button
            type="button"
            variant="secondary"
            className="px-[10px]"
            onClick={() => setShowModalSelectable(true)}
          >
            <IconComponent icon={IconTablePlus} size="large" />
            <IconComponent icon={IconChevronDown} size="large" />
          </Button>
        </div>
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
      {/* <SelectableModal
        isOpen={showModalSelectable}
        onClose={() => setShowModalSelectable(false)}
        title="Select Stock"
        queryKey={GET_COA}
        columns={{
          columns: [
            {
              accessor: 'select',
              header: '',
              type: 'checkbox',
              size: 60,
            },
            {
              accessor: 'account',
              header: 'Coa Code',
            },
            {
              accessor: 'description',
              header: 'Coa Description',
            },
          ],
          hasAction: false,
        }}
        queryFn={getCoa}
        idSelected=""
      /> */}
      <SelectableModal
        isOpen={showModalSelectable}
        onClose={() => setShowModalSelectable(false)}
        title="Select Item"
        queryKey={GET_MASTER_ITEM_MATERIAL_MANAGEMENT}
        columns={{
          columns: [
            {
              accessor: 'select',
              header: '',
              type: 'checkbox',
              size: 60,
            },
            {
              accessor: 'number',
              header: '#',
            },
            {
              accessor: 'item_code',
              header: "Item's Code",
            },
            {
              accessor: 'item_name',
              header: "Item's Name",
            },
            {
              accessor: 'local_code',
              header: 'Local Code',
            },
            {
              accessor: 'foreign_name',
              header: 'Foreign Name',
            },
          ],
          hasAction: false,
        }}
        queryFn={getItem}
        idSelected=""
      />
    </div>
  );
};

export default TableForm;
