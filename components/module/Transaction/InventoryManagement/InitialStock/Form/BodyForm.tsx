import React from 'react';
import { Card, CardContent } from '@components/ui/Card';
import TableForm from '@components/shared/TableForm';
import { GenerateColumnsOption } from '../../../../../../types/client/table';
import { FormType } from '../../../../../../types/form';

const InitialStockCol: GenerateColumnsOption = {
  columns: [
    {
      accessor: 'item_code',
      header: "Item's Code",
      type: 'input',
    },
    {
      accessor: 'item_name',
      header: "Item's Name",
      type: 'input',
    },
    {
      accessor: 'local_code',
      header: 'Local Code',
      type: 'input',
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
    },
    {
      accessor: 'price',
      header: 'Price',
      type: 'input',
    },
  ],
  hasAction: false,
};

const InitialStockBodyForm = ({}: // errors,
// watch,
// register,
// setValue,
// setError,
// handleInputKeyDown,
// disableAll,
// type = 'add',
FormType<InitialStockFormBody> & {
  // disableAll?: boolean;
  // type?: 'add' | 'edit';
}) => (
  <Card size="drawer" className="border border-Neutral-200 shadow-none">
    <CardContent className="flex-wrap flex flex-row gap-6 items-center w-full">
      <TableForm
        data={[
          {
            item_code: 12345,
            item_name: 'Sepatu Air Force 1',
            local_code: 67890,
            batch: 13579,
            quantity: 25,
            uom: 'pcs',
            price: '2.500.000',
          },
          {
            item_code: 23456,
            item_name: 'Sepatu Air Jordan 1',
            local_code: 78901,
            batch: 24680,
            quantity: 30,
            uom: 'pcs',
            price: '3.000.000',
          },
        ]}
        columns={InitialStockCol}
      />
    </CardContent>
  </Card>
);

export default InitialStockBodyForm;
