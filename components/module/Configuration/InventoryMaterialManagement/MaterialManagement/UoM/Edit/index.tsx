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
import { GET_UOM } from "@constants/queryKey";
import { editUOM } from "@services/fetcher/configuration/inventory-management";
import { UOMSchema } from "@constants/schemas/ConfigurationSchema/InventoryMaterialManagement";
import { useSetValueForm } from "@hooks/useSetValueForm";

const EditUOM = () => {
    const detail_data = useDrawerStore(
        (state) => state.detail_data
    ) as UOMFormBody;

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
        label: "Item UoM",
        queryKey: GET_UOM,
        mutationFn: editUOM,
        validationSchema: UOMSchema,
        defaultValues: detail_data,
        type: "edit",
    });

    useSetValueForm<UOMFormBody>(detail_data, setValue, isOpenEdit);

    return (
        <Drawer onClose={handleCloseDrawerEdit} open={isOpenEdit}>
            <DrawerContent>
                <DrawerHeader
                    onClick={handleCloseDrawerEdit}
                    drawerTitle="Edit UoM"
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

                <form ref={formRef} onSubmit={handleSubmit} noValidate>
                    <DrawerBody>
                        <Card size="drawer">
                            <CardContent className="flex-wrap flex flex-row gap-6 items-center">
                                <InputField
                                    {...register("uom_code")}
                                    message={
                                        errors.uom_code
                                            ? {
                                                  text: errors.uom_code
                                                      .message!,
                                                  type: "danger",
                                              }
                                            : undefined
                                    }
                                    label="UoM Code"
                                    placeholder="UoM Code"
                                    right
                                    type="text"
                                    className="flex-1 gap-2"
                                    disabled
                                    onKeyDown={handleInputKeyDown}
                                />
                                <InputField
                                    {...register("uom_name")}
                                    message={
                                        errors.uom_name
                                            ? {
                                                  text: errors.uom_name
                                                      .message!,
                                                  type: "danger",
                                              }
                                            : undefined
                                    }
                                    label="UoM Name"
                                    placeholder="UoM Name"
                                    right
                                    type="text"
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

export default EditUOM;
