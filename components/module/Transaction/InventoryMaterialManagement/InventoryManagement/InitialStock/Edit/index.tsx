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
