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
import { Card, CardContent } from "@components/ui/Card";
import InputField from "@components/shared/InputField";
import { useDrawerStore } from "@stores/useDrawerStore";
import { IconDeviceFloppy } from "@tabler/icons-react";
import { useForm } from "@hooks/useForm";
import { useSetValueForm } from "@hooks/useSetValueForm";
import { GET_WAREHOUSE_CATEGORY } from "@constants/queryKey";
import { WarehouseCategorySchema } from "@constants/schemas/ConfigurationSchema/InventoryMaterialManagement";
import { editWarehouseCategory } from "@services/fetcher/configuration/inventory-management";

const EditWarehouseCategory = () => {
    const detail_data = useDrawerStore(
        (state) => state.detail_data
    ) as WarehouseCategoryFormBody;

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
        setValue,
        register,
    } = useForm({
        label: "Warehouse Category",
        queryKey: GET_WAREHOUSE_CATEGORY,
        mutationFn: editWarehouseCategory,
        validationSchema: WarehouseCategorySchema,
        defaultValues: detail_data,
        type: "edit",
    });

    useSetValueForm<WarehouseCategoryFormBody>(
        detail_data,
        setValue,
        isOpenEdit
    );
    return (
        <Drawer onClose={handleCloseDrawerEdit} open={isOpenEdit}>
            <DrawerContent>
                <DrawerHeader
                    onClick={handleCloseDrawerEdit}
                    drawerTitle="Edit Warehouse Category"
                >
                    <DrawerEndHeader>
                        <Button
                            variant={!canSave ? "disabled" : "primary"}
                            icon={{
                                size: "large",
                                icon: IconDeviceFloppy,
                                color: "White",
                            }}
                            onClick={handleSaveClick}
                            disabled={isLoading}
                        >
                            {isLoading ? "saving..." : "save"}
                        </Button>
                    </DrawerEndHeader>
                </DrawerHeader>

                <form ref={formRef} onSubmit={handleSubmit}>
                    <DrawerBody>
                        <Card size="drawer">
                            <CardContent className="flex-wrap flex flex-row gap-6 items-center">
                                <InputField
                                    {...register("warehouse_category_code")}
                                    message={
                                        errors.warehouse_category_code
                                            ? {
                                                  text: errors
                                                      .warehouse_category_code
                                                      .message!,
                                                  type: "danger",
                                              }
                                            : undefined
                                    }
                                    label="Warehouse Category Code"
                                    placeholder="Warehouse Category Code"
                                    right
                                    type="text"
                                    className="flex-1 gap-2"
                                    disabled
                                    onKeyDown={handleInputKeyDown}
                                />
                                <InputField
                                    {...register("warehouse_category_name")}
                                    message={
                                        errors.warehouse_category_name
                                            ? {
                                                  text: errors
                                                      .warehouse_category_name
                                                      .message!,
                                                  type: "danger",
                                              }
                                            : undefined
                                    }
                                    label="Warehouse Category Name"
                                    placeholder="Warehouse Category Name"
                                    right
                                    type="text"
                                    required
                                    className="flex-1 gap-2"
                                    onKeyDown={handleInputKeyDown}
                                />
                            </CardContent>
                        </Card>
                    </DrawerBody>
                </form>
            </DrawerContent>
        </Drawer>
    );
};

export default EditWarehouseCategory;
