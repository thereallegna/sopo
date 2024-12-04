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
import { Card, CardContent } from '@components/ui/Card';
import InputField from '@components/shared/InputField';
import { useDrawerStore } from '@stores/useDrawerStore';
import { IconPencil } from '@tabler/icons-react';
import { useForm } from 'react-hook-form';
import Combobox from '@components/shared/Combobox';
import { GET_WAREHOUSE } from '@constants/queryKey';
import { getWarehouse } from '@services/fetcher/configuration/material-management';
import { useSetValueForm } from '@hooks/useFormChanges';

const DetailInitialStock = () => {
  const { isOpenDetail, closeDetailDrawer, openEditDrawer } = useDrawerStore();
  const detail_data = useDrawerStore(
    (state) => state.detail_data
  ) as InitialStockFormBody;

  const { setValue } = useForm<InitialStockFormBody>();

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
            <CardContent className="flex-wrap flex flex-row gap-6">
              <div className="flex flex-col gap-[14px] flex-1">
                <InputField
                  value={detail_data?.document_number || ''}
                  label="Document Number"
                  right
                  type="text"
                  required
                  className="w-full gap-2"
                  disabled
                />
                <InputField
                  value={detail_data?.document_date || ''}
                  label="Document Date"
                  right
                  type="text"
                  required
                  className="w-full gap-2"
                  disabled
                />
              </div>
              <div>
                <Combobox
                  label="Warehouse"
                  placeholder="Warehouse"
                  queryKey={[GET_WAREHOUSE]}
                  queryFn={() => getWarehouse()}
                  dataLabel="warehouse_name"
                  dataValue="warehouse_code"
                  value={{
                    label: detail_data?.warehouse,
                    value: detail_data?.warehouse_code,
                  }}
                  disabled
                />
                {/* <Combobox 
                  label="Currecy"
                  placeholder="Currency"
                  queryKey={[GET_CURRENCY]}
                  queryFn={() => getCurrency()}
                  dataLabel="qurency_name"
                  dataValue="qurency_code"
                  value={{
                      label: detail_data?.currency,
                      value: detail_data?.currency_code,
                  }}
                  disabled
                /> */}
              </div>
              <div>
                <InputField
                  value={detail_data?.rate || ''}
                  label="Rate"
                  right
                  type="text"
                  className="w-full gap-2"
                  disabled
                />
                <InputField
                  value={detail_data?.remark || ''}
                  label="Remark"
                  right
                  type="text"
                  className="w-full gap-2"
                  textarea
                  disabled
                />
              </div>
            </CardContent>
          </Card>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};

export default DetailInitialStock;
