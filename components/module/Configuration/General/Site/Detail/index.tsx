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
import {
    IconHistory,
    IconPencil,
} from "@node_modules/@tabler/icons-react/dist/esm/tabler-icons-react";
// import { Checkbox } from "@components/ui/Checkbox";
import { useForm } from "react-hook-form";
import { useSetValueForm } from "@hooks/useSetValueForm";

const DetailSite = () => {
    const {
        isOpenDetail,
        closeDetailDrawer,
        openEditDrawer,
        openHistoryLogDrawer,
    } = useDrawerStore();
    const detail_data = useDrawerStore(
        (state) => state.detail_data
    ) as SiteFormBody;

    const { register, setValue } = useForm<SiteFormBody>();

    useSetValueForm<SiteFormBody>(detail_data, setValue);

    return (
        <Drawer onClose={closeDetailDrawer} open={isOpenDetail}>
            <DrawerContent>
                <DrawerHeader
                    onClick={closeDetailDrawer}
                    drawerTitle="Detail Site"
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
                                    value={detail_data?.site_code || ""}
                                    label="Site Code"
                                    placeholder="Site Code"
                                    right
                                    type="text"
                                    className="w-full gap-2"
                                    disabled
                                    {...register("site_code")}
                                />
                                <InputField
                                    value={detail_data?.site_name || ""}
                                    label="Site Name"
                                    placeholder="Site Name"
                                    right
                                    type="text"
                                    className="w-full gap-2"
                                    {...register("site_name")}
                                />
                                {/* <Checkbox 
                                    label="Active"
                                    checked={watch("active")}
                                    onCheckedChange={(val: boolean) => setValue && setValue("active", val)}
                                    disabled={false}
                                /> */}
                            </div>
                            <div className="flex flex-col gap-[14px] flex-1 h-full justify-between">
                                <InputField
                                    value={detail_data?.address || ""}
                                    label="Address"
                                    placeholder="Address"
                                    right
                                    type="text"
                                    className="w-full gap-2"
                                    {...register("address")}
                                />
                                <InputField
                                    value={detail_data?.remark || ""}
                                    label="Remark"
                                    placeholder="Remark"
                                    right
                                    type="text"
                                    className="w-full gap-2"
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
                        onClick={() =>
                            openHistoryLogDrawer({
                                code: detail_data?.site_code,
                                category: "Site",
                            })
                        }
                    />
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    );
};

export default DetailSite;
