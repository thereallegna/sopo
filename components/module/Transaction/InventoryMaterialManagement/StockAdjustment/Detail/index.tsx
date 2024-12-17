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
import { IconPencil } from '@tabler/icons-react';
import { useDrawerStore } from '@stores/useDrawerStore';
import { useSetValueForm } from '@hooks/useSetValueForm';
import { useForm } from 'react-hook-form';
import InitialStockHeaderForm from '../Form/HeaderForm';
import InitialStockBodyForm from '../Form/DetailForm';

const DetailInitialStock = () => {
  const { isOpenDetail, closeDetailDrawer, openEditDrawer } = useDrawerStore();
  const detail_data = useDrawerStore(
    (state) => state.detail_data
  ) as StockAdjustmentFormBody;

  const { setValue, watch, register } = useForm<StockAdjustmentFormBody>();

  useSetValueForm<StockAdjustmentFormBody>(detail_data, setValue);

  console.log('detail_data', detail_data);

  return (
    <Drawer onClose={closeDetailDrawer} open={isOpenDetail}>
      <DrawerContent>
        <DrawerHeader
          onClick={closeDetailDrawer}
          drawerTitle="Detail Initial Stock"
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
        <form>
          <DrawerBody>
            <InitialStockHeaderForm
              watch={watch}
              register={register}
              disableAll
            />
            <InitialStockBodyForm
              watch={watch}
              register={register}
              formType="detail"
              disableAll
            />
          </DrawerBody>
        </form>
      </DrawerContent>
    </Drawer>
  );
};

export default DetailInitialStock;
