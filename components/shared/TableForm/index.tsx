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
  useReactTable,
} from '@tanstack/react-table';
import SelectableModal from '@components/ui/Modal';
import { Button } from '@components/ui/Button';
import IconComponent from '@components/ui/Icon';
import { IconTablePlus, IconChevronDown } from '@tabler/icons-react';
import { TableFormProps } from '../../../types/client/table';
import { generateColumns } from '../../../utils/generateColumn';

const TableForm = <T,>({
  title,
  data,
  errors,
  columns,
  getDataButtonProps,
  getDataModalProps,
  onShowGetDataModal,
  onChangeData,
}: TableFormProps<T>) => {
  // const [localData, setLocalData] = useState<T[]>(data ?? []);

  // useEffect(() => {
  //   if(data){
  //     setLocalData(data)
  //   }
  //   // setLocalData(() => {
  //   //   // const isRowEmpty = (row: any) => {
  //   //   //   if (row) {
  //   //   //     const relevantFields = Object.keys(row).filter(
  //   //   //       (key) => key !== getDataModalProps?.targetIdSelector
  //   //   //     );

  //   //   //     console.log("Cek Data => ", row, relevantFields.every((key) => row[key] === '' || row[key] === undefined))
  //   //   //     return relevantFields.every((key) => row[key] === '' || row[key] === undefined);
  //   //   //   }
  //   //   //   return false;
  //   //   // };
  //   //   const isRowEmpty = (row: any) =>
  //   //     row
  //   //       ? Object.values(row).every((v) => v === '' || v === undefined)
  //   //       : true;

  //   //   const lastRow = data?.[data.length - 1];
  //   //   const isLastRowEmpty = isRowEmpty(lastRow);

  //   //   const newData = [...(data ?? [])];

  //   //   // Tambahkan form kosong jika row terakhir kosong
  //   //   if (!data || data.length <= 0 || !isLastRowEmpty) {
  //   //     newData.push({} as T);
  //   //   }
  //   //   return newData;
  //   // })

  // }, [data]);

  const handleInputChange = React.useCallback(
    (rowIndex: number, columnId: string, value: string) => {
      const prevData = [...data];
      prevData[rowIndex] = { ...prevData[rowIndex], [columnId]: value };
      onChangeData?.(prevData);
    },
    [data, onChangeData] // Tambahkan dependensi yang relevan
  );

  // const handleInputChange = (
  //   rowIndex: number,
  //   columnId: string,
  //   value: string,
  // ) => {
  //   console.log("Cek Data melalui TableForm => ", data)
  //   const prevData = [...data];
  //   prevData[rowIndex] = { ...prevData[rowIndex], [columnId]: value };
  //   onChangeData?.(prevData);
  // setLocalData((prevData) => {
  //   const updatedData = [...prevData];
  //   updatedData[rowIndex] = { ...updatedData[rowIndex], [columnId]: value };

  // const lastRow = updatedData[updatedData.length - 1];
  // const secondLastRow = updatedData[updatedData.length - 2];

  // // const isRowEmpty = (row: any) => {
  // //   if(row) {
  // //     const relevantField = Object.keys(row).filter(
  // //       (key) => key !== getDataModalProps?.targetIdSelector
  // //     )

  // //     return relevantField
  // //       ? Object.values(relevantField).every((v) => v === '' || v === undefined)
  // //       : false;
  // //   }
  // //   return false
  // // }

  // const isRowEmpty = (row: any) => {
  //   if (row) {
  //     const relevantFields = Object.keys(row).filter(
  //       (key) => key !== getDataModalProps?.targetIdSelector
  //     );
  //     return relevantFields.every((key) => row[key] === '' || row[key] === undefined);
  //   }
  //   return false;
  // };

  // const isLastRowEmpty = isRowEmpty(lastRow);
  // const isSecondLastRowEmpty = isRowEmpty(secondLastRow);

  // if (!isLastRowEmpty) {
  //   updatedData.push({} as T);
  // }

  // if (isSecondLastRowEmpty && isLastRowEmpty) {
  //   if(secondLastRow){
  //     updatedData[updatedData.length - 2] = {} as T
  //   }
  //   updatedData.pop();
  // }

  // console.log("TEST ", update)

  //   onChangeData?.(updatedData);
  //   return updatedData;
  // });
  // };

  const generatedColumns = React.useMemo(
    () =>
      generateColumns({
        ...columns,
        onInputChange: handleInputChange,
        errors,
      }),
    [columns, data.length]
  );

  const table = useReactTable({
    data,
    columns: generatedColumns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="flex flex-col gap-[10px] w-full">
      <div className="flex justify-between items-center z-40">
        <p className="text-lg font-bold">{title}</p>
        <div>
          <Button
            type="button"
            className="px-[10px]"
            onClick={onShowGetDataModal}
            {...getDataButtonProps}
            variant={getDataButtonProps?.variant || 'secondary'}
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
            <TableRow
              key={
                (getDataModalProps &&
                  getDataModalProps.targetIdSelector &&
                  row.original[getDataModalProps.targetIdSelector]) ||
                row.id
              }
            >
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
      {getDataModalProps && <SelectableModal {...getDataModalProps} />}
    </div>
  );
};

export default TableForm;
