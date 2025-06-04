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
// import { useDrawer } from "@hooks/useDrawer";

const DetailVendorCategory = () => {
  const {
    isOpenDetail,
    closeDetailDrawer,
    openEditDrawer,
    openHistoryLogDrawer,
  } = useDrawerStore();
  const detail_data = useDrawerStore(
    (state) => state.detail_data
  ) as VendorCategoryFormBody;

  const { register, setValue } = useForm<VendorCategoryFormBody>();

  useSetValueForm<VendorCategoryFormBody>(detail_data, setValue);

  return (
    <Drawer onClose={closeDetailDrawer} open={isOpenDetail}>
      <DrawerContent>
        <DrawerHeader
          onClick={closeDetailDrawer}
          drawerTitle="Detail Vendor Category"
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
        <DrawerBody>
          <Card size="drawer">
            <CardContent className="flex-wrap flex flex-row gap-6 items-center">
              <InputField
                value={detail_data?.vendor_category_code || ''}
                label="Vendor Category Code"
                right
                type="text"
                className="w-full gap-2"
                disabled
                {...register('vendor_category_code')}
              />
              <InputField
                value={detail_data?.vendor_category_name || ''}
                label="Vendor Category Name"
                right
                type="text"
                className="w-full gap-2"
                disabled
                {...register('vendor_category_name')}
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
                code: detail_data?.vendor_category_code,
                category: 'Vendor Category',
              })
            }
          />
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default DetailVendorCategory;
