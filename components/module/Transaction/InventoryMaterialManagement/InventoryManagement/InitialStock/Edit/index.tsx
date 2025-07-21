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
import { GET_INITIAL_STOCK } from "@constants/queryKey";
import { useForm } from "@hooks/useForm";
import { ConfirmationAlert } from "@components/shared/Alert";
import { editInitialStock } from "@services/fetcher/transaction/inventory-material-management/inventory-management";
import { useSetValueForm } from "@hooks/useSetValueForm";
import { useDrawerStore } from "@stores/useDrawerStore";
import { CreateInitialStockSchema } from "@constants/schemas/TransactionSchema/InventoryMaterialManagement";
import { parse, format, isValid } from "date-fns";
import InitialStockHeaderForm from "../Form/HeaderForm";
import InitialStockDetailForm from "../Form/DetailForm";

const EditInitialStock = () => {
    const detail_data = useDrawerStore(
        (state) => state.detail_data
    ) as InitialStockFormBody;

    const {
        handleCloseDrawerEdit,
        handleInputKeyDown,
        handleSaveClick,
        handleSubmit,
        isLoading,
        formRef,
        isOpenEdit,
        canSave,
        errors,
        setError,
        setValue,
        register,
        watch,
        isConfirmModalOpen,
        handleConfirm,
        handleCloseConfirmModal,
        confirmMessage,
    } = useForm({
        label: "Edit Initial Stock",
        queryKey: GET_INITIAL_STOCK,
        mutationFn: editInitialStock,
        validationSchema: CreateInitialStockSchema,
        defaultValues: detail_data,
        type: "edit",
        requireAllFields: true,
    });

    useEffect(() => {
        console.log("Error => ", errors, watch());
    }, [errors]);

    useSetValueForm<InitialStockFormBody>(detail_data, setValue, isOpenEdit);

    // Convert date format for HTML date input (same as Detail page)
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

                console.log(
                    "Edit - document_date raw:",
                    detail_data?.document_date
                );
                console.log(
                    "Edit - document_date type:",
                    typeof detail_data?.document_date
                );
                console.log("Edit - formatted date:", formattedDate);
            } catch (error) {
                console.error("Error parsing date in edit:", error);
            }
        }
    }, [detail_data?.document_date, setValue]);

    return (
        <Drawer onClose={handleCloseDrawerEdit} open={isOpenEdit}>
            <DrawerContent>
                <DrawerHeader
                    onClick={handleCloseDrawerEdit}
                    drawerTitle="Edit Initial Stock"
                >
                    <DrawerEndHeader>
                        <Button
                            variant={!canSave ? "disabled" : "primary"}
                            icon={{
                                size: "large",
                                icon: IconDeviceFloppy,
                                color: "White",
                            }}
                            type="submit"
                            onClick={handleSaveClick}
                            disabled={isLoading}
                        >
                            {isLoading ? "Saving..." : "Save"}
                        </Button>
                    </DrawerEndHeader>
                </DrawerHeader>
                <form ref={formRef} onSubmit={handleSubmit}>
                    <DrawerBody>
                        <InitialStockHeaderForm
                            errors={errors}
                            watch={watch}
                            setValue={setValue}
                            register={register}
                            handleInputKeyDown={handleInputKeyDown}
                            setError={setError}
                            disableAll
                        />
                        <InitialStockDetailForm
                            errors={errors}
                            watch={watch}
                            setValue={setValue}
                            register={register}
                            handleInputKeyDown={handleInputKeyDown}
                            setError={setError}
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

export default EditInitialStock;
