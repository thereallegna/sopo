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

import { useDrawerStore } from '@stores/useDrawerStore';
import { IconPlus } from '@node_modules/@tabler/icons-react/dist/esm/tabler-icons-react';
import useTable, { countryColumns } from '@hooks/useTable';
import { GET_COUNTRY } from '@constants/queryKey';
import { getCountry } from '@services/fetcher/configuration/general';
import TableContent from '@components/shared/TableContent';

const TableCountryFilter = () => {
  const { isOpenTable, openDrawer, openFilterDrawer, closeTableDrawer } =
    useDrawerStore();
  const handleOpenAdd = () => {
    openDrawer('CREATE_COUNTRY');
  };

  const tableProps = useTable<ICountry[]>({
    queryKey: GET_COUNTRY,
    queryFn: getCountry,
    columns: countryColumns,
    onFilter: openFilterDrawer,
  });

  return (
    <Drawer open={isOpenTable} onClose={closeTableDrawer}>
      <DrawerContent>
        <DrawerHeader drawerTitle="Find Country" onClick={closeTableDrawer}>
          <DrawerEndHeader>
            {/* button save */}
            <Button
              icon={{
                size: 'large',
                icon: IconPlus,
                color: 'drawer',
              }}
              onClick={handleOpenAdd}
            >
              Add
            </Button>
          </DrawerEndHeader>
        </DrawerHeader>
        <DrawerBody className="h-full">
          <TableContent {...tableProps} />
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};

export default TableCountryFilter;
