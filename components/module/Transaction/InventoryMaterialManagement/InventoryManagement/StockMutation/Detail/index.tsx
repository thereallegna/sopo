"use client";

import React, { useEffect } from "react";
import { Button } from "@components/ui/Button";
import {
    Drawer,
    DrawerBody,
    DrawerContent,
    DrawerFooter,
    DrawerEndHeader,
    DrawerHeader,
} from "@components/ui/Drawer";
import { IconPencil, IconHistory } from "@tabler/icons-react";
import { useDrawerStore } from "@stores/useDrawerStore";
import { useSetValueForm } from "@hooks/useSetValueForm";
import { useForm } from "react-hook-form";
import { getStockMutationDetail } from "@services/fetcher/transaction/inventory-material-management/inventory-management";
import BasicForm from "../Form/BasicForm";
import MutateFromForm from "../Form/MutateFromForm";
import MutateToForm from "../Form/MutateToForm";

const DetailStockMutation = () => {
    const {
        isOpenDetail,
        closeDetailDrawer,
        openEditDrawer,
        openHistoryLogDrawer,
    } = useDrawerStore();
    const detail_data = useDrawerStore(
        (state) => state.detail_data
    ) as StockMutationFormBody;

    const { setValue, watch, register } = useForm<StockMutationFormBody>();

    useSetValueForm<StockMutationFormBody>(detail_data, setValue);

    useEffect(() => {
        if (detail_data?.warehouse_code) {
            setValue("warehouse_code", detail_data.warehouse_code);
        }
    }, [detail_data?.warehouse_code, setValue]);

    useEffect(() => {
        const fetchDetail = async () => {
            if (detail_data?.document_number) {
                try {
                    const result = await getStockMutationDetail(
                        detail_data.document_number
                    );

                    const resultTyped = result as StockMutationFormBody;
                    Object.entries(resultTyped).forEach(([key, value]) => {
                        setValue(
                            key as keyof StockMutationFormBody,
                            value as any
                        );
                    });
                } catch (error) {
                    console.error(
                        "Failed to fetch detail stock mutation:",
                        error
                    );
                }
            }
        };

        if (isOpenDetail) {
            fetchDetail();
        }
    }, [isOpenDetail, detail_data?.document_number, setValue]);

    return (
        <Drawer onClose={closeDetailDrawer} open={isOpenDetail}>
            <DrawerContent>
                <DrawerHeader
                    onClick={closeDetailDrawer}
                    drawerTitle="Detail Stock Mutation"
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
                <form>
                    <DrawerBody>
                        <BasicForm
                            watch={watch}
                            register={register}
                            disableAll
                        />
                        <MutateFromForm
                            watch={watch}
                            register={register}
                            setValue={setValue}
                            formType="detail"
                            disableAll
                            errors={{}}
                        />
                        <MutateToForm
                            watch={watch}
                            register={register}
                            setValue={setValue}
                            formType="detail"
                            disableAll
                            errors={{}}
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
                                category: "StockMutation",
                            });
                        }}
                    />
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    );
};

export default DetailStockMutation;
