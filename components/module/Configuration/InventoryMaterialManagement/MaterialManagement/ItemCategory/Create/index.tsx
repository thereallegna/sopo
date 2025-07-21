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
import { ItemCategoryDefaultValues } from "@constants/defaultValues";
import { GET_CATEGORY_MATERIAL_MANAGEMENT } from "@constants/queryKey";
import { ItemCategorySchema } from "@constants/schemas/ConfigurationSchema/InventoryMaterialManagement";
import { createItemCategory } from "@services/fetcher/configuration/inventory-management";
import { Checkbox } from "@components/ui/Checkbox";

const CreateItemCategory = () => {
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
        setValue,
        register,
        // watch,
    } = useForm({
        label: "Items Category",
        queryKey: GET_CATEGORY_MATERIAL_MANAGEMENT,
        mutationFn: createItemCategory,
        validationSchema: ItemCategorySchema,
        defaultValues: ItemCategoryDefaultValues,
        type: "add",
        requireAllFields: true,
    });

    return (
        <Drawer onClose={handleCloseDrawer} open={isOpen}>
            <DrawerContent>
                <DrawerHeader
                    onClick={handleCloseDrawer}
                    drawerTitle="Add Item Category"
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
                                        required
                                        type="text"
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
                                    <div className="flex items-start gap-2 ml-[10px] mt-[8px]">
                                        <label
                                            htmlFor="active"
                                            className="cursor-pointer text-base font-semibold"
                                        >
                                            Active
                                        </label>
                                        <Checkbox
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
                                            checked={
                                                ItemCategoryDefaultValues.active
                                            }
                                            disabled
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

export default CreateItemCategory;
