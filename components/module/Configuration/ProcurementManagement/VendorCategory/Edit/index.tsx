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
import { vendorCategorySchema } from "@constants/schemas/ConfigurationSchema/ProcurementManagement";
import { useSetValueForm } from "@hooks/useSetValueForm";
import { GET_VENDOR_CATEGORY } from "@constants/queryKey";
import { editVendorCategory } from "@services/fetcher/configuration/procurement-management";

const EditVendorCategory = () => {
    const detail_data = useDrawerStore(
        (state) => state.detail_data
    ) as VendorCategoryFormBody;

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
        label: "Vendor Category",
        queryKey: GET_VENDOR_CATEGORY,
        mutationFn: editVendorCategory,
        validationSchema: vendorCategorySchema,
        defaultValues: detail_data,
        type: "edit",
    });

    useSetValueForm<VendorCategoryFormBody>(detail_data, setValue, isOpenEdit);

    return (
        <Drawer onClose={handleCloseDrawerEdit} open={isOpenEdit}>
            <DrawerContent>
                <DrawerHeader
                    onClick={handleCloseDrawerEdit}
                    drawerTitle="Edit Vendor Category"
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
                                <div className="flex flex-col gap-[14px] flex-1">
                                    <InputField
                                        {...register("vendor_category_code")}
                                        message={
                                            errors.vendor_category_code?.message
                                                ? {
                                                      text: errors
                                                          .vendor_category_code
                                                          .message!,
                                                      type: "danger",
                                                  }
                                                : undefined
                                        }
                                        label="Vendor Category Code"
                                        placeholder="Vendor Category Code"
                                        right
                                        type="text"
                                        required
                                        className="w-full gap-2"
                                        disabled
                                        onKeyDown={handleInputKeyDown}
                                    />
                                </div>
                                <div className="flex flex-col gap-[14px] flex-1 h-full justify-between">
                                    <InputField
                                        {...register("vendor_category_name")}
                                        message={
                                            errors.vendor_category_name?.message
                                                ? {
                                                      text: errors
                                                          .vendor_category_name
                                                          .message!,
                                                      type: "danger",
                                                  }
                                                : undefined
                                        }
                                        label="Vendor Category Name"
                                        placeholder="Vendor Category Name"
                                        right
                                        type="text"
                                        required
                                        className="w-full gap-2"
                                        onKeyDown={handleInputKeyDown}
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

export default EditVendorCategory;
