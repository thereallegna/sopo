import React from 'react';
import Combobox from '@components/shared/Combobox';
import InputField from '@components/shared/InputField';
import { Card, CardContent } from '@components/ui/Card';
import { GET_CATEGORY_MATERIAL_MANAGEMENT, GET_UOM } from '@constants/queryKey';
import {
  getItemCategory,
  getUOM,
} from '@services/fetcher/configuration/material-management';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@components/ui/Tabs';
import { Checkbox } from '@components/ui/Checkbox';
import { FormType } from '../../../../../types/form';

const DetailForm = ({
  errors,
  watch,
  register,
  setValue,
  setError,
  handleInputKeyDown,
}: FormType<MasterItemFormBody>) => (
  <Card size="drawer" className="border border-Neutral-200 shadow-none">
    <CardContent className="flex-wrap flex flex-row gap-6 items-center">
      <Tabs defaultValue="general">
        <TabsList>
          <TabsTrigger value="general">General</TabsTrigger>
        </TabsList>
        <TabsContent
          value="general"
          className="flex-wrap flex flex-row gap-6 items-start"
        >
          <div className="flex flex-col gap-[14px] flex-1">
            <Combobox
              label="Category"
              required
              placeholder="Select Category"
              queryKey={[GET_CATEGORY_MATERIAL_MANAGEMENT]}
              queryFn={getItemCategory}
              dataLabel="item_category_name"
              dataValue="item_category_code"
              message={
                errors.category_code
                  ? { text: errors.category_code.message!, type: 'danger' }
                  : undefined
              }
              value={{
                label: watch('category_name'),
                value: watch('category_code'),
              }}
              onChange={(val) => {
                setValue('category_name', val.label);
                setValue('category_code', val.value);
                setError('category_code', { type: 'disabled' });
              }}
            />
            <Combobox
              label="UoM"
              required
              placeholder="Select UoM"
              queryKey={[GET_UOM]}
              queryFn={getUOM}
              dataLabel="uom_name"
              dataValue="uom_code"
              message={
                errors.uom_code
                  ? { text: errors.uom_code.message!, type: 'danger' }
                  : undefined
              }
              value={{
                label: watch('uom_name'),
                value: watch('uom_code'),
              }}
              onChange={(val) => {
                setValue('uom_name', val.label);
                setValue('uom_code', val.value);
                setError('uom_code', { type: 'disabled' });
              }}
            />
            <InputField
              {...register('spesification')}
              message={
                errors.spesification
                  ? {
                      text: errors.spesification.message!,
                      type: 'danger',
                    }
                  : undefined
              }
              label="Spesification"
              placeholder="Text here.."
              right
              type="text"
              className="w-full gap-2"
              textarea
              onKeyDown={handleInputKeyDown}
            />
          </div>
          <div className="flex flex-col gap-[14px] flex-1">
            <InputField
              {...register('hs_code')}
              message={
                errors.hs_code
                  ? { text: errors.hs_code.message!, type: 'danger' }
                  : undefined
              }
              label="HS Code"
              placeholder="Text here.."
              right
              type="text"
              className="w-full gap-2"
              onKeyDown={handleInputKeyDown}
            />
            <InputField
              {...register('tax_liable')}
              message={
                errors.tax_liable
                  ? { text: errors.tax_liable.message!, type: 'danger' }
                  : undefined
              }
              label="tax_liable"
              placeholder="Text here.."
              right
              type="text"
              className="w-full gap-2"
              textarea
              onKeyDown={handleInputKeyDown}
            />
            <Checkbox label="Tax Liable" />
          </div>
        </TabsContent>
      </Tabs>
    </CardContent>
  </Card>
);

export default DetailForm;
