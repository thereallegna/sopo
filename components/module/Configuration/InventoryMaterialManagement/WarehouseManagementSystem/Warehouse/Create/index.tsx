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
import { WarehouseSchema } from "@constants/schemas/ConfigurationSchema/InventoryMaterialManagement";
import {
    createWarehouse,
    getWarehouseCategory,
} from "@services/fetcher/configuration/inventory-management";
import { getCity } from "@services/fetcher/configuration/general";
import { WarehouseDefaultValues } from "@constants/defaultValues";
import Combobox from "@components/shared/Combobox";
import {
    GET_WAREHOUSE,
    GET_WAREHOUSE_CATEGORY,
    GET_CITY,
} from "@constants/queryKey";

const CreateWarehouse = () => {
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
        label: "Warehouse",
        queryKey: GET_WAREHOUSE,
        mutationFn: createWarehouse,
        validationSchema: WarehouseSchema,
        defaultValues: WarehouseDefaultValues,
        type: "add",
        ignoredFields: [
            "postal_cd",
            "phone",
            "fax",
            "email",
            "mobile",
            "contact_person",
            "remark",
        ],
    });

    return (
        <Drawer onClose={handleCloseDrawer} open={isOpen}>
            <DrawerContent>
                <DrawerHeader
                    onClick={handleCloseDrawer}
                    drawerTitle="Add Warehouse"
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
                            <CardContent className="flex-wrap flex flex-row- gap-6 items-center">
                                <div className="flex flex-col gap-[14px] flex-1">
                                    <InputField
                                        {...register("warehouse_code")}
                                        message={
                                            errors.warehouse_code
                                                ? {
                                                      text: errors
                                                          .warehouse_code
                                                          .message!,
                                                      type: "danger",
                                                  }
                                                : undefined
                                        }
                                        label="Warehouse Code"
                                        placeholder="Warehouse Code"
                                        right
                                        type="text"
                                        required
                                        className="flex-1 gap-2"
                                        onKeyDown={handleInputKeyDown}
                                    />
                                    <InputField
                                        {...register("warehouse_name")}
                                        message={
                                            errors.warehouse_name
                                                ? {
                                                      text: errors
                                                          .warehouse_name
                                                          .message!,
                                                      type: "danger",
                                                  }
                                                : undefined
                                        }
                                        label="Warehouse Name"
                                        placeholder="Warehouse Name"
                                        right
                                        type="text"
                                        required
                                        className="flex-1 gap-2"
                                        onKeyDown={handleInputKeyDown}
                                    />
                                    <Combobox
                                        className="flex-1"
                                        label="Warehouse Category"
                                        required
                                        placeholder="Select Warehouse Category"
                                        queryKey={[GET_WAREHOUSE_CATEGORY]}
                                        queryFn={() =>
                                            getWarehouseCategory({ all: true })
                                        }
                                        dataLabel="warehouse_category_name"
                                        dataValue="warehouse_category_code"
                                        message={
                                            errors.warehouse_category
                                                ? {
                                                      text: errors
                                                          .warehouse_category
                                                          .message!,
                                                      type: "danger",
                                                  }
                                                : undefined
                                        }
                                        value={{
                                            label: watch("warehouse_category"),
                                            value: watch(
                                                "warehouse_category_code"
                                            ),
                                        }}
                                        onChange={(val) => {
                                            setValue(
                                                "warehouse_category",
                                                val.label,
                                                {
                                                    shouldDirty: true,
                                                }
                                            );
                                            setValue(
                                                "warehouse_category_code",
                                                val.value,
                                                {
                                                    shouldDirty: true,
                                                }
                                            );
                                            setError("warehouse_category", {
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
                                        className="flex-1 gap-2"
                                        onKeyDown={handleInputKeyDown}
                                    />
                                </div>
                                <div className="flex flex-col gap-[14px] flex-1 h-full justify-between">
                                    <Combobox
                                        className="flex-1 gap-2"
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
                                        {...register("postal_cd")}
                                        message={
                                            errors.postal_cd
                                                ? {
                                                      text: errors.postal_cd
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
                                        {...register("fax")}
                                        message={
                                            errors.fax
                                                ? {
                                                      text: errors.fax.message!,
                                                      type: "danger",
                                                  }
                                                : undefined
                                        }
                                        label="Fax"
                                        placeholder="Fax"
                                        right
                                        type="text"
                                        className="flex-1 gap-2"
                                        onKeyDown={handleInputKeyDown}
                                    />
                                </div>
                                <div className="flex flex-col gap-[14px] flex-1">
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
                                        type="email"
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
                                        {...register("contact_person")}
                                        message={
                                            errors.contact_person
                                                ? {
                                                      text: errors
                                                          .contact_person
                                                          .message!,
                                                      type: "danger",
                                                  }
                                                : undefined
                                        }
                                        label="Contact Person"
                                        placeholder="Contact Person"
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
                                        className="flex-1 gap-2"
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

export default CreateWarehouse;
