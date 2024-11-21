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
          drawerTitle="Detail Category MM"
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
                value={detail_data?.categoryMM_code || ''}
                label="Category MM Code"
                placeholder="Category MM Code"
                right
                type="text"
                disabled
                {...register('categoryMM_code')}
              />
              <InputField
                value={detail_data?.categoryMM_name || ''}
                label="Category MM Name"
                placeholder="Category MM Name"
                right
                type="text"
                disabled
                {...register('categoryMM_name')}
              />
            </CardContent>
          </Card>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};

export default DetailCategoryMM;
