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
import BasicForm from '../Create/BasicForm';
import DetailForm from '../Create/DetailForm';

const DetailMasterItemMM = () => {
  const { isOpenDetail, closeDetailDrawer, openEditDrawer } = useDrawerStore();
  const detail_data = useDrawerStore(
    (state) => state.detail_data
  ) as MasterItemFormBody;

  const { setValue, watch, register } = useForm<MasterItemFormBody>();

  useSetValueForm<MasterItemFormBody>(detail_data, setValue);

  return (
    <Drawer onClose={closeDetailDrawer} open={isOpenDetail}>
      <DrawerContent>
        <DrawerHeader
          onClick={closeDetailDrawer}
          drawerTitle="Detail Master Item"
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
            <BasicForm watch={watch} register={register} disableAll />
            <DetailForm watch={watch} register={register} disableAll />
          </DrawerBody>
        </form>
      </DrawerContent>
    </Drawer>
  );
};

export default DetailMasterItemMM;
