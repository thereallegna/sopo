"use client";

import React from "react";
import { Drawer, DrawerContent, DrawerBody } from "@components/ui/Drawer";

import { useDrawerStore } from "@stores/useDrawerStore";
import FilterDrawerHeader from "@components/ui/Drawer/FilterDrawerHeader";
import InputField from "@components/shared/InputField";

const CityFilter = () => {
    const { isOpenFilter, closeFilterDrawer } = useDrawerStore();

    return (
        <Drawer
            onClose={closeFilterDrawer}
            open={isOpenFilter}
            direction="right"
            modal
            dismissible
        >
            <DrawerContent>
                <div>
                    <FilterDrawerHeader
                        title="Filter City"
                        onClick={closeFilterDrawer}
                    />
                    <DrawerBody className="p-0">
                        <InputField label="City Code" />
                    </DrawerBody>
                </div>
            </DrawerContent>
        </Drawer>
    );
};

export default CityFilter;
