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
import { GET_CURRENCY } from "@constants/queryKey";
import { createCurrency } from "@services/fetcher/configuration/financial-management";
import { CurrencySchema } from "@constants/schemas/ConfigurationSchema/FinancialManagement";
import { CurrencyDefaultValues } from "@constants/defaultValues";

const CreateCurrency = () => {
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
        label: "Currency",
        queryKey: GET_CURRENCY,
        mutationFn: createCurrency,
        validationSchema: CurrencySchema,
        defaultValues: CurrencyDefaultValues,
        type: "add",
        requireAllFields: true,
    });

    return (
        <Drawer onClose={handleCloseDrawer} open={isOpen}>
            <DrawerContent>
                <DrawerHeader
                    onClick={handleCloseDrawer}
                    drawerTitle="Create Currency"
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
                            <CardContent className="flex-wrap flex flex-row gap-6 items-start">
                                <InputField
                                    {...register("currency_code")}
                                    message={
                                        errors.currency_code
                                            ? {
                                                  text: errors.currency_code
                                                      .message!,
                                                  type: "danger",
                                              }
                                            : undefined
                                    }
                                    label="Currency Code"
                                    placeholder="Currency Code"
                                    right
                                    type="text"
                                    required
                                    className="flex-1 gap-2"
                                    onKeyDown={handleInputKeyDown}
                                />
                                <InputField
                                    {...register("currency_name")}
                                    message={
                                        errors.currency_name
                                            ? {
                                                  text: errors.currency_name
                                                      .message!,
                                                  type: "danger",
                                              }
                                            : undefined
                                    }
                                    label="Currency Name"
                                    placeholder="Currency Name"
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

export default CreateCurrency;
