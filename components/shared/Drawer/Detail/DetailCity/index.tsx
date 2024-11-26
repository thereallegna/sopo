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
import Combobox from '@components/shared/Combobox';
import { GET_PROVINCE } from '@constants/queryKey';
import { getProvince } from '@services/fetcher/configuration/general';
import { useSetValueForm } from '@hooks/useFormChanges';

const DetailCity = () => {
  const { isOpenDetail, closeDetailDrawer, openEditDrawer } = useDrawerStore();
  const detail_data = useDrawerStore(
    (state) => state.detail_data
  ) as CityFormBody;

  const { setValue } = useForm<CityFormBody>();

  useSetValueForm<CityFormBody>(detail_data, setValue);

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
                  label="Province"
                  placeholder="Select Province"
                  queryKey={[GET_PROVINCE]}
                  queryFn={() => getProvince()}
                  dataLabel="province_name"
                  dataValue="province_code"
                  value={{
                    label: detail_data?.province,
                    value: detail_data?.province_code,
                  }}
                  disabled
                />
                <InputField
                  value={detail_data?.ring_area || ''}
                  label="Ring Area"
                  right
                  type="text"
                  className="w-full gap-2"
                  disabled
                />
              </div>
              <div className="flex flex-col gap-[14px] flex-1">
                <InputField
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
