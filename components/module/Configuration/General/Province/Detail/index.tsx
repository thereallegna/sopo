'use client';

import React from 'react';
import { Button } from '@components/ui/Button';
import {
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerEndHeader,
  DrawerFooter,
  DrawerHeader,
} from '@components/ui/Drawer';
import { Card, CardContent } from '@components/ui/Card';
import InputField from '@components/shared/InputField';
import { useDrawerStore } from '@stores/useDrawerStore';
import { IconHistory, IconPencil } from '@tabler/icons-react';
import { useForm } from 'react-hook-form';
import { useSetValueForm } from '@hooks/useSetValueForm';
import Combobox from '@components/shared/Combobox';
import { GET_COUNTRY } from '@constants/queryKey';
import { getCountry } from '@services/fetcher/configuration/general';

const DetailProvince = () => {
  const {
    isOpenDetail,
    closeDetailDrawer,
    openEditDrawer,
    openHistoryLogDrawer,
  } = useDrawerStore();

  const detail_data = useDrawerStore(
    (state) => state.detail_data
  ) as ProvinceFormBody;

  const { register, setValue } = useForm<ProvinceFormBody>();

  useSetValueForm<ProvinceFormBody>(detail_data, setValue);

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
          <Card size="drawer" className="border border-Neutral-200 shadow-none">
            <CardContent className="flex-wrap flex flex-row gap-6 items-center">
              <InputField
                value={detail_data?.province_code || ''}
                label="Province Code"
                right
                type="text"
                required
                className="flex-1 gap-2"
                disabled
                {...register('province_code')}
              />
              <InputField
                value={detail_data?.province_name || ''}
                label="Province Name"
                right
                type="text"
                required
                className="flex-1 gap-2"
                disabled
                {...register('province_name')}
              />
              <Combobox
                className="flex-1 gap-2"
                label="Country"
                placeholder="Select Country"
                queryKey={[GET_COUNTRY]}
                queryFn={getCountry}
                required
                dataLabel="country"
                dataValue="country_code"
                disabled
                value={{
                  label: detail_data?.country,
                  value: detail_data?.country_code,
                }}
              />
            </CardContent>
          </Card>
        </DrawerBody>
        <DrawerFooter>
          <Button
            variant="backDrawer"
            className="w-7"
            size="icon"
            icon={{ size: 'large', icon: IconHistory, color: 'dark' }}
            type="submit"
            onClick={() =>
              openHistoryLogDrawer({
                code: detail_data?.province_code,
                category: 'Province',
              })
            }
          />
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default DetailProvince;
