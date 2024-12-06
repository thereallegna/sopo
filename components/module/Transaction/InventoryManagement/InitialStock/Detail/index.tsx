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
import { useSetValueForm } from '@hooks/useFormChanges';
import { useForm } from 'react-hook-form';
// import { getInitialStock } from '@services/fetcher/transaction/inventory-material-management';
import { useQuery } from '@tanstack/react-query';
import { GET_INITIAL_STOCK } from '@constants/queryKey';
import InitialStockHeaderForm from '../Form/HeaderForm';
import InitialStockBodyForm from '../Form/BodyForm';

const DetailInitialStock = () => {
  const { isOpenDetail, closeDetailDrawer, openEditDrawer } = useDrawerStore();
  const detail_data = useDrawerStore(
    (state) => state.detail_data
  ) as InitialStockFormBody;

  const { setValue, watch, register } = useForm<InitialStockFormBody>();

  const { isLoading } = useQuery({
    queryKey: [GET_INITIAL_STOCK, detail_data],
    queryFn: async () => {
      // // const res = await getInitialStock(detail_data.document_number as string);
      // setDetailData(Object.assign(detail_data, res.data.data));
      // return res.data.data;
    },
  });

  useSetValueForm<InitialStockFormBody>(detail_data, setValue);

  return (
    <Drawer onClose={closeDetailDrawer} open={isOpenDetail}>
      <DrawerContent>
        <DrawerHeader
          onClick={closeDetailDrawer}
          drawerTitle="Detail Initial Stock"
        >
          <DrawerEndHeader>
            <Button
              variant={isLoading ? 'disabled' : 'primary'}
              icon={{ size: 'large', icon: IconPencil, color: 'White' }}
              type="submit"
              onClick={isLoading ? undefined : openEditDrawer}
              disabled={isLoading}
            >
              {isLoading ? 'Loading...' : 'Edit'}
            </Button>
          </DrawerEndHeader>
        </DrawerHeader>
        <form action="">
          <DrawerBody>
            <InitialStockHeaderForm
              watch={watch}
              register={register}
              disableAll
            />
            <InitialStockBodyForm
              watch={watch}
              register={register}
              disableAll
            />
          </DrawerBody>
        </form>
      </DrawerContent>
    </Drawer>
  );
};

export default DetailInitialStock;
