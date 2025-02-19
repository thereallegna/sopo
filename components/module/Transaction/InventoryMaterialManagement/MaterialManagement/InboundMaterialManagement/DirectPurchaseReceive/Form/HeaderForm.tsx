import React from 'react';
import InputField from '@components/shared/InputField';
import { Card, CardContent } from '@components/ui/Card';
import Combobox from '@components/shared/Combobox';
import { getWarehouse } from '@services/fetcher/configuration/material-item-warehouse-management';
import { getCurrency } from '@services/fetcher/configuration/financial-management';
import { GET_WAREHOUSE, GET_CURRENCY } from '@constants/queryKey';
import { FormType } from '../../../../../../../../types/form';

const DirectPurchaseReceiveHeaderForm = ({
  setError,
  errors,
  watch,
  register,
  setValue,
  handleInputKeyDown,
  disableAll,
  type = 'add',
}: FormType<DirectPurchaseReceiveFormBody> & {
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
          placeholder="Text here..."
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
          placeholder="Select Date"
          type="date"
          right
          required
          disabled={disableAll}
          className="w-full gap-2"
          onKeyDown={handleInputKeyDown}
          value={watch('date')}
        />
        <InputField
          {...register('local_code')}
          message={
            errors?.local_code
              ? { text: errors.local_code.message!, type: 'danger' }
              : undefined
          }
          label="Local#"
          placeholder="Text here..."
          right
          type="text"
          disabled={disableAll}
          className="w-full gap-2"
          onKeyDown={handleInputKeyDown}
        />
        <InputField
          {...register('department')}
          message={
            errors?.department
              ? { text: errors.department.message!, type: 'danger' }
              : undefined
          }
          label="Department"
          placeholder="Text here..."
          right
          required
          type="text"
          disabled={disableAll}
          className="w-full gap-2"
          onKeyDown={handleInputKeyDown}
        />
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
        <InputField
          {...register('vendor')}
          message={
            errors?.vendor
              ? { text: errors.vendor.message!, type: 'danger' }
              : undefined
          }
          label="Vendor"
          placeholder="Text here..."
          right
          required
          type="text"
          disabled={disableAll}
          className="w-full gap-2"
          onKeyDown={handleInputKeyDown}
        />
      </div>
      <div className="flex flex-col gap-[14px] flex-1 h-full justify-between">
        <InputField
          {...register('do')}
          message={
            errors?.do
              ? { text: errors.do.message!, type: 'danger' }
              : undefined
          }
          label="DO#"
          placeholder="Text here..."
          right
          type="text"
          disabled={disableAll}
          className="w-full gap-2"
          onKeyDown={handleInputKeyDown}
        />
        <InputField
          {...register('site')}
          message={
            errors?.site
              ? { text: errors.site.message!, type: 'danger' }
              : undefined
          }
          label="Site"
          placeholder="Text here..."
          right
          type="text"
          disabled={disableAll}
          className="w-full gap-2"
          onKeyDown={handleInputKeyDown}
        />
        <InputField
          {...register('term_of_payment')}
          message={
            errors?.term_of_payment
              ? { text: errors.term_of_payment.message!, type: 'danger' }
              : undefined
          }
          label="Term of Payment"
          placeholder="Text here..."
          right
          required
          type="text"
          disabled={disableAll}
          className="w-full gap-2"
          onKeyDown={handleInputKeyDown}
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
        <InputField
          {...register('tax')}
          message={
            errors?.tax
              ? { text: errors.tax.message!, type: 'danger' }
              : undefined
          }
          label="Tax"
          placeholder="Text here..."
          right
          required
          type="text"
          disabled={disableAll}
          className="w-full gap-2"
          onKeyDown={handleInputKeyDown}
        />
      </div>
      <div className="flex flex-col gap-[14px] flex-1 h-full justify-between">
        <InputField
          {...register('total_tax')}
          message={
            errors?.total_tax
              ? { text: errors.total_tax.message!, type: 'danger' }
              : undefined
          }
          label="Total Tax"
          placeholder="Text here..."
          right
          type="number"
          disabled={disableAll}
          className="w-full gap-2"
          onKeyDown={handleInputKeyDown}
        />
        <InputField
          {...register('discount_amount')}
          message={
            errors?.discount_amount
              ? { text: errors.discount_amount.message!, type: 'danger' }
              : undefined
          }
          label="Discount Amount"
          placeholder="Text here..."
          right
          type="number"
          disabled={disableAll}
          className="w-full gap-2"
          onKeyDown={handleInputKeyDown}
        />
        <InputField
          {...register('grand_total')}
          message={
            errors?.grand_total
              ? { text: errors.grand_total.message!, type: 'danger' }
              : undefined
          }
          label="Grand Total"
          placeholder="Text here..."
          right
          type="number"
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
          placeholder="Text here..."
          type="text"
          right
          textarea
          disabled={disableAll}
          className="w-full gap-2"
          onKeyDown={handleInputKeyDown}
        />
        <InputField
          {...register('project')}
          message={
            errors?.project
              ? { text: errors.project.message!, type: 'danger' }
              : undefined
          }
          label="Project"
          placeholder="Text here..."
          type="text"
          right
          disabled={disableAll}
          className="w-full gap-2"
          onKeyDown={handleInputKeyDown}
        />
      </div>
    </CardContent>
  </Card>
);

export default DirectPurchaseReceiveHeaderForm;
