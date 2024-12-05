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
import { getDetailItem } from '@services/fetcher/configuration/material-management';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { GET_DETAIL_MASTER_ITEM } from '@constants/queryKey';
// import { useDetailItem } from '@hooks/useDetailItem';
import BasicForm from '../Form/BasicForm';
import MutateFromForm from '../Form/MutateFromForm';

const DetailMasterItemMM = () => {
  const { isOpenDetail, closeDetailDrawer, openEditDrawer, setDetailData } =
    useDrawerStore();
  const detail_data = useDrawerStore(
    (state) => state.detail_data
  ) as StockMutationFormBody;

  const { setValue, watch, register } = useForm<StockMutationFormBody>();

  const { isLoading } = useQuery({
    queryKey: [GET_DETAIL_MASTER_ITEM, detail_data],
    queryFn: async () => {
      const res = await getDetailItem(detail_data.document as string);
      setDetailData(Object.assign(detail_data, res.data.data));
      return res.data.data;
    },
    placeholderData: keepPreviousData,
  });

  useSetValueForm<StockMutationFormBody>(detail_data, setValue, isLoading);

  return (
    <Drawer onClose={closeDetailDrawer} open={isOpenDetail}>
      <DrawerContent>
        <DrawerHeader
          onClick={closeDetailDrawer}
          drawerTitle="Detail Stock Mutation"
        >
          <DrawerEndHeader>
            <Button
              variant={isLoading ? 'disabled' : 'primary'}
              icon={{ size: 'large', icon: IconPencil, color: 'White' }}
              type="submit"
              onClick={isLoading ? undefined : openEditDrawer}
              disabled={isLoading}
            >
              {isLoading ? 'Loading..' : 'Edit'}
            </Button>
          </DrawerEndHeader>
        </DrawerHeader>
        <form>
          <DrawerBody>
            <BasicForm watch={watch} register={register} disableAll />
            <MutateFromForm watch={watch} register={register} disableAll />
          </DrawerBody>
        </form>
      </DrawerContent>
    </Drawer>
  );
};

export default DetailMasterItemMM;
