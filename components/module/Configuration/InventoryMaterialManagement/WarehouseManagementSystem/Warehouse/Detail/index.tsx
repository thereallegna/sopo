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
import { IconHistory, IconPencil } from '@tabler/icons-react';
import { getCity } from '@services/fetcher/configuration/general';
import { getWarehouseCategory } from '@services/fetcher/configuration/inventory-management';
import Combobox from '@components/shared/Combobox';
import { GET_CITY, GET_WAREHOUSE_CATEGORY } from '@constants/queryKey';
import { useForm } from 'react-hook-form';
import { useDrawerStore } from '@stores/useDrawerStore';
import { useSetValueForm } from '@hooks/useSetValueForm';

const DetailWarehouse = () => {
  const {
    isOpenDetail,
    closeDetailDrawer,
    openEditDrawer,
    openHistoryLogDrawer,
  } = useDrawerStore();
  const detail_data = useDrawerStore(
    (state) => state.detail_data
  ) as WarehouseFormBody;

  const { setValue } = useForm<WarehouseFormBody>();

  useSetValueForm<WarehouseFormBody>(detail_data, setValue);

  return (
    <Drawer onClose={closeDetailDrawer} open={isOpenDetail}>
      <DrawerContent>
        <DrawerHeader
          onClick={closeDetailDrawer}
          drawerTitle="Detail Warehouse"
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
          <Card size="drawer" className="border border-Neutral-200 shadow-none">
            <CardContent className="flex-wrap flex flex-row gap-6">
              <div className="flex flex-col gap-[14px] flex-1">
                <InputField
                  value={detail_data?.warehouse_code || ''}
                  label="Warehouse Code"
                  placeholder="Kode Gudang"
                  right
                  type="text"
                  required
                  className="w-full gap-2"
                  disabled
                />
                <InputField
                  value={detail_data?.warehouse_name || ''}
                  label="Warehouse Name"
                  placeholder="Nama Gudang"
                  right
                  type="text"
                  required
                  className="w-full gap-2"
                  disabled
                />
                <Combobox
                  label="Warehouse Category"
                  placeholder="Pilih Kateogri Gudang"
                  queryKey={[GET_WAREHOUSE_CATEGORY]}
                  queryFn={getWarehouseCategory}
                  required
                  dataLabel="warehouse_category_name"
                  dataValue="warehouse_category_code"
                  disabled
                  value={{
                    label: detail_data?.warehouse_category ?? '',
                    value: detail_data?.warehouse_category_code ?? '',
                  }}
                />
                <InputField
                  value={detail_data?.address || ''}
                  label="Address"
                  placeholder="Alamat Gudang"
                  type="text"
                  right
                  textarea
                  className="w-full gap-2"
                  disabled
                />
              </div>
              <div className="flex flex-col gap-[14px] flex-1 h-full justify-between">
                <Combobox
                  label="City"
                  placeholder="Select City"
                  queryKey={[GET_CITY]}
                  queryFn={getCity}
                  required
                  dataLabel="city"
                  dataValue="city_code"
                  disabled
                  value={{
                    label: detail_data?.city,
                    value: detail_data?.city_code,
                  }}
                />
                <InputField
                  value={detail_data?.postal_code || ''}
                  label="Postal Code"
                  placeholder="55762"
                  right
                  type="number"
                  className="w-full gap-2"
                  disabled
                />
                <InputField
                  value={detail_data?.phone || ''}
                  label="Phone"
                  placeholder="Phone"
                  right
                  type="number"
                  className="w-full gap-2"
                  disabled
                />
                <InputField
                  value={detail_data?.email || ''}
                  label="Email"
                  placeholder="warehouse@aditama.idd"
                  right
                  type="email"
                  className="w-full gap-2"
                  disabled
                />
              </div>
              <div className="flex flex-col gap-[14px] flex-1">
                <InputField
                  value={detail_data?.fax || ''}
                  label="Fax"
                  placeholder="0891234567890"
                  right
                  type="number"
                  className="w-full gap-2"
                  disabled
                />
                <InputField
                  value={detail_data?.mobile || ''}
                  label="Mobile"
                  placeholder="0891234567890"
                  right
                  type="number"
                  className="w-full gap-2"
                  disabled
                />
                <InputField
                  value={detail_data?.contact_person || ''}
                  label="Contact Person"
                  placeholder="Nama Penanggungjawab Gudang"
                  right
                  textarea
                  type="text"
                  className="w-full gap-2"
                  disabled
                />
                <InputField
                  value={detail_data?.remark || ''}
                  label="Remark"
                  placeholder="Pilih Kateogri Biaya"
                  right
                  type="text"
                  textarea
                  className="w-full gap-2"
                  disabled
                />
              </div>
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
            onClick={() => {
              openHistoryLogDrawer({
                code: detail_data?.warehouse_code,
                category: 'Warehouse',
              });
            }}
          />
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default DetailWarehouse;
