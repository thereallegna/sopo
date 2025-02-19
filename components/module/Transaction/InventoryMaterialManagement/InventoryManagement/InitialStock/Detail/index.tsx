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
import { IconHistory, IconPencil } from '@tabler/icons-react';
import { useDrawerStore } from '@stores/useDrawerStore';
import { useSetValueForm } from '@hooks/useSetValueForm';
import { useForm } from 'react-hook-form';
import InitialStockHeaderForm from '../Form/HeaderForm';
import InitialStockDetailForm from '../Form/DetailForm';

const DetailInitialStock = () => {
  const {
    isOpenDetail,
    closeDetailDrawer,
    openEditDrawer,
    openHistoryLogDrawer,
  } = useDrawerStore();
  const detail_data = useDrawerStore(
    (state) => state.detail_data
  ) as InitialStockFormBody;

  const { setValue, watch, register } = useForm<InitialStockFormBody>();

  useSetValueForm<InitialStockFormBody>(detail_data, setValue);

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
            <InitialStockDetailForm
              watch={watch}
              register={register}
              formType="detail"
              disableAll
            />
          </DrawerBody>
        </form>
        <DrawerFooter>
          <Button
            variant="backDrawer"
            className="w-7"
            size="icon"
            icon={{ size: 'large', icon: IconHistory, color: 'dark' }}
            type="submit"
            onClick={() => {
              openHistoryLogDrawer({
                code: detail_data?.document_number,
                category: 'StockInitial',
              });
            }}
          />
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default DetailInitialStock;
