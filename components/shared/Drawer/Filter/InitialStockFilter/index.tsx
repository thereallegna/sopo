'use client';

import React from 'react';
import { Drawer, DrawerContent, DrawerBody } from '@components/ui/Drawer';

import { useDrawerStore } from '@stores/useDrawerStore';
import FilterDrawerHeader from '@components/ui/Drawer/FilterDrawerHeader';
import { DatePickerRange } from '@components/shared/DatePickerRange';
import Combobox from '@components/shared/Combobox';
import { GET_WAREHOUSE } from '@constants/queryKey';
import { getWarehouse } from '@services/fetcher/configuration/inventory-management';

const FilterInitialStock = () => {
  const { isOpenFilter, closeFilterDrawer } = useDrawerStore();

  return (
    <Drawer
      onClose={closeFilterDrawer}
      open={isOpenFilter}
      direction="right"
      modal
      dismissible
    >
      <DrawerContent fixed className="flex h-screen p-3 w-[240px]">
        <div className="flex flex-col gap-[10px]">
          <FilterDrawerHeader
            title="Filter Initial Stock"
            onClick={closeFilterDrawer}
          />
          <DrawerBody className="p-0">
            <Combobox
              label="Warehouse"
              placeholder="Select Warehouse"
              required
              queryKey={[GET_WAREHOUSE]}
              queryFn={getWarehouse}
              dataLabel="warehouse_name"
              dataValue="warehouse_code" // No predefined value, just for filtering
            />
            <DatePickerRange placeholder="Select Date" />
          </DrawerBody>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default FilterInitialStock;
