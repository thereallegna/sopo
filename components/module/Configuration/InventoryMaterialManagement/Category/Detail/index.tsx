'use client';

import React from 'react';
import { Button } from '@components/ui/Button';
import {
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerEndHeader,
  DrawerHeader,
} from '@components/ui/Drawer';
import { Card, CardContent } from '@components/ui/Card';
import InputField from '@components/shared/InputField';
import { useDrawerStore } from '@stores/useDrawerStore';
import { IconPencil } from '@tabler/icons-react';
import { useForm } from 'react-hook-form';
import { useSetValueForm } from '@hooks/useFormChanges';
import { Checkbox } from '@components/ui/Checkbox';

const DetailCategoryMM = () => {
  const { isOpenDetail, closeDetailDrawer, openEditDrawer } = useDrawerStore();
  const detail_data = useDrawerStore(
    (state) => state.detail_data
  ) as ItemCategoryFormBody;

  const { register, setValue } = useForm<ItemCategoryFormBody>();

  useSetValueForm<ItemCategoryFormBody>(detail_data, setValue);

  console.log('DETAILLL DATAAAAA', detail_data);

  return (
    <Drawer onClose={closeDetailDrawer} open={isOpenDetail}>
      <DrawerContent>
        <DrawerHeader
          onClick={closeDetailDrawer}
          drawerTitle="Detail Item's Category"
        >
          <DrawerEndHeader>
            <Button
              variant="primary"
              icon={{ size: 'large', icon: IconPencil, color: 'White' }}
              type="submit"
              onClick={openEditDrawer}
            >
              Edit
            </Button>
          </DrawerEndHeader>
        </DrawerHeader>
        <DrawerBody>
          <Card size="drawer">
            <CardContent className="flex-wrap flex flex-row gap-6">
              <div className="flex flex-row gap-[14px] flex-1 h-full">
                <InputField
                  value={detail_data?.item_category_code || ''}
                  className="flex-grow"
                  label="Item Category Code"
                  placeholder="Item Category Code"
                  right
                  type="text"
                  disabled
                  {...register('item_category_code')}
                />
                <InputField
                  value={detail_data?.item_category_name || ''}
                  className="flex-grow"
                  label="Item Category Name"
                  placeholder="Item Category Name"
                  right
                  type="text"
                  disabled
                  {...register('item_category_name')}
                />
                <div className="flex items-start gap-2 ml-[14px] mt-[10px]">
                  <label
                    htmlFor="active"
                    className="cursor-pointer text-base font-semibold"
                  >
                    Active
                  </label>
                  <Checkbox
                    checked={detail_data?.active}
                    disabled
                    {...register('active')}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card size="drawer">
            <CardContent className="flex-wrap flex flex-row gap-4">
              <div className="flex flex-col gap-[14px] flex-1 h-full justify-between">
                <div className="flex justify-between items-center w-full gap-3">
                  <div className="flex flex-grow items-center gap-[10px]">
                    <InputField
                      value={detail_data?.coa_stock || ''}
                      label="COA's Account (Stock)"
                      placeholder="COA's Account (Stock)"
                      right
                      disabled
                      className="flex-1"
                      {...register('coa_stock')}
                    />
                    <InputField
                      value={detail_data?.coa_stock_description || ''}
                      placeholder="COA's Account (Stock)"
                      disabled
                      className="flex-1"
                      {...register('coa_stock_description')}
                    />
                  </div>
                </div>
                <div className="flex justify-between items-center w-full gap-3">
                  <div className="flex flex-grow items-center gap-[10px]">
                    <InputField
                      value={detail_data?.coa_sales || ''}
                      label="COA's Account (Sales)"
                      placeholder="COA's Account (Sales)"
                      right
                      disabled
                      className="flex-1"
                      {...register('coa_sales')}
                    />
                    <InputField
                      value={detail_data?.coa_sales_description || ''}
                      placeholder="COA's Account (Sales)"
                      disabled
                      className="flex-1"
                      {...register('coa_sales_description')}
                    />
                  </div>
                </div>
                <div className="flex justify-between items-center w-full gap-3">
                  <div className="flex flex-grow items-center gap-[10px]">
                    <InputField
                      value={detail_data?.coa_cogs || ''}
                      label="COA's Account (COGS)"
                      placeholder="COA's Account (COGS)"
                      right
                      disabled
                      className="flex-1"
                      {...register('coa_cogs')}
                    />
                    <InputField
                      value={detail_data?.coa_cogs_description || ''}
                      placeholder="COA's Account (COGS)"
                      disabled
                      className="flex-1"
                      {...register('coa_cogs_description')}
                    />
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-[14px] flex-1 h-full justify-between">
                <div className="flex justify-between items-center w-full gap-3">
                  <div className="flex flex-grow items-center gap-[10px]">
                    <InputField
                      value={detail_data?.coa_sales_return || ''}
                      label="COA's Account (Sales Return)"
                      placeholder="COA's Account (Sales Return)"
                      right
                      disabled
                      className="flex-1"
                      {...register('coa_sales_return')}
                    />
                    <InputField
                      value={detail_data?.coa_sales_return_description || ''}
                      placeholder="COA's Account (Sales Return)"
                      disabled
                      className="flex-1"
                      {...register('coa_sales_return_description')}
                    />
                  </div>
                </div>
                <div className="flex justify-between items-center w-full gap-3">
                  <div className="flex flex-grow items-center gap-[10px]">
                    <InputField
                      value={detail_data?.coa_purchase_return || ''}
                      label="COA's Account (Purchase Return)"
                      placeholder="COA's Account (Purchase Return)"
                      right
                      disabled
                      className="flex-1"
                      {...register('coa_purchase_return')}
                    />
                    <InputField
                      value={detail_data?.coa_purchase_return_description || ''}
                      placeholder="COA's Account (Purchase Return)"
                      disabled
                      className="flex-1"
                      {...register('coa_purchase_return_description')}
                    />
                  </div>
                </div>
                <div className="flex justify-between items-center w-full gap-3">
                  <div className="flex flex-grow items-center gap-[10px]">
                    <InputField
                      value={detail_data?.coa_consumption_cost || ''}
                      label="COA's Account (Consumption Cost)"
                      placeholder="COA's Account (Consumption Cost)"
                      right
                      disabled
                      className="flex-1"
                      {...register('coa_consumption_cost')}
                    />
                    <InputField
                      value={
                        detail_data?.coa_consumption_cost_description || ''
                      }
                      placeholder="COA's Account (Consumption Cost)"
                      disabled
                      className="flex-1"
                      {...register('coa_consumption_cost_description')}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};

export default DetailCategoryMM;
