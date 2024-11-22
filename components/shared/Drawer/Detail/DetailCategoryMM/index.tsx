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

const DetailCategoryMM = () => {
  const { isOpenDetail, closeDetailDrawer, openEditDrawer } = useDrawerStore();
  const detail_data = useDrawerStore(
    (state) => state.detail_data
  ) as ICategoryMM;

  const { register, setValue } = useForm<ICategoryMM>();

  useSetValueForm<ICategoryMM>(detail_data, setValue);

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
            <CardContent className="flex-wrap flex flex-row gap-6 items-center">
              <InputField
                value={detail_data?.item_category_code || ''}
                label="Item Category Code"
                placeholder="Item Category Code"
                right
                type="text"
                disabled
                {...register('item_category_code')}
              />
              <InputField
                value={detail_data?.item_category_name || ''}
                label="Item Category Name"
                placeholder="Item Category Name"
                right
                type="text"
                disabled
                {...register('item_category_name')}
              />
              {/* <div className='flex items-center gap-2'>
                <label htmlFor="active" className='cursor-pointer text-base font-semibold'>
                  Active
                </label>
                <Checkbox
                  value={detail_data?.active || ''}
                  disabled
                  {...register('active')}
                />
              </div> */}
            </CardContent>
          </Card>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};

export default DetailCategoryMM;
