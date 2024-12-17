import React, { useMemo, useState } from 'react';
import { Card, CardContent } from '@components/ui/Card';
import TableForm from '@components/shared/TableForm';
import { GET_DETAIL_BY_WAREHOUSE_STOCK_ADJUSTMENT } from '@constants/queryKey';
import { convertStockAdjustmentForm } from '@utils/converter';
import { FieldPath } from 'react-hook-form';
import { getItemStockAdjustment } from '@services/fetcher/transaction/inventory-material-management';
import { GenerateColumnsOption } from '../../../../../../types/client/table';
import { FormType } from '../../../../../../types/form';

const StockAdjustmentDetailForm = ({
  errors,
  watch,
  setValue,
  setError,
  handleInputKeyDown,
  disableAll,
  formType = 'add',
}: FormType<StockAdjustmentFormBody> & {
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
          accessor: 'stock_system',
          header: 'Stock System',
          type: 'input',
          inputProps: {
            disabled: true,
          },
        },
        {
          accessor: 'stock_actual',
          header: 'Stock Actual',
          type: 'input',
          inputProps: {
            disabled: formType !== 'add',
          },
        },
        {
          accessor: 'balance',
          header: 'Balance',
          type: 'input',
          inputProps: {
            disabled: true,
          },
        },
        {
          accessor: 'uom_name',
          header: 'UOM',
          type: 'input',
          inputProps: {
            disabled: true,
          },
        },
        {
          accessor: 'specification',
          header: 'Specification',
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
                `details.${rowIndex}.${columnId}` as FieldPath<StockAdjustmentFormBody>,
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
                `details.${rowIndex}.${columnId}` as FieldPath<StockAdjustmentFormBody>,
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
            queryKey: GET_DETAIL_BY_WAREHOUSE_STOCK_ADJUSTMENT,
            queryFn: getItemStockAdjustment,
            onClose: (val) => setShowModal(val),
            // pinnedColumns:
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
                  accessor: 'batch',
                  header: 'Batch',
                },
                {
                  accessor: 'stock',
                  header: 'Stock',
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
            targetIdSelector: 'item_code',
            valueSelected: watch('details')?.map((item) => item.item_code),
            onSelectRow: (data: any) => {
              if (setValue) {
                const convertData = convertStockAdjustmentForm(
                  data as TransactionItem
                );
                const prevData = watch('details') || [];
                const itemExists = prevData.some(
                  (item) => item.item_code === convertData.item_code
                );
                let updatedData;
                if (itemExists) {
                  updatedData = prevData.filter(
                    (item) => item.item_code !== convertData.item_code
                  );
                } else {
                  updatedData = [...prevData, convertData];
                }
                setValue('details', updatedData);
              }
            },
          }}
        />
      </CardContent>
    </Card>
  );
};

export default StockAdjustmentDetailForm;
