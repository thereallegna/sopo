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
import { useDetailForm } from '@hooks/useFormChanges';
import Combobox from '@components/ui/Combobox';

const DetailProvince = () => {
  const { isOpenDetail, closeDetailDrawer, openEditDrawer } = useDrawerStore();
  const detail_data = useDrawerStore((state) => state.detail_data) as IProvince;

  const { register, setValue } = useForm<IProvince>();

  useDetailForm<IProvince>(detail_data, setValue);

  return (
    <Drawer onClose={closeDetailDrawer} open={isOpenDetail}>
      <DrawerContent>
        <DrawerHeader onClick={closeDetailDrawer} drawerTitle="Detail Province">
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
                {...register('province_code')}
                value={detail_data?.province_code || ''}
                label="Province Code"
                placeholder="INA09-10"
                right
                type="text"
                required
                className="flex-1 gap-2"
                disabled
              />
              <InputField
                {...register('province_name')}
                value={detail_data?.province_name || ''}
                label="Province Name"
                right
                type="text"
                required
                className="flex-1 gap-2"
                disabled
              />
              <Combobox
                className="flex-1 gap-2"
                value={detail_data?.country || ''}
                label="Country"
                placeholder="Select Country"
                items={[
                  { label: 'Jawir', value: '1' },
                  { label: 'INDONESIA', value: '2' },
                  { label: 'Sunda', value: '3' },
                ]}
                disabled
              />
            </CardContent>
          </Card>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};

export default DetailProvince;
