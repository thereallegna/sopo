import React from 'react';
import InputField from '@components/shared/InputField';
import { Card, CardContent } from '@components/ui/Card';
import Combobox from '@components/shared/Combobox';
import { getWarehouse } from '@services/fetcher/configuration/material-item-warehouse-management';
import { getCurrency } from '@services/fetcher/configuration/financial-management';
import { GET_WAREHOUSE, GET_CURRENCY } from '@constants/queryKey';
import { FormType } from '../../../../../../../../types/form';

const DirectSalesDeliveryHeaderForm = ({
  setError,
  errors,
  watch,
  register,
  setValue,
  handleInputKeyDown,
  disableAll,
  type = 'add',
}: FormType<DirectSalesDeliveryFormBody> & {
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
          {...register('status')}
          message={
            errors?.status
              ? { text: errors.status.message!, type: 'danger' }
              : undefined
          }
          label="Status"
          placeholder="Text here..."
          right
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
          {...register('customer')}
          message={
            errors?.customer
              ? { text: errors.customer.message!, type: 'danger' }
              : undefined
          }
          label="Customer"
          placeholder="Text here..."
          right
          required
          type="text"
          disabled={disableAll}
          className="w-full gap-2"
          onKeyDown={handleInputKeyDown}
        />
        <InputField
          {...register('local_doc')}
          message={
            errors?.local_doc
              ? { text: errors.local_doc.message!, type: 'danger' }
              : undefined
          }
          label="Local Doc.#"
          placeholder="Text here..."
          right
          type="text"
          disabled={disableAll}
          className="w-full gap-2"
          onKeyDown={handleInputKeyDown}
        />
        <InputField
          {...register('receipt')}
          message={
            errors?.receipt
              ? { text: errors.receipt.message!, type: 'danger' }
              : undefined
          }
          label="Receipt#"
          placeholder="Text here..."
          right
          type="text"
          disabled={disableAll}
          className="w-full gap-2"
          onKeyDown={handleInputKeyDown}
        />
      </div>
      <div className="flex flex-col gap-[14px] flex-1 h-full justify-between">
        <InputField
          {...register('shipping_name')}
          message={
            errors?.shipping_name
              ? { text: errors.shipping_name.message!, type: 'danger' }
              : undefined
          }
          label="Shipping Name"
          placeholder="Text here..."
          right
          required
          type="text"
          disabled={disableAll}
          className="w-full gap-2"
          onKeyDown={handleInputKeyDown}
        />
        <InputField
          {...register('address')}
          message={
            errors?.address
              ? { text: errors.address.message!, type: 'danger' }
              : undefined
          }
          label="Address"
          placeholder="Text here..."
          right
          type="text"
          disabled={disableAll}
          className="w-full gap-2"
          onKeyDown={handleInputKeyDown}
        />
        <InputField
          {...register('city')}
          message={
            errors?.city
              ? { text: errors.city.message!, type: 'danger' }
              : undefined
          }
          label="City"
          placeholder="Text here..."
          right
          type="text"
          disabled={disableAll}
          className="w-full gap-2"
          onKeyDown={handleInputKeyDown}
        />
        <InputField
          {...register('country')}
          message={
            errors?.country
              ? { text: errors.country.message!, type: 'danger' }
              : undefined
          }
          label="Country"
          placeholder="Text here..."
          right
          type="text"
          disabled={disableAll}
          className="w-full gap-2"
          onKeyDown={handleInputKeyDown}
        />
        <InputField
          {...register('postal_code')}
          message={
            errors?.postal_code
              ? { text: errors.postal_code.message!, type: 'danger' }
              : undefined
          }
          label="Postal Code"
          placeholder="Text here..."
          right
          type="text"
          disabled={disableAll}
          className="w-full gap-2"
          onKeyDown={handleInputKeyDown}
        />
        <InputField
          {...register('phone')}
          message={
            errors?.phone
              ? { text: errors.phone.message!, type: 'danger' }
              : undefined
          }
          label="Phone"
          placeholder="Text here..."
          right
          type="text"
          disabled={disableAll}
          className="w-full gap-2"
          onKeyDown={handleInputKeyDown}
        />
        <InputField
          {...register('fax')}
          message={
            errors?.fax
              ? { text: errors.fax.message!, type: 'danger' }
              : undefined
          }
          label="Fax"
          placeholder="Text here..."
          right
          type="text"
          disabled={disableAll}
          className="w-full gap-2"
          onKeyDown={handleInputKeyDown}
        />
      </div>
      <div className="flex flex-col gap-[14px] flex-1">
        <InputField
          {...register('email')}
          message={
            errors?.email
              ? { text: errors.email.message!, type: 'danger' }
              : undefined
          }
          label="Email"
          placeholder="Text here..."
          right
          type="email"
          disabled={disableAll}
          className="w-full gap-2"
          onKeyDown={handleInputKeyDown}
        />
        <InputField
          {...register('mobile')}
          message={
            errors?.mobile
              ? { text: errors.mobile.message!, type: 'danger' }
              : undefined
          }
          label="Mobile"
          placeholder="Text here..."
          right
          type="text"
          disabled={disableAll}
          className="w-full gap-2"
          onKeyDown={handleInputKeyDown}
        />
        <div className="flex flex-col gap-[14px] flex-1">
          <Combobox
            label="Currency"
            placeholder="Select Currency"
            className="flex-1"
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
                setValue('currency_name', val?.label);
                setValue('currency_code', val?.value);
              }
              if (setError) {
                setError('currency_code', { type: 'disabled' });
              }
            }}
            disabled={disableAll || type === 'edit'}
          />
          <InputField
            {...register('total_amount')}
            message={
              errors?.total_amount
                ? { text: errors.total_amount.message!, type: 'danger' }
                : undefined
            }
            label="Total Ammount"
            placeholder="Text here..."
            right
            type="text"
            disabled={disableAll}
            className="w-full gap-2 flex-1"
            onKeyDown={handleInputKeyDown}
          />
        </div>
        <InputField
          {...register('driver')}
          message={
            errors?.driver
              ? { text: errors.driver.message!, type: 'danger' }
              : undefined
          }
          label="Driver"
          placeholder="Text here..."
          right
          type="text"
          disabled={disableAll}
          className="w-full gap-2"
          onKeyDown={handleInputKeyDown}
        />
        <InputField
          {...register('expedition')}
          message={
            errors?.expedition
              ? { text: errors.expedition.message!, type: 'danger' }
              : undefined
          }
          label="Expedition"
          placeholder="Text here..."
          right
          type="text"
          disabled={disableAll}
          className="w-full gap-2"
          onKeyDown={handleInputKeyDown}
        />
        <InputField
          {...register('vehicle_req')}
          message={
            errors?.vehicle_req
              ? { text: errors.vehicle_req.message!, type: 'danger' }
              : undefined
          }
          label="Vehicle Req#"
          placeholder="Text here..."
          right
          type="text"
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

export default DirectSalesDeliveryHeaderForm;
