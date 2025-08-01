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
import { CountrySchema } from "@constants/schemas/ConfigurationSchema/General";
import { editCountry } from "@services/fetcher/configuration/general";
import { GET_COUNTRY } from "@constants/queryKey";
import { useSetValueForm } from "@hooks/useSetValueForm";
import { useDrawerStore } from "@stores/useDrawerStore";

const EditCountry = () => {
    const detail_data = useDrawerStore(
        (state) => state.detail_data
    ) as CountryFormBody;

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
        label: "Country",
        queryKey: GET_COUNTRY,
        mutationFn: editCountry,
        validationSchema: CountrySchema,
        defaultValues: detail_data,
        type: "edit",
        requireAllFields: true,
    });

    useSetValueForm<CountryFormBody>(detail_data, setValue, isOpenEdit);

    return (
        <Drawer onClose={handleCloseDrawerEdit} open={isOpenEdit}>
            <DrawerContent>
                <DrawerHeader
                    onClick={handleCloseDrawerEdit}
                    drawerTitle="Edit Country"
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
                                <InputField
                                    {...register("country_code")}
                                    message={
                                        errors.country_code
                                            ? {
                                                  text: errors.country_code
                                                      .message!,
                                                  type: "danger",
                                              }
                                            : undefined
                                    }
                                    label="Country Code"
                                    placeholder="Country Code"
                                    right
                                    required
                                    type="text"
                                    className="flex-1 gap-2"
                                    disabled
                                    onKeyDown={handleInputKeyDown}
                                />
                                <InputField
                                    {...register("country_name")}
                                    message={
                                        errors.country_name
                                            ? {
                                                  text: errors.country_name
                                                      .message!,
                                                  type: "danger",
                                              }
                                            : undefined
                                    }
                                    label="Country Name"
                                    placeholder="Country Name"
                                    right
                                    required
                                    type="text"
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

export default EditCountry;
