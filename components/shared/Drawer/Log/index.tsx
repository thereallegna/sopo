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
            <Timeline
              data={[
                {
                  log: 'Adi made changes to this data',
                  date: '2024-10-10T09:14:00',
                },
                {
                  log: 'Oki created this data',
                  date: '2024-09-20T08:33:00',
                },
                {
                  log: 'Oki created this data',
                  date: '2024-09-20T08:33:00',
                },
                {
                  log: 'Adi made changes to this data',
                  date: '2024-10-10T09:14:00',
                },
                {
                  log: 'Adi made changes to this data',
                  date: '2024-10-10T09:14:00',
                },
              ]}
            />
          </DrawerBody>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default HistoryLog;
