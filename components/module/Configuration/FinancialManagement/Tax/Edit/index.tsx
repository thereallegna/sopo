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
import { taxSchema } from "@constants/schemas/ConfigurationSchema/FinancialManagement";
import {
    editTax,
    getTaxGroup,
} from "@services/fetcher/configuration/financial-management";
import { useSetValueForm } from "@hooks/useSetValueForm";
import { GET_TAX_GROUP, GET_TAX } from "@constants/queryKey";
import Combobox from "@components/shared/Combobox";

const EditTax = () => {
    const detail_data = useDrawerStore(
        (state) => state.detail_data
    ) as TaxFormBody;

    const {
        handleCloseDrawerEdit,
        handleInputKeyDown,
        handleSaveClick,
        handleSubmit,
        isLoading,
        formRef,
        isOpenEdit,
        watch,
        setError,
        canSave,
        errors,
        setValue,
        register,
    } = useForm({
        label: "Tax",
        queryKey: GET_TAX,
        mutationFn: editTax,
        validationSchema: taxSchema,
        defaultValues: detail_data,
        type: "edit",
    });

    useSetValueForm<TaxFormBody>(detail_data, setValue, isOpenEdit);

    return (
        <Drawer onClose={handleCloseDrawerEdit} open={isOpenEdit}>
            <DrawerContent>
                <DrawerHeader
                    onClick={handleCloseDrawerEdit}
                    drawerTitle="Edit Tax"
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
                            {isLoading ? "Saving..." : "Save"}
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
                                <div className="flex flex-col gap-[14px] flex-1">
                                    <InputField
                                        {...register("tax_code")}
                                        message={
                                            errors.tax_code
                                                ? {
                                                      text: errors.tax_code
                                                          .message!,
                                                      type: "danger",
                                                  }
                                                : undefined
                                        }
                                        label="Tax Code"
                                        placeholder="Tax Code"
                                        right
                                        type="text"
                                        required
                                        className="flex-1 gap-2"
                                        disabled
                                        onKeyDown={handleInputKeyDown}
                                    />
                                    <InputField
                                        {...register("tax_name")}
                                        message={
                                            errors.tax_name
                                                ? {
                                                      text: errors.tax_name
                                                          .message!,
                                                      type: "danger",
                                                  }
                                                : undefined
                                        }
                                        label="Tax Name"
                                        placeholder="Tax Name"
                                        right
                                        type="text"
                                        required
                                        className="flex-1 gap-2"
                                        onKeyDown={handleInputKeyDown}
                                    />
                                </div>
                                <div className="flex flex-col gap-[14px] flex-1 h-full justify-between">
                                    <InputField
                                        {...register("tax_rate")}
                                        message={
                                            errors.tax_rate
                                                ? {
                                                      text: errors.tax_rate
                                                          .message!,
                                                      type: "danger",
                                                  }
                                                : undefined
                                        }
                                        label="Tax Rate"
                                        placeholder="Tax Rate"
                                        right
                                        type="text"
                                        required
                                        className="flex-1 gap-2"
                                        onKeyDown={handleInputKeyDown}
                                    />
                                    <Combobox
                                        className="flex-1 gap-2"
                                        label="Tax Group"
                                        placeholder="Select Tax Group"
                                        required
                                        queryKey={[GET_TAX_GROUP]}
                                        queryFn={getTaxGroup}
                                        dataLabel="tax_group_name"
                                        dataValue="tax_group_code"
                                        message={
                                            errors.tax_group
                                                ? {
                                                      text: errors.tax_group
                                                          .message!,
                                                      type: "danger",
                                                  }
                                                : undefined
                                        }
                                        value={{
                                            label: watch("tax_group"),
                                            value: watch("tax_group_code"),
                                        }}
                                        onChange={(val) => {
                                            setValue("tax_group", val.label, {
                                                shouldDirty: true,
                                            });
                                            setValue(
                                                "tax_group_code",
                                                val.value,
                                                {
                                                    shouldDirty: true,
                                                }
                                            );
                                            setError("tax_group", {
                                                type: "disabled",
                                            });
                                        }}
                                    />
                                </div>
                            </CardContent>
                        </Card>
                    </DrawerBody>
                </form>
            </DrawerContent>
        </Drawer>
    );
};

export default EditTax;
