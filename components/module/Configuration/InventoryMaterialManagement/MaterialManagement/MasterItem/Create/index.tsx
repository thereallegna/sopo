"use client";

import React, { useState } from "react";
import { Button } from "@components/ui/Button";
import {
    Drawer,
    DrawerBody,
    DrawerContent,
    DrawerEndHeader,
    DrawerHeader,
} from "@components/ui/Drawer";
import { IconDeviceFloppy } from "@tabler/icons-react";
import { MasterItemDefaultValues } from "@constants/defaultValues";
import { GET_MASTER_ITEM_MATERIAL_MANAGEMENT } from "@constants/queryKey";
import { CreateMasterItemMMSchema } from "@constants/schemas/ConfigurationSchema/InventoryMaterialManagement";
import { useForm } from "@hooks/useForm";
import {
    createItem,
    getItem,
} from "@services/fetcher/configuration/inventory-management";
import { ConfirmationAlert } from "@components/shared/Alert";
import SelectableModal from "@components/ui/Modal";
import BasicForm from "../Form/BasicForm";
import DetailForm from "../Form/DetailForm";

const CreateMasterItem = () => {
    const [showModalSource, setShowModalSource] = useState<boolean>(false);
    const {
        handleCloseDrawer,
        handleInputKeyDown,
        handleSaveClick,
        handleSubmit,
        isLoading,
        formRef,
        isOpen,
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
        label: "Master item",
        queryKey: GET_MASTER_ITEM_MATERIAL_MANAGEMENT,
        mutationFn: createItem,
        validationSchema: CreateMasterItemMMSchema,
        defaultValues: MasterItemDefaultValues,
        type: "add",
        requireAllFields: true,
        ignoredFields: [
            "source",
            "local_code",
            "tax_liable",
            "foreign_name",
            "hs_code",
            "inventory_item",
            "old_code",
            "sales_item",
            "service_item",
            "purchase_item",
            "specification",
            "remark",
        ],
    });

    return (
        <Drawer onClose={handleCloseDrawer} open={isOpen}>
            <DrawerContent>
                <DrawerHeader
                    onClick={handleCloseDrawer}
                    drawerTitle="Add Master Item"
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
                            handleShowSource={() => setShowModalSource(true)}
                            type="add"
                        />
                        <DetailForm
                            errors={errors}
                            watch={watch}
                            setValue={setValue}
                            register={register}
                            handleInputKeyDown={handleInputKeyDown}
                            setError={setError}
                            type="add"
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
            <SelectableModal
                isOpen={showModalSource}
                onClose={() => setShowModalSource(false)}
                title="Find Master Item"
                queryKey={GET_MASTER_ITEM_MATERIAL_MANAGEMENT}
                columns={{
                    columns: [
                        {
                            accessor: "number",
                            header: "#",
                        },
                        {
                            accessor: "item_code",
                            header: "Item Code",
                        },
                        {
                            accessor: "item_name",
                            header: "Item Name",
                        },
                        {
                            accessor: "local_code",
                            header: "Local Code",
                        },
                        {
                            accessor: "foreign_name",
                            header: "Foreign Name",
                        },
                        {
                            accessor: "old_code",
                            header: "Old Code",
                        },
                        {
                            accessor: "category_name",
                            header: "Category Name",
                        },
                        {
                            accessor: "specification",
                            header: "Specification",
                        },
                        {
                            accessor: "active",
                            header: "Active",
                        },
                        {
                            accessor: "create_date",
                            header: "Create Date",
                        },
                    ],
                    hasAction: false,
                }}
                queryFn={getItem}
                onSelectRow={(data: MasterItemFormBody) => {
                    setValue("source", data.item_code);
                    setShowModalSource(false);
                }}
            />
        </Drawer>
    );
};

export default CreateMasterItem;
