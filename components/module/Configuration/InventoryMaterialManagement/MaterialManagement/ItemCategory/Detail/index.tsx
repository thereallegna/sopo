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
import { Checkbox } from "@components/ui/Checkbox";

const DetailItemCategory = () => {
    const {
        isOpenDetail,
        closeDetailDrawer,
        openEditDrawer,
        openHistoryLogDrawer,
    } = useDrawerStore();
    const detail_data = useDrawerStore(
        (state) => state.detail_data
    ) as ItemCategoryFormBody;

    const { register, setValue } = useForm<ItemCategoryFormBody>();

    useSetValueForm<ItemCategoryFormBody>(detail_data, setValue);

    return (
        <Drawer onClose={closeDetailDrawer} open={isOpenDetail}>
            <DrawerContent>
                <DrawerHeader
                    onClick={closeDetailDrawer}
                    drawerTitle="Detail Item's Category"
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
                        <CardContent className="flex-wrap flex flex-row gap-6">
                            <div className="flex flex-row gap-[14px] flex-1 h-full">
                                <InputField
                                    value={
                                        detail_data?.item_category_code || ""
                                    }
                                    className="flex-grow"
                                    label="Item Category Code"
                                    placeholder="Item Category Code"
                                    right
                                    type="text"
                                    disabled
                                    {...register("item_category_code")}
                                />
                                <InputField
                                    value={
                                        detail_data?.item_category_name || ""
                                    }
                                    className="flex-grow"
                                    label="Item Category Name"
                                    placeholder="Item Category Name"
                                    right
                                    type="text"
                                    disabled
                                    {...register("item_category_name")}
                                />
                                <div className="flex items-start gap-2 ml-[14px] mt-[10px]">
                                    <label
                                        htmlFor="active"
                                        className="cursor-pointer text-base font-semibold"
                                    >
                                        Active
                                    </label>
                                    <Checkbox
                                        checked={detail_data?.active}
                                        disabled
                                        {...register("active")}
                                    />
                                </div>
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
                                code: detail_data?.item_category_code,
                                category: "ItemCategory",
                            });
                        }}
                    />
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    );
};

export default DetailItemCategory;
