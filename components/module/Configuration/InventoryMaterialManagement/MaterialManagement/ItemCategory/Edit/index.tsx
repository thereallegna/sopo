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
import { Checkbox } from "@components/ui/Checkbox";
import { useDrawerStore } from "@stores/useDrawerStore";
import { IconDeviceFloppy } from "@tabler/icons-react";
import { useForm } from "@hooks/useForm";
import { GET_CATEGORY_MATERIAL_MANAGEMENT } from "@constants/queryKey";
import { editItemCategory } from "@services/fetcher/configuration/inventory-management";
import { ItemCategorySchema } from "@constants/schemas/ConfigurationSchema/InventoryMaterialManagement";
import { useSetValueForm } from "@hooks/useSetValueForm";

const EditItemCategory = () => {
    const detail_data = useDrawerStore(
        (state) => state.detail_data
    ) as ItemCategoryFormBody;

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
        watch,
    } = useForm({
        label: "Item's Category",
        queryKey: GET_CATEGORY_MATERIAL_MANAGEMENT,
        mutationFn: editItemCategory,
        validationSchema: ItemCategorySchema,
        defaultValues: detail_data,
        type: "edit",
    });

    useSetValueForm<ItemCategoryFormBody>(detail_data, setValue, isOpenEdit);

    return (
        <Drawer onClose={handleCloseDrawerEdit} open={isOpenEdit}>
            <DrawerContent>
                <DrawerHeader
                    onClick={handleCloseDrawerEdit}
                    drawerTitle="Edit Item's Category"
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
                            {isLoading ? "saving" : "save"}
                        </Button>
                    </DrawerEndHeader>
                </DrawerHeader>

                <form ref={formRef} onSubmit={handleSubmit} noValidate>
                    <DrawerBody>
                        <Card size="drawer">
                            <CardContent className="flex-wrap flex flex-row gap-4">
                                <div className="flex flex-row gap-[10px] flex-1 h-full">
                                    <InputField
                                        {...register("item_category_code")}
                                        className="flex-grow"
                                        message={
                                            errors.item_category_code
                                                ? {
                                                      text: errors
                                                          .item_category_code
                                                          .message!,
                                                      type: "danger",
                                                  }
                                                : undefined
                                        }
                                        label="Item Category Code"
                                        placeholder="Item Category Code"
                                        right
                                        disabled
                                        type="text"
                                        required
                                        onKeyDown={handleInputKeyDown}
                                    />
                                    <InputField
                                        {...register("item_category_name")}
                                        className="flex-grow"
                                        message={
                                            errors.item_category_name
                                                ? {
                                                      text: errors
                                                          .item_category_name
                                                          .message!,
                                                      type: "danger",
                                                  }
                                                : undefined
                                        }
                                        label="Item Category Name"
                                        placeholder="Item Category Name"
                                        right
                                        required
                                        type="text"
                                        onKeyDown={handleInputKeyDown}
                                    />
                                    <div className="flex items-start gap-2 ml-[14px] mt-[10px]">
                                        <label
                                            htmlFor="active"
                                            className="cursor-pointer text-base font-semibold"
                                        >
                                            Active
                                        </label>
                                        <Checkbox
                                            checked={watch("active")}
                                            {...register("active")}
                                            message={
                                                errors.active
                                                    ? {
                                                          text: errors.active
                                                              .message!,
                                                          type: "danger",
                                                      }
                                                    : undefined
                                            }
                                            label=""
                                            onCheckedChange={(checked) =>
                                                setValue("active", !!checked)
                                            }
                                        />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </DrawerBody>
                </form>
            </DrawerContent>
        </Drawer>
    );
};

export default EditItemCategory;
