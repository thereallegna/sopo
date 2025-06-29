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
import { countrySchema } from "@constants/schemas/ConfigurationSchema/General";
import { createCountry } from "@services/fetcher/configuration/general";
import { CountryDefaultValues } from "@constants/defaultValues";
import { GET_COUNTRY } from "@constants/queryKey";

const CreateCountry = () => {
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
        register,
    } = useForm({
        label: "Country",
        queryKey: GET_COUNTRY,
        mutationFn: createCountry,
        validationSchema: countrySchema,
        defaultValues: CountryDefaultValues,
        type: "add",
        requireAllFields: true,
    });
    return (
        <Drawer onClose={handleCloseDrawer} open={isOpen}>
            <DrawerContent>
                <DrawerHeader
                    onClick={handleCloseDrawer}
                    drawerTitle="Create Country"
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
                            <CardContent className="flex-wrap flex flex-row gap-6 items-start">
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

export default CreateCountry;
