import React from 'react';
import InputField from '@components/shared/InputField';
import { Card, CardContent } from '@components/ui/Card';
import Combobox from '@components/shared/Combobox';
import { getWarehouse } from '@services/fetcher/configuration/inventory-management';
import { useTableStore } from '@stores/useTableStore';
import {
  GET_DETAIL_BY_WAREHOUSE_STOCK_ADJUSTMENT,
  GET_WAREHOUSE,
} from '@constants/queryKey';
import { FormType } from '../../../../../../../types/form';

const StockAdjustmentHeaderForm = ({
  setError,
  errors,
  watch,
  register,
  setValue,
  handleInputKeyDown,
  disableAll,
  type = 'add',
}: FormType<StockAdjustmentFormBody> & {
  type?: 'add' | 'edit';
}) => {
  const query = useTableStore(
    (state) => state.options[GET_DETAIL_BY_WAREHOUSE_STOCK_ADJUSTMENT].query
  ) as ItemsQuery;
  const { setQuery } = useTableStore();

  return (
    <Card size="drawer" className="border border-Neutral-200 shadow-none">
      <CardContent className="flex-wrap flex flex-row gap-6 items-center">
        <div className="flex flex-col gap-[14px] flex-1">
          <InputField
            {...register('document_number')}
            message={
              errors?.document_number
                ? { text: errors.document_number.message!, type: 'danger' }
                : undefined
            }
            label="Document Number"
            placeholder="Enter document number"
            type="text"
            required
            right
            disabled
            className="w-full gap-2"
            onKeyDown={handleInputKeyDown}
          />
          <InputField
            {...register('date')}
            message={
              errors?.date
                ? { text: errors.date.message!, type: 'danger' }
                : undefined
            }
            label="Date"
            placeholder="Text here.."
            type="date"
            right
            required
            disabled={disableAll} // Disabled berdasarkan disableAll
            className="w-full gap-2"
            onKeyDown={handleInputKeyDown}
          />
        </div>
        <div className="flex flex-col gap-[14px] flex-1 h-full justify-between">
          <Combobox
            label="Warehouse"
            placeholder="Select Warehouse"
            required
            queryKey={[GET_WAREHOUSE]}
            queryFn={getWarehouse}
            dataLabel="warehouse_name"
            dataValue="warehouse_code"
            message={
              errors?.warehouse_name
                ? { text: errors.warehouse_name.message!, type: 'danger' }
                : undefined
            }
            value={{
              label: watch('warehouse_name'),
              value: watch('warehouse_code'),
            }}
            onChange={(val) => {
              if (!disableAll && setValue) {
                setValue('warehouse_name', val.label);
                setValue('warehouse_code', val.value);
                setQuery(GET_DETAIL_BY_WAREHOUSE_STOCK_ADJUSTMENT, {
                  ...query,
                  warehouse: val.value,
                });
              }
              if (setError) {
                setError('warehouse_code', { type: 'disabled' });
              }
            }}
            disabled={disableAll || type === 'edit'}
          />
          <InputField
            {...register('remark')}
            message={
              errors?.remark
                ? { text: errors.remark.message!, type: 'danger' }
                : undefined
            }
            label="Remark"
            placeholder="Add remark"
            type="text"
            right
            textarea
            disabled={disableAll}
            className="w-full gap-2"
            onKeyDown={handleInputKeyDown}
          />
        </div>
      </CardContent>
    </Card>
  );
};
export default StockAdjustmentHeaderForm;
