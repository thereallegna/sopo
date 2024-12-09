import React from 'react';
import { Card, CardContent } from '@components/ui/Card';
import TableForm from '@components/shared/TableForm';
import { GenerateColumnsOption } from '../../../../../../types/client/table';
import { FormType } from '../../../../../../types/form';

const BodyFormColumn: GenerateColumnsOption = {
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

const InitialStockDetailForm = ({
  // errors,
  watch,
  // register,
  setValue,
}: // setError,
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
        data={watch('detail')}
        columns={BodyFormColumn}
        onChangeData={(prev) => {
          if (setValue) {
            setValue('detail', prev);
          }
        }}
      />
    </CardContent>
  </Card>
);

export default InitialStockDetailForm;
