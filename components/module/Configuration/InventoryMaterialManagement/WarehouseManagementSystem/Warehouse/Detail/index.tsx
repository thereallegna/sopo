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
import { IconHistory, IconPencil } from "@tabler/icons-react";
import { useForm } from "react-hook-form";
import { useDrawerStore } from "@stores/useDrawerStore";
import { useSetValueForm } from "@hooks/useSetValueForm";

const DetailWarehouse = () => {
    const {
        isOpenDetail,
        closeDetailDrawer,
        openEditDrawer,
        openHistoryLogDrawer,
    } = useDrawerStore();

    const detail_data = useDrawerStore(
        (state) => state.detail_data
    ) as WarehouseFormBody;

    const { register, setValue } = useForm<WarehouseFormBody>();

    useSetValueForm<WarehouseFormBody>(detail_data, setValue);

    return (
        <Drawer onClose={closeDetailDrawer} open={isOpenDetail}>
            <DrawerContent>
                <DrawerHeader
                    onClick={closeDetailDrawer}
                    drawerTitle="Detail Warehouse"
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
                    <Card
                        size="drawer"
                        className="border border-Neutral-200 shadow-none"
                    >
                        <CardContent className="flex-wrap flex flex-row gap-6">
                            <div className="flex flex-col gap-[14px] flex-1">
                                <InputField
                                    value={detail_data?.warehouse_code || ""}
                                    label="Warehouse Code"
                                    placeholder="Warehouse Code"
                                    right
                                    type="text"
                                    className="w-full gap-2"
                                    disabled
                                    {...register("warehouse_code")}
                                />
                                <InputField
                                    value={detail_data?.warehouse_name || ""}
                                    label="Warehouse Name"
                                    placeholder="Warehouse Name"
                                    right
                                    type="text"
                                    className="w-full gap-2"
                                    disabled
                                    {...register("warehouse_name")}
                                />
                                <InputField
                                    value={
                                        detail_data?.warehouse_category || ""
                                    }
                                    label="Warehouse Category"
                                    placeholder="Warehouse Category"
                                    right
                                    type="text"
                                    className="w-full gap-2"
                                    disabled
                                    {...register("warehouse_category")}
                                />
                                <InputField
                                    value={detail_data?.address || ""}
                                    label="Address"
                                    placeholder="Address"
                                    type="text"
                                    right
                                    className="w-full gap-2"
                                    disabled
                                    {...register("address")}
                                />
                            </div>
                            <div className="flex flex-col gap-[14px] flex-1 h-full justify-between">
                                <InputField
                                    value={detail_data?.city || ""}
                                    label="City"
                                    placeholder="City"
                                    right
                                    type="text"
                                    className="w-full gap-2"
                                    disabled
                                    {...register("city")}
                                />
                                <InputField
                                    value={detail_data?.postal_cd || ""}
                                    label="Postal Code"
                                    placeholder="Postal Code"
                                    right
                                    type="number"
                                    className="w-full gap-2"
                                    disabled
                                    {...register("postal_cd")}
                                />
                                <InputField
                                    value={detail_data?.phone || ""}
                                    label="Phone"
                                    placeholder="Phone"
                                    right
                                    type="number"
                                    className="w-full gap-2"
                                    disabled
                                    {...register("phone")}
                                />
                                <InputField
                                    value={detail_data?.email || ""}
                                    label="Email"
                                    placeholder="Email"
                                    right
                                    type="email"
                                    className="w-full gap-2"
                                    disabled
                                    {...register("email")}
                                />
                            </div>
                            <div className="flex flex-col gap-[14px] flex-1">
                                <InputField
                                    value={detail_data?.fax || ""}
                                    label="Fax"
                                    placeholder="Fax"
                                    right
                                    type="number"
                                    className="w-full gap-2"
                                    disabled
                                    {...register("fax")}
                                />
                                <InputField
                                    value={detail_data?.mobile || ""}
                                    label="Mobile"
                                    placeholder="Mobile"
                                    right
                                    type="number"
                                    className="w-full gap-2"
                                    disabled
                                    {...register("mobile")}
                                />
                                <InputField
                                    value={detail_data?.contact_person || ""}
                                    label="Contact Person"
                                    placeholder="Contact Person"
                                    right
                                    type="text"
                                    className="w-full gap-2"
                                    disabled
                                    {...register("contact_person")}
                                />
                                <InputField
                                    value={detail_data?.remark || ""}
                                    label="Remark"
                                    placeholder="Remark"
                                    right
                                    type="text"
                                    className="w-full gap-2"
                                    disabled
                                    {...register("remark")}
                                />
                            </div>
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
                        onClick={() => {
                            openHistoryLogDrawer({
                                code: detail_data?.warehouse_code,
                                category: "Warehouse",
                            });
                        }}
                    />
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    );
};

export default DetailWarehouse;
