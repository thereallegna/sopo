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

const DetailCity = () => {
  const { isOpenDetail, closeDetailDrawer, openEditDrawer } = useDrawerStore();
  const detail_data = useDrawerStore((state) => state.detail_data) as ICity;

  const { register, setValue } = useForm<ICity>();

  useDetailForm<ICity>(detail_data, setValue);

  return (
    <Drawer onClose={closeDetailDrawer} open={isOpenDetail}>
      <DrawerContent>
        <DrawerHeader onClick={closeDetailDrawer} drawerTitle="Detail City">
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
              <div className="flex flex-col gap-[14px] flex-1">
                <InputField
                  {...register('city_code')}
                  value={detail_data?.city_code || ''}
                  label="City Code"
                  placeholder="INA09-10"
                  right
                  type="text"
                  required
                  className="w-full gap-2"
                  disabled
                />
                <InputField
                  {...register('city_name')}
                  value={detail_data?.city_name || ''}
                  label="City Name"
                  right
                  type="text"
                  required
                  className="w-full gap-2"
                  disabled
                />
              </div>
              <div className="flex flex-col gap-[14px] flex-1 h-full justify-between">
                <Combobox
                  value={detail_data?.province || ''}
                  label="Province"
                  placeholder="Select Province"
                  items={[
                    { label: 'Jakarta', value: '1' },
                    { label: 'Jawa Tengah', value: '2' },
                    { label: 'Jawa Timur', value: '3' },
                  ]}
                  disabled
                />
                <InputField
                  label="Ring Area"
                  right
                  type="text"
                  className="w-full gap-2"
                  disabled
                />
              </div>
              <div className="flex flex-col gap-[14px] flex-1">
                <InputField
                  {...register('location')}
                  value={detail_data?.location || ''}
                  label="Location"
                  right
                  type="text"
                  className="w-full gap-2"
                  disabled
                />
              </div>
            </CardContent>
          </Card>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};

export default DetailCity;
