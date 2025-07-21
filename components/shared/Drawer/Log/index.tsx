"use client";

import React from "react";
import { Drawer, DrawerContent, DrawerBody } from "@components/ui/Drawer";
import { useDrawerStore } from "@stores/useDrawerStore";
import FilterDrawerHeader from "@components/ui/Drawer/FilterDrawerHeader";
import Timeline from "@components/shared/Timeline";

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
            <DrawerContent
                fixed
                className="flex flex-col p-3 w-[240px] z-50 pointer-events-auto"
            >
                <div className="flex-shrink-0 z-50">
                    <FilterDrawerHeader
                        title="History Log"
                        onClick={closeHistoryLogDrawer}
                    />
                    <DrawerBody className="p-0 custom-scrollbar h-[90vh] overflow-auto">
                        <Timeline />
                    </DrawerBody>
                </div>
            </DrawerContent>
        </Drawer>
    );
};

export default HistoryLog;
