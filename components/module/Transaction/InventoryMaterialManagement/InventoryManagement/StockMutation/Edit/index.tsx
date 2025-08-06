"use client";

import React, { useEffect } from "react";
import { Button } from "@components/ui/Button";
import {
    Drawer,
    DrawerBody,
    DrawerContent,
    DrawerEndHeader,
    DrawerHeader,
} from "@components/ui/Drawer";
import { IconDeviceFloppy } from "@tabler/icons-react";
import { GET_STOCK_MUTATION } from "@constants/queryKey";
import { EditStockMutationSchema } from "@constants/schemas/TransactionSchema/InventoryMaterialManagement";
import { useForm } from "@hooks/useForm";
import { parse, format, isValid } from "date-fns";
import { ConfirmationAlert } from "@components/shared/Alert";
import {
    editStockMutation,
    getStockMutationDetail,
} from "@services/fetcher/transaction/inventory-material-management/inventory-management";

import { useSetValueForm } from "@hooks/useSetValueForm";
import { useDrawerStore } from "@stores/useDrawerStore";
import BasicForm from "../Form/BasicForm";
import MutateFromForm from "../Form/MutateFromForm";
import MutateToForm from "../Form/MutateToForm";

const EditStockMutation = () => {
    const detail_data = useDrawerStore(
        (state) => state.detail_data
    ) as StockMutationFormBody;

    const {
        handleCloseDrawerEdit,
        handleInputKeyDown,
        handleSaveClick,
        handleSubmit,
        isLoading,
        formRef,
        isOpenEdit,
        errors,
        setError,
        setValue,
        register,
        watch,
        isConfirmModalOpen,
        handleConfirm,
        handleCloseConfirmModal,
        confirmMessage,
        control,
        reset,
    } = useForm({
        label: "Stock Mutation",
        queryKey: GET_STOCK_MUTATION,
        mutationFn: editStockMutation,
        validationSchema: EditStockMutationSchema,
        defaultValues: detail_data,
        type: "edit",
        requireAllFields: true,
    });

    useSetValueForm<StockMutationFormBody>(detail_data, setValue, isOpenEdit);

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

                    reset(result);
                } catch (error) {
                    console.error(
                        "Failed to fetch stock mutation detail:",
                        error
                    );
                }
            }
        };

        if (isOpenEdit) {
            fetchDetail();
        }
    }, [isOpenEdit, detail_data?.document_number, reset]);

    useEffect(() => {
        if (detail_data?.date) {
            try {
                let formattedDate = "";
                const dateStr = detail_data.date.toString();

                // Check if data is in YYYYMMDD format
                if (/^\d{8}$/.test(dateStr)) {
                    const year = dateStr.substring(0, 4);
                    const month = dateStr.substring(4, 6);
                    const day = dateStr.substring(6, 8);
                    formattedDate = `${year}-${month}-${day}`;
                }

                // Check if date is in dd/MM/yyyy format
                else if (/^\d{2}\/\w{3}\/\d{4}$/.test(dateStr)) {
                    const parsedDate = parse(dateStr, "dd/MM/yyyy", new Date());
                    if (isValid(parsedDate)) {
                        formattedDate = format(parsedDate, "yyyy-MM-dd");
                    }
                }
                // Check if date is in YYYY-MM-DD format
                else if (/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) {
                    formattedDate = dateStr;
                }

                if (formattedDate) {
                    setValue("date", formattedDate);
                }
            } catch (error) {
                console.error("Error parsing date:", error);
            }
        }
    }, [detail_data?.date, setValue]);

    return (
        <Drawer onClose={handleCloseDrawerEdit} open={isOpenEdit}>
            <DrawerContent>
                <DrawerHeader
                    onClick={handleCloseDrawerEdit}
                    drawerTitle="Edit Stock Mutation"
                >
                    <DrawerEndHeader>
                        <Button
                            variant="primary"
                            icon={{
                                size: "large",
                                icon: IconDeviceFloppy,
                                color: "White",
                            }}
                            type="submit"
                            onClick={handleSaveClick}
                            disabled={isLoading}
                        >
                            {isLoading ? "saving..." : "save"}
                        </Button>
                    </DrawerEndHeader>
                </DrawerHeader>
                <form ref={formRef} onSubmit={handleSubmit}>
                    <DrawerBody>
                        <BasicForm
                            errors={errors}
                            watch={watch}
                            setValue={setValue}
                            register={register}
                            handleInputKeyDown={handleInputKeyDown}
                            setError={setError}
                            type="edit"
                        />
                        <MutateFromForm
                            errors={errors}
                            watch={watch}
                            setValue={setValue}
                            register={register}
                            handleInputKeyDown={handleInputKeyDown}
                            setError={setError}
                            control={control}
                            formType="edit"
                        />
                        <MutateToForm
                            errors={errors}
                            watch={watch}
                            setValue={setValue}
                            register={register}
                            handleInputKeyDown={handleInputKeyDown}
                            setError={setError}
                            control={control}
                            formType="edit"
                        />
                    </DrawerBody>
                </form>
                <ConfirmationAlert
                    open={isConfirmModalOpen}
                    description={confirmMessage}
                    action={handleConfirm}
                    onClose={handleCloseConfirmModal}
                />
            </DrawerContent>
        </Drawer>
    );
};

export default EditStockMutation;
