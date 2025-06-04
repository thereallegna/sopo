import React, { useMemo, useState } from 'react';
import { Card, CardContent } from '@components/ui/Card';
import TableForm from '@components/shared/TableForm';
import { GET_MASTER_ITEM_MATERIAL_MANAGEMENT } from '@constants/queryKey';
import { getItem } from '@services/fetcher/configuration/inventory-management';
import { convertDirectPurchaseReceiveForm } from '@utils/converter';
import { FieldPath } from 'react-hook-form';
import { GenerateColumnsOption } from '../../../../../../../../types/client/table';
import { FormType } from '../../../../../../../../types/form';

const DirectPurchaseReceiveDetailForm = ({
  errors,
  watch,
  setValue,
  setError,
  handleInputKeyDown,
  disableAll,
  formType = 'add',
}: FormType<DirectPurchaseReceiveFormBody> & {
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
          inputProps: {
            disabled: formType !== 'add',
          },
        },
        {
          accessor: 'price',
          header: 'Price',
          type: 'input',
          inputProps: {
            type: 'number',
            disabled: formType !== 'add',
          },
        },
        {
          accessor: 'quantity',
          header: 'Quantity (Inventory)',
          type: 'input',
          inputProps: {
            type: 'number',
            disabled: formType !== 'add',
          },
        },
        {
          accessor: 'uom',
          header: 'UOM (Inventory)',
          type: 'input',
          inputProps: {
            disabled: true,
          },
        },
        {
          accessor: 'discount',
          header: 'Discount %',
          type: 'input',
          inputProps: {
            type: 'number',
            disabled: formType !== 'add',
          },
        },
        {
          accessor: 'rounding',
          header: 'Rounding',
          type: 'input',
          inputProps: {
            type: 'number',
            disabled: formType !== 'add',
          },
        },
        {
          accessor: 'total',
          header: 'Total',
          type: 'input',
          inputProps: {
            disabled: true,
          },
        },
        // {
        //     accessor: "total",
        //     header: "Total",
        //     type: "input",
        //     inputProps: {
        //         disabled: true,
        //     },
        //     cellRenderer: (rowIndex) => {
        //         const row = watch("details")?.[rowIndex];
        //         const price = row?.price || 0;
        //         const quantity = row?.quantity || 0;
        //         const discount = row?.discount || 0;
        //         const rounding = row?.rounding || 0;

        //         const total = ((price * quantity) - (price * quantity * (discount / 100))) + rounding;
        //         return total.toFixed(2);
        //     },
        // },
        {
          accessor: 'remark',
          header: 'Remark',
          type: 'input',
          inputProps: {
            disabled: formType !== 'add',
          },
        },
        {
          accessor: 'expired',
          header: 'Expired',
          type: 'input',
          inputProps: {
            type: 'date',
            disabled: formType !== 'add',
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
        {
          accessor: 'cacel_reason',
          header: 'Cancel Reason',
          type: 'input',
          inputProps: {
            type: 'text',
          },
        },
        ...options.columns,
      ];
    }

    return options;
  }, [handleInputKeyDown, formType, watch]);

  // const total = useMemo(() => {
  //     const details = watch('details');
  //     if (details) {
  //       return watch('details')
  //         .map((detail) => detail.quantity)
  //         .reduce((accumulator, currentValue) => accumulator + currentValue, 0);
  //     }
  //     return 0;
  // }, [watch('details')]);

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
        <div className="overflow-x-auto w-full">
          <TableForm
            title="Detail Item"
            data={watch('details') || []}
            columns={columns}
            errors={errors}
            disableAll={disableAll}
            showButtonDeleteRow={formType === 'add'}
            showButtonDataModal={formType === 'add'}
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
                  `details.${rowIndex}.${columnId}` as FieldPath<DirectPurchaseReceiveFormBody>,
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
                  `details.${rowIndex}.%{columnId}` as FieldPath<DirectPurchaseReceiveFormBody>,
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
            onShowGetDataModal={() => setShowModal(true)}
            getDataModalProps={{
              isOpen: showModal,
              title: 'Select Item',
              queryKey: GET_MASTER_ITEM_MATERIAL_MANAGEMENT,
              queryFn: getItem,
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
                    accessor: 'local_code',
                    header: 'Local Code',
                  },
                  {
                    accessor: 'category_name',
                    header: "Item's Category",
                  },
                  {
                    accessor: 'uom_name',
                    header: 'UOM',
                  },
                ],
                hasAction: false,
              },
              multipleSelect: true,
              idSelected: 'selected',
              targetIdSelector: 'item_name',
              valueSelected: watch('details')?.map((item) => item.item_name),
              onSelectRow: (data: any) => {
                if (setValue) {
                  const convertData = convertDirectPurchaseReceiveForm(
                    data as MasterItemFormBody
                  );
                  const prevData = watch('details') || [];
                  const itemExists = prevData.some(
                    (item) => item.item_name === convertData.item_name
                  );
                  let updatedData = [...prevData];
                  if (itemExists) {
                    const itemCount = prevData.filter(
                      (item) => item.item_name === convertData.item_name
                    ).length;

                    const newItemsToAdd = Array(itemCount + 1).fill(
                      convertData
                    );
                    updatedData = prevData.filter(
                      (item) => item.item_name !== convertData.item_name
                    );
                    updatedData = [...updatedData, ...newItemsToAdd];
                  } else {
                    updatedData.push(convertData);
                  }
                  setValue('details', updatedData);
                }
              },
            }}
            total={`${total} Quantity`}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default DirectPurchaseReceiveDetailForm;
