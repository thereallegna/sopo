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
import { VendorSchema } from "@constants/schemas/ConfigurationSchema/ProcurementManagement";
import {
    createVendor,
    getVendorCategory,
} from "@services/fetcher/configuration/procurement-management";
import { getCity } from "@services/fetcher/configuration/general";
import { VendorDefaultValues } from "@constants/defaultValues";
import Combobox from "@components/shared/Combobox";
import { GET_VENDOR_CATEGORY, GET_VENDOR, GET_CITY } from "@constants/queryKey";

const CreateVendor = () => {
    const {
        handleCloseDrawer,
        handleInputKeyDown,
        handleSaveClick,
        handleSubmit,
        isLoading,
        formRef,
        isOpen,
        canSave,
        watch,
        setValue,
        setError,
        errors,
        register,
    } = useForm({
        label: "Vendor",
        queryKey: GET_VENDOR,
        mutationFn: createVendor,
        validationSchema: VendorSchema,
        defaultValues: VendorDefaultValues,
        type: "add",
        ignoredFields: [
            "city",
            "postal_code",
            "website",
            "head_office",
            "phone",
            "mobile",
            "email",
            "remark",
        ],
    });

    return (
        <Drawer onClose={handleCloseDrawer} open={isOpen}>
            <DrawerContent>
                <DrawerHeader
                    onClick={handleCloseDrawer}
                    drawerTitle="Add Vendor"
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
                                        {...register("vendor_code")}
                                        message={
                                            errors.vendor_code
                                                ? {
                                                      text: errors.vendor_code
                                                          .message!,
                                                      type: "danger",
                                                  }
                                                : undefined
                                        }
                                        label="Vendor Code"
                                        placeholder="Vendor Code"
                                        right
                                        type="text"
                                        required
                                        className="flex-1 gap-2"
                                        onKeyDown={handleInputKeyDown}
                                    />
                                    <InputField
                                        {...register("vendor_name")}
                                        message={
                                            errors.vendor_name
                                                ? {
                                                      text: errors.vendor_name
                                                          .message!,
                                                      type: "danger",
                                                  }
                                                : undefined
                                        }
                                        label="Vendor Name"
                                        placeholder="Vendor Name"
                                        right
                                        type="text"
                                        required
                                        className="flex-1 gap-2"
                                        onKeyDown={handleInputKeyDown}
                                    />
                                    <Combobox
                                        className="flex-1"
                                        label="Vendor Category"
                                        required
                                        placeholder="Select Vendor Category"
                                        queryKey={[GET_VENDOR_CATEGORY]}
                                        queryFn={() =>
                                            getVendorCategory({ all: true })
                                        }
                                        dataLabel="vendor_category_name"
                                        dataValue="vendor_category_code"
                                        message={
                                            errors.vendor_category
                                                ? {
                                                      text: errors
                                                          .vendor_category
                                                          .message!,
                                                      type: "danger",
                                                  }
                                                : undefined
                                        }
                                        value={{
                                            label: watch("vendor_category"),
                                            value: watch(
                                                "vendor_category_code"
                                            ),
                                        }}
                                        onChange={(val) => {
                                            setValue(
                                                "vendor_category",
                                                val.label,
                                                {
                                                    shouldDirty: true,
                                                }
                                            );
                                            setValue(
                                                "vendor_category_code",
                                                val.value,
                                                {
                                                    shouldDirty: true,
                                                }
                                            );
                                            setError("vendor_category", {
                                                type: "disabled",
                                            });
                                        }}
                                    />
                                    <InputField
                                        {...register("address")}
                                        message={
                                            errors.address
                                                ? {
                                                      text: errors.address
                                                          .message!,
                                                      type: "danger",
                                                  }
                                                : undefined
                                        }
                                        label="Address"
                                        placeholder="Address"
                                        right
                                        type="text"
                                        required
                                        className="flex-1 gap-2"
                                        onKeyDown={handleInputKeyDown}
                                    />
                                </div>
                                <div className="flex flex-col gap-[14px] flex-1 h-full justify-between">
                                    <Combobox
                                        className="flex-1"
                                        label="City"
                                        required
                                        placeholder="Select City"
                                        queryKey={[GET_CITY]}
                                        queryFn={() => getCity({ all: true })}
                                        dataLabel="city_name"
                                        dataValue="city_code"
                                        message={
                                            errors.city
                                                ? {
                                                      text: errors.city
                                                          .message!,
                                                      type: "danger",
                                                  }
                                                : undefined
                                        }
                                        value={{
                                            label: watch("city"),
                                            value: watch("city_code"),
                                        }}
                                        onChange={(val) => {
                                            setValue("city", val.label, {
                                                shouldDirty: true,
                                            });
                                            setValue("city_code", val.value, {
                                                shouldDirty: true,
                                            });
                                            setError("city", {
                                                type: "disabled",
                                            });
                                        }}
                                    />
                                    <InputField
                                        {...register("postal_code")}
                                        message={
                                            errors.postal_code
                                                ? {
                                                      text: errors.postal_code
                                                          .message!,
                                                      type: "danger",
                                                  }
                                                : undefined
                                        }
                                        label="Postal Code"
                                        placeholder="Postal Code"
                                        right
                                        type="text"
                                        className="flex-1 gap-2"
                                        onKeyDown={handleInputKeyDown}
                                    />
                                    <InputField
                                        {...register("website")}
                                        message={
                                            errors.website
                                                ? {
                                                      text: errors.website
                                                          .message!,
                                                      type: "danger",
                                                  }
                                                : undefined
                                        }
                                        label="Website"
                                        placeholder="Website"
                                        right
                                        type="text"
                                        className="flex-1 gap-2"
                                        onKeyDown={handleInputKeyDown}
                                    />
                                    <InputField
                                        {...register("head_office")}
                                        message={
                                            errors.head_office
                                                ? {
                                                      text: errors.head_office
                                                          .message!,
                                                      type: "danger",
                                                  }
                                                : undefined
                                        }
                                        label="Head Office"
                                        placeholder="Head Office"
                                        right
                                        type="text"
                                        className="flex-1 gap-2"
                                        onKeyDown={handleInputKeyDown}
                                    />
                                </div>
                                <div className="flex flex-col gap-[14px] flex-1">
                                    <InputField
                                        {...register("phone")}
                                        message={
                                            errors.phone
                                                ? {
                                                      text: errors.phone
                                                          .message!,
                                                      type: "danger",
                                                  }
                                                : undefined
                                        }
                                        label="Phone"
                                        placeholder="Phone"
                                        right
                                        type="text"
                                        className="flex-1 gap-2"
                                        onKeyDown={handleInputKeyDown}
                                    />
                                    <InputField
                                        {...register("mobile")}
                                        message={
                                            errors.mobile
                                                ? {
                                                      text: errors.mobile
                                                          .message!,
                                                      type: "danger",
                                                  }
                                                : undefined
                                        }
                                        label="Mobile"
                                        placeholder="Mobile"
                                        right
                                        type="text"
                                        className="flex-1 gap-2"
                                        onKeyDown={handleInputKeyDown}
                                    />
                                    <InputField
                                        {...register("email")}
                                        message={
                                            errors.email
                                                ? {
                                                      text: errors.email
                                                          .message!,
                                                      type: "danger",
                                                  }
                                                : undefined
                                        }
                                        label="Email"
                                        placeholder="Email"
                                        right
                                        type="text"
                                        className="flex-1 gap-2"
                                        onKeyDown={handleInputKeyDown}
                                    />
                                    <InputField
                                        {...register("remark")}
                                        message={
                                            errors.remark
                                                ? {
                                                      text: errors.remark
                                                          .message!,
                                                      type: "danger",
                                                  }
                                                : undefined
                                        }
                                        label="Remark"
                                        placeholder="Remark"
                                        right
                                        type="text"
                                        textarea
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

export default CreateVendor;
