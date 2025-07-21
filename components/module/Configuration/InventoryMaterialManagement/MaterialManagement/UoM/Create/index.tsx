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
import { IconDeviceFloppy } from "@tabler/icons-react";
import { useForm } from "@hooks/useForm";
import { UOMDefaultValues } from "@constants/defaultValues";
import { GET_UOM } from "@constants/queryKey";
import { UOMSchema } from "@constants/schemas/ConfigurationSchema/InventoryMaterialManagement";
import { createUOM } from "@services/fetcher/configuration/inventory-management";

const CreateUOM = () => {
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
        register,
    } = useForm({
        label: "Item UoM",
        queryKey: GET_UOM,
        mutationFn: createUOM,
        validationSchema: UOMSchema,
        defaultValues: UOMDefaultValues,
        type: "add",
        requireAllFields: true,
    });

    return (
        <Drawer onClose={handleCloseDrawer} open={isOpen}>
            <DrawerContent>
                <DrawerHeader
                    onClick={handleCloseDrawer}
                    drawerTitle="Create UoM"
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
                            disabled={isLoading || !canSave}
                        >
                            {isLoading ? "saving..." : "save"}
                        </Button>
                    </DrawerEndHeader>
                </DrawerHeader>

                <form ref={formRef} onSubmit={handleSubmit}>
                    <DrawerBody>
                        <Card size="drawer">
                            <CardContent className="flex-wrap flex flex-row gap-6 items-start">
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
                                    required
                                    className="flex-1 gap-2"
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

export default CreateUOM;
