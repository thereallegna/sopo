"use client";

import React from "react";
import { Drawer, DrawerContent, DrawerBody } from "@components/ui/Drawer";

import { useDrawerStore } from "@stores/useDrawerStore";
import FilterDrawerHeader from "@components/ui/Drawer/FilterDrawerHeader";
import InputField from "@components/shared/InputField";

const SiteFilter = () => {
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
                        title="Filter Site"
                        onClick={closeFilterDrawer}
                    />
                    <DrawerBody className="p-0">
                        <InputField label="Site Code" />
                    </DrawerBody>
                </div>
            </DrawerContent>
        </Drawer>
    );
};

export default SiteFilter;
