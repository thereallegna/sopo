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
import { Checkbox } from "@components/ui/Checkbox";
import { useForm } from "@hooks/useForm";
import { SiteSchema } from "@constants/schemas/ConfigurationSchema/general";
import { createSite } from "@services/fetcher/configuration/general";
import { SiteDefaultValues } from "@constants/defaultValues";
import { GET_SITE } from "@constants/queryKey";

const CreateSite = () => {
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
        label: "Site",
        queryKey: GET_SITE,
        mutationFn: createSite,
        validationSchema: SiteSchema,
        defaultValues: SiteDefaultValues,
        type: "add",
        requireAllFields: true,
        ignoredFields: ["address", "remark"],
    });
    return (
        <Drawer onClose={handleCloseDrawer} open={isOpen}>
            <DrawerContent>
                <DrawerHeader
                    onClick={handleCloseDrawer}
                    drawerTitle="Create Site"
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
                        <Card
                            size="drawer"
                            className="border border-Neutral-200 shadow-none"
                        >
                            <CardContent className="flex-wrap flex flex-row gap-6">
                                <div className="flex flex-col gap-[14px] flex-1">
                                    <InputField
                                        {...register("site_code")}
                                        message={
                                            errors.site_code
                                                ? {
                                                      text: errors.site_code
                                                          .message!,
                                                      type: "danger",
                                                  }
                                                : undefined
                                        }
                                        label="Site Code"
                                        placeholder="Site Code"
                                        right
                                        type="text"
                                        required
                                        className="w-full gap-2"
                                        onKeyDown={handleInputKeyDown}
                                    />
                                    <InputField
                                        {...register("site_name")}
                                        message={
                                            errors.site_name
                                                ? {
                                                      text: errors.site_name
                                                          .message!,
                                                      type: "danger",
                                                  }
                                                : undefined
                                        }
                                        label="Site Name"
                                        placeholder="Site Name"
                                        right
                                        type="text"
                                        required
                                        className="w-full gap-2"
                                        onKeyDown={handleInputKeyDown}
                                    />
                                </div>
                                <div className="flex flex-col gap-[14px] flex-1 h-full justify-between">
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
                                        placeholder="Remark"
                                        right
                                        type="text"
                                        textarea
                                        className="w-full gap-2"
                                        onKeyDown={handleInputKeyDown}
                                    />
                                </div>
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
                                        checked={SiteDefaultValues.active}
                                        disabled
                                        onCheckedChange={(checked) =>
                                            setValue("active", !!checked)
                                        }
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

export default CreateSite;
