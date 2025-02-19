'use client';

import React from 'react';
import {
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerEndHeader,
  DrawerFooter,
  DrawerHeader,
} from '@components/ui/Drawer';
import { useDrawerStore } from '@stores/useDrawerStore';
import { useSetValueForm } from '@hooks/useSetValueForm';
import { useForm } from 'react-hook-form';
import { IconHistory, IconPencil } from '@tabler/icons-react';
import { Button } from '@components/ui/Button';
import DirectPurchaseReceiveHeaderForm from '../Form/HeaderForm';
import DirectPurchaseReceiveDetailForm from '../Form/DetailForm';

const DetailDirectPurchaseReceive = () => {
  const {
    isOpenDetail,
    closeDetailDrawer,
    openEditDrawer,
    openHistoryLogDrawer,
  } = useDrawerStore();
  const detail_data = useDrawerStore(
    (state) => state.detail_data
  ) as DirectPurchaseReceiveFormBody;

  const { setValue, watch, register } =
    useForm<DirectPurchaseReceiveFormBody>();

  useSetValueForm<DirectPurchaseReceiveFormBody>(detail_data, setValue);

  return (
    <Drawer onClose={closeDetailDrawer} open={isOpenDetail}>
      <DrawerContent>
        <DrawerHeader
          onClick={closeDetailDrawer}
          drawerTitle="Detail Direct Purchase Receive"
        >
          <DrawerEndHeader>
            <Button
              variant="backDrawer"
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
            <DirectPurchaseReceiveHeaderForm
              watch={watch}
              register={register}
              disableAll
            />
            <DirectPurchaseReceiveDetailForm
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
                code: detail_data?.document_number || '',
                category: 'DirectPurchaseReceive',
              });
            }}
          />
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default DetailDirectPurchaseReceive;
