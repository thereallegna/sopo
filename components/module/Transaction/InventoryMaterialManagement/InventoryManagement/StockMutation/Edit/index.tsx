"use client";

import React from "react";
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
import { EditMasterItemMMSchema } from "@constants/schemas/ConfigurationSchema/InventoryMaterialManagement";
import { useForm } from "@hooks/useForm";
import { ConfirmationAlert } from "@components/shared/Alert";
import { editStockMutation } from "@services/fetcher/transaction/inventory-material-management/inventory-management";
import { useSetValueForm } from "@hooks/useSetValueForm";
import { useDrawerStore } from "@stores/useDrawerStore";
import BasicForm from "../Form/BasicForm";
import MutateFromForm from "../Form/MutateFromForm";
import MutateToForm from "../Form/MutateToForm";

const EditMasterItemMM = () => {
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
        control,
    } = useForm({
        label: "Stock Mutation",
        queryKey: GET_STOCK_MUTATION,
        mutationFn: editStockMutation,
        validationSchema: EditMasterItemMMSchema,
        defaultValues: detail_data,
        type: "edit",
        requireAllFields: true,
    });

    useSetValueForm<StockMutationFormBody>(detail_data, setValue, isOpenEdit);

    return (
        <Drawer onClose={handleCloseDrawerEdit} open={isOpenEdit}>
            <DrawerContent>
                <DrawerHeader
                    onClick={handleCloseDrawerEdit}
                    drawerTitle="Edit Stock Mutation"
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
                        />
                        <MutateFromForm
                            errors={errors}
                            watch={watch}
                            setValue={setValue}
                            register={register}
                            handleInputKeyDown={handleInputKeyDown}
                            setError={setError}
                            control={control}
                        />
                        <MutateToForm
                            errors={errors}
                            watch={watch}
                            setValue={setValue}
                            register={register}
                            handleInputKeyDown={handleInputKeyDown}
                            setError={setError}
                            control={control}
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

export default EditMasterItemMM;
