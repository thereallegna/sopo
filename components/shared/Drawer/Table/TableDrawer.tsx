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

import { FilterDrawerType, useDrawerStore } from '@stores/useDrawerStore';
import { IconPlus } from '@node_modules/@tabler/icons-react/dist/esm/tabler-icons-react';
import useTable from '@hooks/useTable';
import TableContent from '@components/shared/TableContent';
import { AxiosResponse } from 'axios';
import {
  GenerateColumnsOption,
  TableOptionState,
} from '../../../../types/client/table';

export type TableDrawerProps = {
  title: string;
  columns: GenerateColumnsOption;
  queryKey: string;
  queryFn: (option?: TableOptionState) => Promise<AxiosResponse<any, any>>;
  keyFilterDrawer?: FilterDrawerType;
};

const TableDrawer = ({
  title,
  columns,
  queryKey,
  queryFn,
}: TableDrawerProps) => {
  const { isOpenTable, openDrawer, openFilterDrawer, closeTableDrawer } =
    useDrawerStore();

  const handleOpenAdd = () => {
    openDrawer();
  };

  const tableProps = useTable<any[]>({
    queryFn,
    columns,
    queryKey,
    onFilter: openFilterDrawer,
  });

  return (
    <Drawer open={isOpenTable} onClose={closeTableDrawer}>
      <DrawerContent>
        <DrawerHeader drawerTitle={title} onClick={closeTableDrawer}>
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

export default TableDrawer;
