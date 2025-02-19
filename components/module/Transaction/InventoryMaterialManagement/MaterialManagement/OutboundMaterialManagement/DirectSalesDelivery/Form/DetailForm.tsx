import React, { useMemo, useState } from 'react';
import { Card, CardContent } from '@components/ui/Card';
import TableForm from '@components/shared/TableForm';
import { GET_DETAIL_BY_WAREHOUSE_DIRECT_SALES_DELIVERY } from '@constants/queryKey';
// import { convertDirectSalesDeliveryForm } from "@utils/converter";
import { FieldPath } from 'react-hook-form';
import { getItemDirectSalesDelivery } from '@services/fetcher/transaction/inventory-material-management/material-management';
import { GenerateColumnsOption } from '../../../../../../../../types/client/table';
import { FormType } from '../../../../../../../../types/form';

const DirectSalesDeliveryDetailForm = ({
  errors,
  watch,
  setValue,
  setError,
  handleInputKeyDown,
  disableAll,
  formType = 'add',
}: FormType<DirectSalesDeliveryFormBody> & {
  formType?: 'add' | 'edit' | 'detail';
}) => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const columns = useMemo((): GenerateColumnsOption => {
    const options: GenerateColumnsOption = {
      columns: [
        {
          accessor: 'item_name',
          header: "Item's Name",
          type: 'input',
          inputProps: {
            disabled: true,
          },
        },
        {
          accessor: 'batch',
          header: 'Batch',
          type: 'input',
          inputProps: {
            disabled: true,
          },
        },
        {
          accessor: 'stock',
          header: 'Stock',
          type: 'input',
          inputProps: {
            disabled: true,
          },
        },
        {
          accessor: 'quantity',
          header: 'Quantity',
          type: 'input',
          inputProps: {
            type: 'number',
            disabled: formType !== 'add',
          },
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
          accessor: 'do_price',
          header: "DO's Price",
          type: 'input',
          inputProps: {
            type: 'number',
            disabled: formType !== 'add',
          },
        },
        {
          accessor: 'amount',
          header: 'Amount',
          type: 'input',
          inputProps: {
            disabled: true,
          },
        },
      ],
      hasAction: false,
    };

    if (formType !== 'add') {
      options.columns = [
        {
          accessor: 'cancel',
          header: 'Cancel',
          type: 'checkbox',
        },
        ...options.columns,
      ];
    }

    return options;
  }, [handleInputKeyDown]);

  const total = useMemo(() => {
    const details = watch('details');
    if (details && Array.isArray(details)) {
      return details
        .map((detail) => detail.quantity || 0)
        .reduce((accumulator, currentValue) => accumulator + currentValue, 0);
    }
    return 0;
  }, [watch('details')]);

  return (
    <Card size="drawer" className="border border-Neutral-200 shadow-none">
      <CardContent className="flex-wrap flex flex-row gap-6 items-center w-full">
        <TableForm
          title="Detail Item"
          data={watch('details') || []}
          columns={columns}
          errors={errors}
          disableAll={disableAll}
          showButtonDeleteRow={formType === 'add'}
          showButtonDataModal={formType === 'add'}
          getDataButtonProps={{
            disabled: !watch('warehouse_code'),
            variant: !watch('warehouse_code') ? 'disabled' : undefined,
          }}
          onShowGetDataModal={() => {
            if (watch('warehouse_code')) {
              setShowModal(true);
            }
          }}
          onChangeData={(rowIndex, columnId, value, type) => {
            const prevData = watch('details');
            let data: string | number = value;
            if (type === 'number') {
              data = Number(data);
            }
            prevData[rowIndex] = { ...prevData[rowIndex], [columnId]: data };
            setValue?.('details', prevData);
            if (setError) {
              setError(
                `details.${rowIndex}.${columnId}` as FieldPath<DirectSalesDeliveryFormBody>,
                { type: 'disabled' }
              );
            }
          }}
          onCheckedChange={(
            rowIndex: number,
            columnId: string,
            value: boolean
          ) => {
            const prevData = watch('details');
            prevData[rowIndex] = { ...prevData[rowIndex], [columnId]: value };
            setValue?.('details', prevData);
            if (setError) {
              setError(
                `details.${rowIndex}.${columnId}` as FieldPath<DirectSalesDeliveryFormBody>,
                { type: 'disabled' }
              );
            }
          }}
          onDeleteRow={(index) => {
            const data = watch('details');
            if (index >= 0) {
              const filteredData = data.filter(
                (_, idx) => idx !== Number(index)
              );
              setValue?.('details', filteredData);
            }
          }}
          getDataModalProps={{
            isOpen: showModal,
            title: 'Select Item',
            queryKey: GET_DETAIL_BY_WAREHOUSE_DIRECT_SALES_DELIVERY,
            queryFn: getItemDirectSalesDelivery,
            onClose: (val) => setShowModal(val),
            columns: {
              columns: [
                {
                  accessor: 'selected',
                  header: '',
                  type: 'checkbox',
                  size: 50,
                },
                {
                  accessor: 'item_name',
                  header: "Item's Name",
                },
                {
                  accessor: 'property',
                  header: 'Property',
                },
                {
                  accessor: 'batch',
                  header: 'Batch',
                },
                {
                  accessor: 'lot',
                  header: 'Lot',
                },
                {
                  accessor: 'bin',
                  header: 'Bin',
                },
                {
                  accessor: 'stock',
                  header: 'Stock',
                },
                {
                  accessor: 'uom',
                  header: 'UOM',
                },
              ],
              hasAction: false,
            },
            multipleSelect: true,
            idSelected: 'selected',
            targetIdSelector: 'item_code',
            valueSelected: watch('details')?.map((item) => item.item_name),
            // onSelectRow: (data: any) => {
            //     if (setValue) {
            //         const convertData = convertDirectSalesDeliveryForm(
            //             data as TransactionItem
            //         );
            //         const prevData = watch("details") || [];
            //         const itemExists = prevData.some(
            //             (item) => item.item_name === convertData.item_name
            //         );
            //         let updatedData;
            //         if (itemExists) {
            //             updatedData = prevData.filter(
            //                 (item) => item.item_name !== convertData.item_name
            //             );
            //         } else {
            //             updatedData = [...prevData, convertData];
            //         }
            //     }
            // },
          }}
          total={`${total}`}
        />
      </CardContent>
    </Card>
  );
};

export default DirectSalesDeliveryDetailForm;
