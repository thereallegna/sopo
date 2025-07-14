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

const DetailTax = () => {
    const {
        isOpenDetail,
        closeDetailDrawer,
        openEditDrawer,
        openHistoryLogDrawer,
    } = useDrawerStore();

    const detail_data = useDrawerStore(
        (state) => state.detail_data
    ) as TaxFormBody;

    const { register, setValue } = useForm<TaxFormBody>();

    useSetValueForm<TaxFormBody>(detail_data, setValue);

    return (
        <Drawer onClose={closeDetailDrawer} open={isOpenDetail}>
            <DrawerContent>
                <DrawerHeader
                    onClick={closeDetailDrawer}
                    drawerTitle="Detail Tax"
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
                        <CardContent className="flex-wrap flex flex-row gap-6 items-center">
                            <div className="flex flex-col gap-[14px] flex-1">
                                <InputField
                                    value={detail_data?.tax_code || ""}
                                    label="Tax Code"
                                    placeholder="Tax Code"
                                    right
                                    type="text"
                                    className="w-full gap-2"
                                    disabled
                                    {...register("tax_code")}
                                />
                                <InputField
                                    value={detail_data?.tax_name || ""}
                                    label="Tax Name"
                                    placeholder="Tax Name"
                                    right
                                    type="text"
                                    className="w-full gap-2"
                                    disabled
                                    {...register("tax_name")}
                                />
                            </div>
                            <div className="flex flex-col gap-[14px] flex-1 h-full justify-between">
                                <InputField
                                    value={detail_data?.tax_rate || ""}
                                    label="Tax Rate"
                                    placeholder="Tax Rate"
                                    right
                                    type="number"
                                    className="w-full gap-2"
                                    disabled
                                    {...register("tax_rate")}
                                />
                                <InputField
                                    value={detail_data?.tax_group || ""}
                                    label="Tax Group"
                                    placeholder="Tax Group"
                                    right
                                    type="text"
                                    className="w-full gap-2"
                                    disabled
                                    {...register("tax_group")}
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
                                code: detail_data?.tax_code,
                                category: "Tax",
                            })
                        }
                    />
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    );
};

export default DetailTax;
