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
import { useForm } from "@hooks/useForm";
import { IconDeviceFloppy } from "@tabler/icons-react";
import { GET_TAX_GROUP } from "@constants/queryKey";
import { createTaxGroup } from "@services/fetcher/configuration/financial-management";
import { TaxGroupSchema } from "@constants/schemas/ConfigurationSchema/FinancialManagement";
import { TaxGroupDefaultValues } from "@constants/defaultValues";

const CreateTaxGroup = () => {
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
        label: "Tax Group",
        queryKey: GET_TAX_GROUP,
        mutationFn: createTaxGroup,
        validationSchema: TaxGroupSchema,
        defaultValues: TaxGroupDefaultValues,
        type: "add",
        requireAllFields: true,
    });

    return (
        <Drawer onClose={handleCloseDrawer} open={isOpen}>
            <DrawerContent>
                <DrawerHeader
                    onClick={handleCloseDrawer}
                    drawerTitle="Create Tax Group"
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
                            {isLoading ? "saving..." : "Save"}
                        </Button>
                    </DrawerEndHeader>
                </DrawerHeader>
                <form ref={formRef} onSubmit={handleSubmit}>
                    <DrawerBody>
                        <Card
                            size="drawer"
                            className="border border-Neutral-200 shadow-none"
                        >
                            <CardContent className="flex-wrap flex flex-row gap-6 items-center">
                                <InputField
                                    {...register("tax_group_code")}
                                    message={
                                        errors.tax_group_code
                                            ? {
                                                  text: errors.tax_group_code
                                                      .message!,
                                                  type: "danger",
                                              }
                                            : undefined
                                    }
                                    label="Tax Group Code"
                                    placeholder="Tax Group Code"
                                    right
                                    type="text"
                                    required
                                    className="flex-1 gap-2"
                                    onKeyDown={handleInputKeyDown}
                                />
                                <InputField
                                    {...register("tax_group_name")}
                                    message={
                                        errors.tax_group_name
                                            ? {
                                                  text: errors.tax_group_name
                                                      .message!,
                                                  type: "danger",
                                              }
                                            : undefined
                                    }
                                    label="Tax Group Name"
                                    placeholder="Tax Group Name"
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

export default CreateTaxGroup;
