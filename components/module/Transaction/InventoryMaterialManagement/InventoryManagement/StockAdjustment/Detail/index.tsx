"use client";

import React from "react";
import {
    Drawer,
    DrawerBody,
    DrawerContent,
    DrawerFooter,
    DrawerHeader,
} from "@components/ui/Drawer";
import { useDrawerStore } from "@stores/useDrawerStore";
import { useSetValueForm } from "@hooks/useSetValueForm";
import { useForm } from "react-hook-form";
import { IconHistory } from "@tabler/icons-react";
import { Button } from "@components/ui/Button";
import InitialStockHeaderForm from "../Form/HeaderForm";
import InitialStockBodyForm from "../Form/DetailForm";

const DetailInitialStock = () => {
    const { isOpenDetail, closeDetailDrawer, openHistoryLogDrawer } =
        useDrawerStore();
    const detail_data = useDrawerStore(
        (state) => state.detail_data
    ) as StockAdjustmentFormBody;

    const { setValue, watch, register } = useForm<StockAdjustmentFormBody>();

    useSetValueForm<StockAdjustmentFormBody>(detail_data, setValue);

    console.log("detail_data", detail_data);

    return (
        <Drawer onClose={closeDetailDrawer} open={isOpenDetail}>
            <DrawerContent>
                <DrawerHeader
                    onClick={closeDetailDrawer}
                    drawerTitle="Detail Stock Adjustment"
                />
                <form>
                    <DrawerBody>
                        <InitialStockHeaderForm
                            watch={watch}
                            register={register}
                            disableAll
                        />
                        <InitialStockBodyForm
                            watch={watch}
                            register={register}
                            formType="detail"
                            disableAll
                        />
                    </DrawerBody>
                </form>
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
                                code: detail_data?.document_number || "",
                                category: "StockAdjustment",
                            });
                        }}
                    />
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    );
};

export default DetailInitialStock;
