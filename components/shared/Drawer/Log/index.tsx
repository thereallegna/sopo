'use client';

import React from 'react';
import { Drawer, DrawerContent, DrawerBody } from '@components/ui/Drawer';
import { useDrawerStore } from '@stores/useDrawerStore';
import FilterDrawerHeader from '@components/ui/Drawer/FilterDrawerHeader';
import Timeline from '@components/shared/Timeline';

const HistoryLog = () => {
  const { isOpenHistoryLog, closeHistoryLogDrawer } = useDrawerStore();

  return (
    <Drawer
      onClose={closeHistoryLogDrawer}
      open={isOpenHistoryLog}
      direction="right"
      modal
      dismissible
    >
      <DrawerContent fixed className="flex h-screen p-3 w-[240px]">
        <div className="flex flex-col gap-[10px]">
          <FilterDrawerHeader
            title="History Log"
            onClick={closeHistoryLogDrawer}
          />
          <DrawerBody className="p-0">
            <Timeline />
          </DrawerBody>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default HistoryLog;
