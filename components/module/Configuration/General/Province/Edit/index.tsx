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
import { provinceSchema } from "@constants/schemas/ConfigurationSchema/General";
import {
    editProvince,
    getCountry,
} from "@services/fetcher/configuration/general";
import { useSetValueForm } from "@hooks/useSetValueForm";
import { GET_COUNTRY, GET_PROVINCE } from "@constants/queryKey";
import Combobox from "@components/shared/Combobox";

const EditProvince = () => {
    const detail_data = useDrawerStore(
        (state) => state.detail_data
    ) as ProvinceFormBody;

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
        label: "Province",
        queryKey: GET_PROVINCE,
        mutationFn: editProvince,
        validationSchema: provinceSchema,
        defaultValues: detail_data,
        type: "edit",
    });

    useSetValueForm<ProvinceFormBody>(detail_data, setValue, isOpenEdit);

    return (
        <Drawer onClose={handleCloseDrawerEdit} open={isOpenEdit}>
            <DrawerContent>
                <DrawerHeader
                    onClick={handleCloseDrawerEdit}
                    drawerTitle="Edit City"
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
                            <CardContent className="flex-wrap flex flex-row gap-6 items-center">
                                <div className="flex flex-col gap-[14px] flex-1">
                                    <InputField
                                        {...register("province_code")}
                                        message={
                                            errors.province_code
                                                ? {
                                                      text: errors.province_code
                                                          .message!,
                                                      type: "danger",
                                                  }
                                                : undefined
                                        }
                                        label="Province Code"
                                        placeholder="Province Code"
                                        right
                                        type="text"
                                        required
                                        className="flex-1 gap-2"
                                        disabled
                                        onKeyDown={handleInputKeyDown}
                                    />
                                    <InputField
                                        {...register("province_name")}
                                        message={
                                            errors.province_name
                                                ? {
                                                      text: errors.province_name
                                                          .message!,
                                                      type: "danger",
                                                  }
                                                : undefined
                                        }
                                        label="Province Name"
                                        placeholder="Province Name"
                                        right
                                        type="text"
                                        required
                                        className="flex-1 gap-2"
                                        onKeyDown={handleInputKeyDown}
                                    />
                                </div>
                                <div className="flex flex-col gap-[14px] flex-1 self-start">
                                    <Combobox
                                        className="flex-1"
                                        label="Country"
                                        placeholder="Select Country"
                                        queryKey={[GET_COUNTRY]}
                                        queryFn={() => getCountry()}
                                        dataLabel="country_name"
                                        dataValue="country_code"
                                        message={
                                            errors.country
                                                ? {
                                                      text: errors.country
                                                          .message!,
                                                      type: "danger",
                                                  }
                                                : undefined
                                        }
                                        value={{
                                            label: watch("country"),
                                            value: watch("country_code"),
                                        }}
                                        onChange={(val) => {
                                            setValue("country", val.label, {
                                                shouldDirty: true,
                                            });
                                            setValue(
                                                "country_code",
                                                val.value,
                                                {
                                                    shouldDirty: true,
                                                }
                                            );
                                            setError("country", {
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

export default EditProvince;
