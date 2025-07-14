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

const DetailCity = () => {
    const {
        isOpenDetail,
        closeDetailDrawer,
        openEditDrawer,
        openHistoryLogDrawer,
    } = useDrawerStore();

    const detail_data = useDrawerStore(
        (state) => state.detail_data
    ) as CityFormBody;

    const { register, setValue } = useForm<CityFormBody>();

    useSetValueForm<CityFormBody>(detail_data, setValue);

    return (
        <Drawer onClose={closeDetailDrawer} open={isOpenDetail}>
            <DrawerContent>
                <DrawerHeader
                    onClick={closeDetailDrawer}
                    drawerTitle="Detail City"
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
                            <div className="flex flex-col gap-[14px] flex-1">
                                <InputField
                                    value={detail_data?.city_code || ""}
                                    label="City Code"
                                    placeholder="City Code"
                                    right
                                    type="text"
                                    className="w-full gap-2"
                                    disabled
                                    {...register("city_code")}
                                />
                                <InputField
                                    value={detail_data?.city_name || ""}
                                    label="City Name"
                                    placeholder="City Name"
                                    right
                                    type="text"
                                    className="w-full gap-2"
                                    disabled
                                    {...register("city_name")}
                                />
                            </div>
                            <div className="flex flex-col gap-[14px] flex-1 h-full justify-between">
                                <InputField
                                    value={detail_data?.province || ""}
                                    label="Province"
                                    placeholder="Province"
                                    right
                                    type="text"
                                    className="w-full gap-2"
                                    disabled
                                    {...register("province")}
                                />
                                <InputField
                                    value={detail_data?.ring_area || ""}
                                    label="Ring Area"
                                    placeholder="Ring Area"
                                    right
                                    type="text"
                                    className="w-full gap-2"
                                    disabled
                                    {...register("ring_area")}
                                />
                            </div>
                            <div className="flex flex-col gap-[14px] flex-1">
                                <InputField
                                    value={detail_data?.location || ""}
                                    label="Location"
                                    placeholder="Location"
                                    right
                                    type="text"
                                    className="w-full gap-2"
                                    disabled
                                    {...register("location")}
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
                                code: detail_data?.city_code,
                                category: "City",
                            });
                        }}
                    />
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    );
};

export default DetailCity;
