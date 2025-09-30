"use client";

import React, { useEffect } from "react";
import { Button } from "@components/ui/Button";
import {
    Drawer,
    DrawerBody,
    DrawerContent,
    DrawerEndHeader,
    DrawerFooter,
    DrawerHeader,
} from "@components/ui/Drawer";
import { IconHistory, IconPencil } from "@tabler/icons-react";
import { useDrawerStore } from "@stores/useDrawerStore";
import { useSetValueForm } from "@hooks/useSetValueForm";
import { useForm } from "react-hook-form";
import { parse, format, isValid } from "date-fns";
import InitialStockHeaderForm from "../Form/HeaderForm";
import InitialStockDetailForm from "../Form/DetailForm";

const DetailInitialStock = () => {
    const {
        isOpenDetail,
        closeDetailDrawer,
        openEditDrawer,
        openHistoryLogDrawer,
    } = useDrawerStore();
    const detail_data = useDrawerStore(
        (state) => state.detail_data
    ) as InitialStockFormBody;

    const { setValue, watch, register } = useForm<InitialStockFormBody>();

    useSetValueForm<InitialStockFormBody>(detail_data, setValue);

    // Convert date format for HTML date input
    useEffect(() => {
        if (detail_data?.document_date) {
            try {
                let formattedDate = "";
                const dateStr = detail_data.document_date.toString();

                // Check if date is in YYYYMMDD format (e.g., "20250605")
                if (/^\d{8}$/.test(dateStr)) {
                    const year = dateStr.substring(0, 4);
                    const month = dateStr.substring(4, 6);
                    const day = dateStr.substring(6, 8);
                    formattedDate = `${year}-${month}-${day}`;
                }
                // Check if date is in dd/MMM/yyyy format (e.g., "21/Jan/2025")
                else if (/^\d{2}\/\w{3}\/\d{4}$/.test(dateStr)) {
                    const parsedDate = parse(
                        dateStr,
                        "dd/MMM/yyyy",
                        new Date()
                    );
                    if (isValid(parsedDate)) {
                        formattedDate = format(parsedDate, "yyyy-MM-dd");
                    }
                }
                // Check if date is in YYYY-MM-DD format (already correct)
                else if (/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) {
                    formattedDate = dateStr;
                }

                if (formattedDate) {
                    setValue("document_date", formattedDate);
                }
            } catch (error) {
                console.error("Error parsing date:", error);
            }
        }
    }, [detail_data?.document_date, setValue]);

    return (
        <Drawer onClose={closeDetailDrawer} open={isOpenDetail}>
            <DrawerContent className="h-screen flex flex-col">
                <DrawerHeader
                    onClick={closeDetailDrawer}
                    drawerTitle="Detail Initial Stock"
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
                        <InitialStockHeaderForm
                            watch={watch}
                            register={register}
                            disableAll
                        />
                        <InitialStockDetailForm
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
                                code: detail_data?.document_number,
                                category: "InitialStock",
                            });
                        }}
                    />
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    );
};

export default DetailInitialStock;
