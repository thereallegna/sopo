import React from 'react';
import InputField from '@components/shared/InputField';
import { Card, CardContent } from '@components/ui/Card';
import Combobox from '@components/shared/Combobox';
import DatePicker from '@components/shared/DatePicker';
import { getWarehouse } from '@services/fetcher/configuration/material-item-warehouse-management';
import { GET_CURRENCY, GET_WAREHOUSE } from '@constants/queryKey';
import { getCurrency } from '@services/fetcher/configuration/financial-management';
import { FormType } from '../../../../../../types/form';

const InitialStockHeaderForm = ({
  setError,
  errors,
  watch,
  register,
  setValue,
  handleInputKeyDown,
  disableAll,
  type = 'add',
}: FormType<InitialStockFormBody> & {
  type?: 'add' | 'edit';
}) => (
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
        <DatePicker
          label="Date"
          placeholder="Select a Date"
          value={
            watch('document_date')
              ? new Date(watch('document_date'))
              : undefined
          }
          onChange={(date) =>
            setValue && setValue('document_date', date.toISOString())
          }
          disabled={disableAll}
          className="rounded-md border-shadow"
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
            }
            if (setError) {
              setError('warehouse_code', { type: 'disabled' });
            }
          }}
          disabled={disableAll || type === 'edit'}
        />
        <Combobox
          label="Currency"
          required
          placeholder="Select Currency"
          queryKey={[GET_CURRENCY]}
          queryFn={getCurrency}
          dataLabel="currency_name"
          dataValue="currency_code"
          message={
            errors?.currency_name
              ? { text: errors.currency_name.message!, type: 'danger' }
              : undefined
          }
          value={{
            label: watch('currency_name'),
            value: watch('currency_code'),
          }}
          onChange={(val) => {
            if (!disableAll && setValue) {
              setValue('currency_name', val.label);
              setValue('currency_code', val.value);
            }
            if (setError) {
              setError('currency_code', { type: 'disabled' });
            }
          }}
          disabled={disableAll || type === 'edit'}
        />
      </div>
      <div className="flex flex-col gap-[14px] flex-1 h-full justify-between">
        <InputField
          {...register('rate')}
          message={
            errors?.rate
              ? { text: errors.rate.message!, type: 'danger' }
              : undefined
          }
          label="Rate"
          placeholder="Enter rate"
          type="text"
          right
          required
          disabled={disableAll}
          className="w-full gap-2"
          onKeyDown={handleInputKeyDown}
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

export default InitialStockHeaderForm;
