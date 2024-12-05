import React from 'react';
import { Card, CardContent } from '@components/ui/Card';
import TableForm from '@components/shared/TableForm';
import { GenerateColumnsOption } from '../../../../../../types/client/table';
import { FormType } from '../../../../../../types/form';

const mutateFromColumn: GenerateColumnsOption = {
  columns: [
    {
      accessor: 'its_name',
      header: 'Name',
      type: 'input',
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
    },
    {
      accessor: 'currency',
      header: 'Currency',
      type: 'input',
    },
    {
      accessor: 'unit_price',
      header: 'Unit Price',
      type: 'input',
    },
  ],
  hasAction: false,
};

// const dummyData = [
//   {
//     its_name: 'Tas Carrier 60 lt',
//     batch: 998822,
//     stock: 100,
//     quantity: 20,
//     uom: 'pcs',
//     currency: 'IDR',
//     unit_price: '6.500.000',
//   },
//   {
//     its_name: 'Tas Carrier 60 lt',
//     batch: 998822,
//     stock: 100,
//     quantity: 20,
//     uom: 'pcs',
//     currency: 'IDR',
//     unit_price: '6.500.000',
//   },
// ]

const MutateFromForm = ({
  // errors,
  watch,
  setValue,
}: // setError,
// handleInputKeyDown,
// disableAll, // Tambahkan parameter disableAll
// type = 'add'
FormType<StockMutationFormBody> & {
  // disableAll?: boolean;
  // type?: 'add' | 'edit';
}) => (
  <Card size="drawer" className="border border-Neutral-200 shadow-none">
    <CardContent className="flex-wrap flex flex-row gap-6 items-center w-full">
      <TableForm
        data={watch('mutated_from')}
        columns={mutateFromColumn}
        onChangeData={(prev) => {
          if (setValue) {
            setValue('mutated_from', prev);
          }
        }}
      />
    </CardContent>
  </Card>
);

export default MutateFromForm;
