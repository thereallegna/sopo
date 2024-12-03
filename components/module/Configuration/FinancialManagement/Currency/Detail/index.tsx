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
import { useSetValueForm } from '@hooks/useFormChanges';

const DetailCurrency = () => {
  const {
    isOpenDetail,
    closeDetailDrawer,
    openEditDrawer,
    openHistoryLogDrawer,
  } = useDrawerStore();
  const detail_data = useDrawerStore(
    (state) => state.detail_data
  ) as CurrencyFormBody;

  const { register, setValue } = useForm<CurrencyFormBody>();

  useSetValueForm<CurrencyFormBody>(detail_data, setValue);

  return (
    <Drawer onClose={closeDetailDrawer} open={isOpenDetail}>
      <DrawerContent>
        <DrawerHeader onClick={closeDetailDrawer} drawerTitle="Detail Currency">
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
                value={detail_data?.currency_code || ''}
                label="Currency Code"
                placeholder="Currency Code"
                right
                type="text"
                disabled
                {...register('currency_code')}
              />
              <InputField
                value={detail_data?.currency_name || ''}
                label="Currency Name"
                placeholder="Currency Name"
                right
                type="text"
                disabled
                {...register('currency_name')}
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
                code: detail_data?.currency_code,
                category: 'Currency',
              })
            }
          />
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default DetailCurrency;
