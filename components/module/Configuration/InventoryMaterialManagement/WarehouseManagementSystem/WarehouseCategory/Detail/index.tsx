"use client";

import React from "react";
import { Button } from "@components/ui/Button";
import {
    Drawer,
    DrawerBody,
    DrawerContent,
    DrawerEndHeader,
    DrawerFooter,
    DrawerHeader,
} from "@components/ui/Drawer";
import { Card, CardContent } from "@components/ui/Card";
import InputField from "@components/shared/InputField";
import { useDrawerStore } from "@stores/useDrawerStore";
import { IconHistory, IconPencil } from "@tabler/icons-react";
import { useForm } from "react-hook-form";
import { useSetValueForm } from "@hooks/useSetValueForm";

const DetailWarehouseCategory = () => {
    const {
        isOpenDetail,
        closeDetailDrawer,
        openEditDrawer,
        openHistoryLogDrawer,
    } = useDrawerStore();
    const detail_data = useDrawerStore(
        (state) => state.detail_data
    ) as WarehouseCategoryFormBody;

    const { register, setValue } = useForm<WarehouseCategoryFormBody>();

    useSetValueForm<WarehouseCategoryFormBody>(detail_data, setValue);

    return (
        <Drawer onClose={closeDetailDrawer} open={isOpenDetail}>
            <DrawerContent>
                <DrawerHeader
                    onClick={closeDetailDrawer}
                    drawerTitle="Detail Warehouse Category"
                >
                    <DrawerEndHeader>
                        <Button
                            variant="primary"
                            icon={{
                                size: "large",
                                icon: IconPencil,
                                color: "White",
                            }}
                            type="submit"
                            onClick={openEditDrawer}
                        >
                            Edit
                        </Button>
                    </DrawerEndHeader>
                </DrawerHeader>
                <DrawerBody>
                    <Card size="drawer">
                        <CardContent className="flex-wrap flex flex-row gap-6 items-center">
                            <InputField
                                value={
                                    detail_data?.warehouse_category_code || ""
                                }
                                label="Warehouse Category Code"
                                placeholder="Warehouse Category Code"
                                right
                                type="text"
                                disabled
                                {...register("warehouse_category_code")}
                            />
                            <InputField
                                value={
                                    detail_data?.warehouse_category_name || ""
                                }
                                label="Warehouse Category Name"
                                placeholder="Warehouse Category Name"
                                right
                                type="text"
                                disabled
                                {...register("warehouse_category_name")}
                            />
                        </CardContent>
                    </Card>
                </DrawerBody>
                <DrawerFooter>
                    <Button
                        variant="backDrawer"
                        className="w-7"
                        size="icon"
                        icon={{
                            size: "large",
                            icon: IconHistory,
                            color: "dark",
                        }}
                        type="submit"
                        onClick={() =>
                            openHistoryLogDrawer({
                                code: detail_data?.warehouse_category_code,
                                category: "WarehouseCategory",
                            })
                        }
                    />
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    );
};

export default DetailWarehouseCategory;
