import React, { useState } from 'react';
import { Card, CardContent } from '@components/ui/Card';
import TableForm from '@components/shared/TableForm';
import { GET_INITIAL_STOCK } from '@constants/queryKey';
// import { convertStockMutationForm } from '@utils/converter';
import { getInitialStock } from '@services/fetcher/transaction/inventory-material-management';
import { GenerateColumnsOption } from '../../../../../../types/client/table';
import { FormType } from '../../../../../../types/form';

const mutateToColumn: GenerateColumnsOption = {
  columns: [
    {
      accessor: 'item_name',
      header: 'Name',
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
    },
    {
      accessor: 'uom',
      header: 'UoM',
      type: 'input',
      inputProps: {
        disabled: true,
      },
    },
    {
      accessor: 'currency',
      header: 'Currency',
      type: 'input',
      inputProps: {
        disabled: true,
      },
    },
    {
      accessor: 'unit_price',
      header: 'Unit Price',
      type: 'input',
      inputProps: {
        disabled: true,
      },
    },
  ],
  hasAction: false,
};

const MutateToForm = ({
  // errors,
  watch,
  setValue,
}: // setError,
// handleInputKeyDown,
// disableAll, // Tambahkan parameter disableAll
// type = 'add'
FormType<StockMutationFormBody>) => {
  const [showModal, setShowModal] = useState<boolean>(false);
  return (
    <Card size="drawer" className="border border-Neutral-200 shadow-none">
      <CardContent className="flex-wrap flex flex-row gap-6 items-center w-full">
        <TableForm
          title="Mutate From"
          data={watch('mutated_to')}
          columns={mutateToColumn}
          // onChangeData={(prev) => {
          //   if (setValue) {
          //     setValue('mutated_to', prev);
          //   }
          // }}
          onChangeData={(rowIndex, columnId, value) => {
            const prevData = watch('mutated_to');
            prevData[rowIndex] = { ...prevData[rowIndex], [columnId]: value };
            setValue?.('mutated_to', prevData);
          }}
          onDeleteRow={(index) => {
            const data = watch('mutated_to');
            if (index >= 0) {
              const filteredData = data.filter(
                (_, idx) => idx !== Number(index)
              );
              setValue?.('mutated_to', filteredData);
            }
          }}
          onShowGetDataModal={() => setShowModal(true)}
          getDataModalProps={{
            isOpen: showModal,
            title: 'Select Initial Stock',
            queryKey: GET_INITIAL_STOCK,
            queryFn: getInitialStock,
            onClose: (val) => setShowModal(val),
            // pinnedColumns: ['selected', 'number', 'item_code'],
            columns: {
              columns: [
                {
                  accessor: 'selected',
                  header: '',
                  type: 'checkbox',
                  size: 50,
                },
                {
                  accessor: 'document_number',
                  header: 'Document',
                },
                {
                  accessor: 'document_date',
                  header: 'Date',
                },
                {
                  accessor: 'warehouse_name',
                  header: 'Warehouse',
                },
              ],
              hasAction: false,
            },
            multipleSelect: true,
            idSelected: 'selected',
            targetIdSelector: 'document_number',
            valueSelected: watch('mutated_to')?.map(
              (item) => item.document_number
            ),
            onSelectRow: (data: any) => {
              if (setValue) {
                // Fetch Detail Initial Stock
                // const convertData = convertStockMutationForm(
                //   data as InitialStockFormBody
                // );
                const convertData = data;
                const prevData = watch('mutated_to') || []; // Default ke array kosong jika undefined
                const itemExists = prevData.some(
                  (item) => item.document_number === convertData.document_number
                );
                let updatedData;
                if (itemExists) {
                  updatedData = prevData.filter(
                    (item) =>
                      item.document_number !== convertData.document_number
                  );
                } else {
                  updatedData = [...prevData, convertData];
                }
                setValue('mutated_to', updatedData);
              }
            },
          }}
        />
      </CardContent>
    </Card>
  );
};

export default MutateToForm;
