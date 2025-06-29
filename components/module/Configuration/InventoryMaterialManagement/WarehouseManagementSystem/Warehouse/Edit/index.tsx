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
import { WarehouseSchema } from "@constants/schemas/ConfigurationSchema/InventoryMaterialManagement";
import { getCity } from "@services/fetcher/configuration/general";
import {
    editWarehouse,
    getWarehouseCategory,
} from "@services/fetcher/configuration/inventory-management";
import Combobox from "@components/shared/Combobox";
import {
    GET_WAREHOUSE,
    GET_CITY,
    GET_WAREHOUSE_CATEGORY,
} from "@constants/queryKey";
import { useForm } from "@hooks/useForm";
import { useSetValueForm } from "@hooks/useSetValueForm";
import { useDrawerStore } from "@stores/useDrawerStore";

const EditWarehouse = () => {
    const detail_data = useDrawerStore(
        (state) => state.detail_data
    ) as WarehouseFormBody;

    const {
        handleCloseDrawerEdit,
        handleInputKeyDown,
        handleSaveClick,
        handleSubmit,
        isLoading,
        formRef,
        canSave,
        errors,
        setError,
        setValue,
        isOpenEdit,
        register,
        watch,
    } = useForm({
        label: "Warehouse",
        queryKey: GET_WAREHOUSE,
        mutationFn: editWarehouse,
        validationSchema: WarehouseSchema,
        defaultValues: detail_data,
        type: "edit",
    });

    useSetValueForm<WarehouseFormBody>(detail_data, setValue, isOpenEdit);

    return (
        <Drawer onClose={handleCloseDrawerEdit} open={isOpenEdit}>
            <DrawerContent>
                <DrawerHeader
                    onClick={handleCloseDrawerEdit}
                    drawerTitle="Edit Warehouse"
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
                        <Card
                            size="drawer"
                            className="border border-Neutral-200 shadow-none"
                        >
                            <CardContent className="flex-wrap flex flex-row gap-6">
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
                                        placeholder="Kode Gudang"
                                        right
                                        type="text"
                                        required
                                        className="w-full gap-2"
                                        disabled
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
                                        placeholder="Nama Gudang"
                                        right
                                        type="text"
                                        required
                                        className="w-full gap-2"
                                        onKeyDown={handleInputKeyDown}
                                    />
                                    <Combobox
                                        label="Warehouse Category"
                                        placeholder="Pilih Kateogri Gudang"
                                        queryKey={[GET_WAREHOUSE_CATEGORY]}
                                        queryFn={getWarehouseCategory}
                                        required
                                        dataLabel="warehouse_category_name"
                                        dataValue="warehouse_category_code"
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
                                        value={{
                                            label:
                                                watch(
                                                    "warehouse_category_name"
                                                ) || "",
                                            value:
                                                watch(
                                                    "warehouse_category_code"
                                                ) || "",
                                        }}
                                        onChange={(val) => {
                                            setValue(
                                                "warehouse_category_name",
                                                val.label
                                            );
                                            setValue(
                                                "warehouse_category_code",
                                                val.value
                                            );
                                            setError(
                                                "warehouse_category_name",
                                                { type: "disabled" }
                                            );
                                        }}
                                    />
                                    <InputField
                                        {...register("address")}
                                        message={
                                            errors?.address
                                                ? {
                                                      text: errors.address
                                                          .message!,
                                                      type: "danger",
                                                  }
                                                : undefined
                                        }
                                        label="Address"
                                        placeholder="Alamat Gudang"
                                        type="text"
                                        right
                                        textarea
                                        className="w-full gap-2"
                                        onKeyDown={handleInputKeyDown}
                                    />
                                </div>
                                <div className="flex flex-col gap-[14px] flex-1 h-full justify-between">
                                    <Combobox
                                        label="City"
                                        placeholder="Pilih Kota"
                                        queryKey={[GET_CITY]}
                                        queryFn={getCity}
                                        required
                                        dataLabel="city_name"
                                        dataValue="city_code"
                                        message={
                                            errors.city_name
                                                ? {
                                                      text: errors.city_name
                                                          .message!,
                                                      type: "danger",
                                                  }
                                                : undefined
                                        }
                                        value={{
                                            label: watch("city_name"),
                                            value: watch("city_code"),
                                        }}
                                        onChange={(val) => {
                                            setValue("city_name", val.label);
                                            setValue("city_code", val.value);
                                            setError("city_name", {
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
                                        placeholder="Kode Pos"
                                        right
                                        type="number"
                                        className="w-full gap-2"
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
                                        type="number"
                                        className="w-full gap-2"
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
                                        placeholder="warehouse@aditama.idd"
                                        right
                                        type="email"
                                        className="w-full gap-2"
                                        onKeyDown={handleInputKeyDown}
                                    />
                                </div>
                                <div className="flex flex-col gap-[14px] flex-1">
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
                                        placeholder="0891234567890"
                                        right
                                        type="number"
                                        className="w-full gap-2"
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
                                        placeholder="0891234567890"
                                        right
                                        type="number"
                                        className="w-full gap-2"
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
                                        placeholder="Nama Penanggungjawab Gudang"
                                        right
                                        textarea
                                        type="text"
                                        className="w-full gap-2"
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
                                        placeholder="Pilih Kateogri Biaya"
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

export default EditWarehouse;
