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

const DetailVendor = () => {
    const {
        isOpenDetail,
        closeDetailDrawer,
        openEditDrawer,
        openHistoryLogDrawer,
    } = useDrawerStore();
    const detail_data = useDrawerStore(
        (state) => state.detail_data
    ) as VendorFormBody;

    const { register, setValue } = useForm<VendorFormBody>();

    useSetValueForm<VendorFormBody>(detail_data, setValue);

    return (
        <Drawer onClose={closeDetailDrawer} open={isOpenDetail}>
            <DrawerContent>
                <DrawerHeader
                    onClick={closeDetailDrawer}
                    drawerTitle="Detail Vendor"
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
                                    value={detail_data?.vendor_code || ""}
                                    label="Vendor Code"
                                    placeholder="Vendor Code"
                                    right
                                    type="text"
                                    className="w-full gap-2"
                                    disabled
                                    {...register("vendor_code")}
                                />
                                <InputField
                                    value={detail_data?.vendor_name || ""}
                                    label="Vendor Name"
                                    placeholder="Vendor Name"
                                    right
                                    type="text"
                                    className="w-full gap-2"
                                    disabled
                                    {...register("vendor_name")}
                                />
                                <InputField
                                    value={detail_data?.vendor_category || ""}
                                    label="Vendor Category"
                                    placeholder="Vendor Category"
                                    right
                                    type="text"
                                    className="w-full gap-2"
                                    disabled
                                    {...register("vendor_category")}
                                />
                                <InputField
                                    value={detail_data?.address || ""}
                                    label="Address"
                                    placeholder="Address"
                                    right
                                    type="text"
                                    className="w-full gap-2"
                                    disabled
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
                                />
                                <InputField
                                    value={detail_data?.postal_code || ""}
                                    label="Postal Code"
                                    placeholder="Postal Code"
                                    right
                                    type="text"
                                    className="w-full gap-2"
                                    disabled
                                />
                                <InputField
                                    value={detail_data?.website || ""}
                                    label="Website"
                                    placeholder="Website"
                                    right
                                    type="text"
                                    className="w-full gap-2"
                                    disabled
                                />
                                <InputField
                                    value={detail_data?.head_office || ""}
                                    label="Head Office"
                                    placeholder="Head Office"
                                    right
                                    type="text"
                                    className="w-full gap-2"
                                    disabled
                                />
                            </div>
                            <div className="flex flex-col gap-[14px] flex-1 ">
                                <InputField
                                    value={detail_data?.phone || ""}
                                    label="Phone"
                                    placeholder="Phone"
                                    right
                                    type="text"
                                    className="w-full gap-2"
                                    disabled
                                />
                                <InputField
                                    value={detail_data?.mobile || ""}
                                    label="Mobile"
                                    placeholder="Mobile"
                                    right
                                    type="text"
                                    className="w-full gap-2"
                                    disabled
                                />
                                <InputField
                                    value={detail_data?.email || ""}
                                    label="Email"
                                    placeholder="Email"
                                    right
                                    type="text"
                                    className="w-full gap-2"
                                    disabled
                                />
                                <InputField
                                    value={detail_data?.remark || ""}
                                    label="Remark"
                                    placeholder="Remark"
                                    right
                                    type="text"
                                    className="w-full gap-2"
                                    disabled
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
                                code: detail_data?.vendor_code,
                                category: "Vendor",
                            });
                        }}
                    />
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    );
};

export default DetailVendor;
