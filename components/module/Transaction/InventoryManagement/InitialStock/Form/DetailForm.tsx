import React, { useState } from 'react';
import { Card, CardContent } from '@components/ui/Card';
import TableForm from '@components/shared/TableForm';
import { GET_MASTER_ITEM_MATERIAL_MANAGEMENT } from '@constants/queryKey';
import { getItem } from '@services/fetcher/configuration/material-item-warehouse-management';
import { FieldPath } from 'react-hook-form';
import { GenerateColumnsOption } from '../../../../../../types/client/table';
import { FormType } from '../../../../../../types/form';
// import { convertInitialStockForm } from '@utils/converter';

const detailFormColumn: GenerateColumnsOption = {
  columns: [
    {
      accessor: 'item_code',
      header: "Item's Code",
      type: 'input',
      inputProps: {
        disabled: true,
      },
    },
    {
      accessor: 'item_name',
      header: "Item's Name",
      type: 'input',
      inputProps: {
        disabled: true,
      },
    },
    {
      accessor: 'local_code',
      header: 'Local Code',
      type: 'input',
      inputProps: {
        disabled: true,
      },
    },
    {
      accessor: 'batch',
      header: 'Batch',
      type: 'input',
    },
    {
      accessor: 'quantity',
      header: 'Quantity',
      type: 'input',
    },
    {
      accessor: 'uom',
      header: 'UOM',
      type: 'input',
      inputProps: {
        disabled: true,
      },
    },
    {
      accessor: 'unit_price',
      header: 'Unit Price',
      type: 'input',
    },
  ],
  hasAction: false,
};

const InitialStockDetailForm = ({
  errors,
  watch,
  setValue,
  setError,
}: // setError,
// handleInputKeyDown,
// disableAll,
// type = 'add'
FormType<InitialStockFormBody>) => {
  const [showModal, setShowModal] = useState<boolean>(false);
  return (
    <Card size="drawer" className="border border-Neutral-200 shadow-none">
      <CardContent className="flex-wrap flex flex-row gap-6 items-center w-full">
        <TableForm
          title="Detail"
          data={watch('detail') || []}
          columns={detailFormColumn}
          errors={errors}
          // onChangeData={(prev) => {
          //   if (setValue) {
          //     setValue('detail', prev);
          //   }
          // }}
          onChangeData={(rowIndex, columnId, value) => {
            const prevData = watch('detail');
            prevData[rowIndex] = { ...prevData[rowIndex], [columnId]: value };
            setValue?.('detail', prevData);
            if (setError) {
              setError(
                `detail.${rowIndex}.${columnId}` as FieldPath<InitialStockFormBody>,
                { type: 'disabled' }
              );
            }
          }}
          onShowGetDataModal={() => setShowModal(true)}
          getDataModalProps={{
            isOpen: showModal,
            title: 'Select Item',
            queryKey: GET_MASTER_ITEM_MATERIAL_MANAGEMENT,
            queryFn: getItem,
            onClose: (val) => setShowModal(val),
            // pinnedColumns:
            // columns: {
            //   columns: [
            //     {
            //       accessor: "selected",
            //       header: "",
            //       type: "checkbox",
            //       size: 50,
            //     },
            //     {
            //       accessor: "item_code",
            //       header: "Item's Code",
            //     },
            //     {
            //       accessor: "item_name",
            //       header: "Item's Name",
            //     },
            //     {
            //       accessor: "local_code",
            //       header: "Local Code",
            //     },
            //   ],
            //   hasAction: false
            // },
            columns: {
              columns: [
                {
                  accessor: 'selected',
                  header: '',
                  type: 'checkbox',
                  size: 50,
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
                {
                  accessor: 'old_code',
                  header: 'Old Code',
                },
                {
                  accessor: 'category_name',
                  header: 'Category Name',
                },
                {
                  accessor: 'spesification',
                  header: 'Spesification',
                },
              ],
              hasAction: false,
            },
            multipleSelect: true,
            idSelected: 'selected',
            targetIdSelector: 'item_code',
            valueSelected: watch('detail')?.map((item) => item.item_code),
            // onSelectRow: (data: any) => {
            //   if (setValue) {
            //     // const convertData = convertInitialStockForm(data as MasterItemFormBody);
            //     // const prevData = watch('detail') || [];
            //     // const itemExists = prevData.some(item => item.item_code === convertData.item_code);
            //     // let updatedData;
            //     // if (itemExists) {
            //     //   updatedData = prevData.filter(item => item.item_code !== convertData.item_code);
            //     // } else {
            //     //   updatedData = [...prevData, convertData];
            //     // }
            //     // setValue('detail', updatedData);
            //   }
            // }
          }}
        />
      </CardContent>
    </Card>
  );
};

export default InitialStockDetailForm;
