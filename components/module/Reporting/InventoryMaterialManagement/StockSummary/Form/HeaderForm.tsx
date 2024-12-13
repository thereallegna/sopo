import React from 'react';
import InputField from '@components/shared/InputField';
import { Card, CardContent } from '@components/ui/Card';
import Combobox from '@components/shared/Combobox';
import DatePicker from '@components/shared/DatePicker';
import {
  GET_CATEGORY_MATERIAL_MANAGEMENT,
  GET_WAREHOUSE,
} from '@constants/queryKey';
import {
  getItemCategory,
  getWarehouse,
} from '@services/fetcher/configuration/material-item-warehouse-management';
import { FormType } from '../../../../../../types/form';

const StockSummaryHeaderForm = ({
  setError,
  errors,
  watch,
  register,
  setValue,
  handleInputKeyDown,
  disableAll,
  type = 'add',
}: FormType<StockSummaryFormBody> & {
  type?: 'add' | 'edit';
}) => (
  <Card size="drawer" className="border border-Neutral-200 shadow-none">
    <CardContent className="flex-wrap flex flex-row gap-6 items-center">
      <div className="flex flex-col gap-[14px] flex-1">
        <Combobox
          label="Item's Category"
          placeholder="Selecy Item Category"
          queryKey={[GET_CATEGORY_MATERIAL_MANAGEMENT]}
          queryFn={getItemCategory}
          dataLabel="item_category_name"
          dataValue="item_category_code"
          message={
            errors?.item_category_name
              ? { text: errors.item_category_name.message!, type: 'danger' }
              : undefined
          }
          value={{
            label: watch('item_category_name'),
            value: watch('item_category_code'),
          }}
          onChange={(val) => {
            if (!disableAll && setValue) {
              setValue('item_category_name', val.label);
              setValue('item_category_code', val.value);
            }
            if (setError) {
              setError('item_category_code', { type: 'disabled' });
            }
          }}
          disabled={disableAll || type === 'edit'}
        />
        <InputField
          {...register('item_code')}
          message={
            errors?.item_code
              ? { text: errors.item_code.message!, type: 'danger' }
              : undefined
          }
          label="Item's Code"
          placeholder="Enter Item's Code"
          type="text"
          right
          className="w-full gap-2"
          onKeyDown={handleInputKeyDown}
        />
      </div>
      <div className="flex flex-col gap-[14px] flex-1 h-full justify-between">
        <InputField
          {...register('item_name')}
          message={
            errors?.item_name
              ? { text: errors.item_name.message!, type: 'danger' }
              : undefined
          }
          label="Item's Name"
          placeholder="Enter Item's Name"
          type="text"
          right
          className="w-full gap-2"
          onKeyDown={handleInputKeyDown}
        />
        <Combobox
          label="Multi Warehosue"
          placeholder="Select Warehouse"
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
            }
            if (setError) {
              setError('warehouse_code', { type: 'disabled' });
            }
          }}
          disabled={disableAll || type === 'edit'}
        />
      </div>
      <div className="flex flex-col gap-[14px] flex-1 h-full justify-between">
        <DatePicker
          label="Date"
          placeholder="Select a Date"
          value={watch('date') ? new Date(watch('date')) : undefined}
          onChange={(date) => setValue && setValue('date', date.toISOString())}
          disabled={disableAll}
          className="rounded-md border-shadow"
        />
      </div>
    </CardContent>
  </Card>
);

export default StockSummaryHeaderForm;
