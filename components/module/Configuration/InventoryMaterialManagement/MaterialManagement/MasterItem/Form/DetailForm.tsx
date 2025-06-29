import React from "react";
import Combobox from "@components/shared/Combobox";
import InputField from "@components/shared/InputField";
import { Card, CardContent } from "@components/ui/Card";
import { GET_CATEGORY_MATERIAL_MANAGEMENT, GET_UOM } from "@constants/queryKey";
import {
    getItemCategory,
    getUOM,
} from "@services/fetcher/configuration/inventory-management";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@components/ui/Tabs";
import { Checkbox } from "@components/ui/Checkbox";
import { FormType } from "../../../../../../../types/form";

const DetailForm = ({
    errors,
    watch,
    register,
    setValue,
    setError,
    handleInputKeyDown,
    disableAll, // Tambahkan parameter disableAll
    type = "add",
}: FormType<MasterItemFormBody> & {
    disableAll?: boolean;
    type?: "add" | "edit";
}) => (
    <Card size="drawer" className="border border-Neutral-200 shadow-none">
        <CardContent className="flex-wrap flex flex-row gap-6 items-center">
            <Tabs defaultValue="general">
                <TabsList>
                    <TabsTrigger value="general" disabled={disableAll}>
                        General
                    </TabsTrigger>
                </TabsList>
                <TabsContent
                    value="general"
                    className="flex-wrap flex flex-row gap-6 items-start"
                >
                    <div className="flex flex-col gap-[14px] flex-1">
                        <Combobox
                            label="Category"
                            required
                            placeholder="Select Category"
                            queryKey={[GET_CATEGORY_MATERIAL_MANAGEMENT]}
                            queryFn={getItemCategory}
                            dataLabel="item_category_name"
                            dataValue="item_category_code"
                            message={
                                errors?.category_code
                                    ? {
                                          text: errors.category_code.message!,
                                          type: "danger",
                                      }
                                    : undefined
                            }
                            value={{
                                label: watch("category_name"),
                                value: watch("category_code"),
                            }}
                            onChange={(val) => {
                                if (!disableAll && setValue) {
                                    setValue("category_name", val.label);
                                    setValue("category_code", val.value);
                                }
                                if (setError) {
                                    setError("category_code", {
                                        type: "disabled",
                                    });
                                }
                            }}
                            disabled={disableAll || type === "edit"} // Disabled berdasarkan disableAll
                        />
                        <Combobox
                            label="UoM"
                            required
                            placeholder="Select UoM"
                            queryKey={[GET_UOM]}
                            queryFn={getUOM}
                            dataLabel="uom_name"
                            dataValue="uom_code"
                            message={
                                errors?.uom_code
                                    ? {
                                          text: errors.uom_code.message!,
                                          type: "danger",
                                      }
                                    : undefined
                            }
                            value={{
                                label: watch("uom_name"),
                                value: watch("uom_code"),
                            }}
                            onChange={(val) => {
                                if (!disableAll && setValue) {
                                    setValue("uom_name", val.label);
                                    setValue("uom_code", val.value);
                                }
                                if (setError) {
                                    setError("uom_code", { type: "disabled" });
                                }
                            }}
                            disabled={disableAll || type === "edit"} // Disabled berdasarkan disableAll
                        />
                        <InputField
                            {...register("spesification")}
                            message={
                                errors?.spesification
                                    ? {
                                          text: errors.spesification.message!,
                                          type: "danger",
                                      }
                                    : undefined
                            }
                            label="Spesification"
                            placeholder="Text here.."
                            right
                            type="text"
                            className="w-full gap-2"
                            textarea
                            onKeyDown={handleInputKeyDown}
                            disabled={disableAll} // Disabled berdasarkan disableAll
                        />
                    </div>
                    <div className="flex flex-col gap-[14px] flex-1">
                        <InputField
                            {...register("hs_code")}
                            message={
                                errors?.hs_code
                                    ? {
                                          text: errors.hs_code.message!,
                                          type: "danger",
                                      }
                                    : undefined
                            }
                            label="HS Code"
                            placeholder="Text here.."
                            right
                            type="text"
                            className="w-full gap-2"
                            onKeyDown={handleInputKeyDown}
                            disabled={disableAll} // Disabled berdasarkan disableAll
                        />
                        <InputField
                            {...register("remark")}
                            message={
                                errors?.remark
                                    ? {
                                          text: errors.remark.message!,
                                          type: "danger",
                                      }
                                    : undefined
                            }
                            label="Remark"
                            placeholder="Text here.."
                            right
                            type="text"
                            className="w-full gap-2"
                            textarea
                            onKeyDown={handleInputKeyDown}
                            disabled={disableAll} // Disabled berdasarkan disableAll
                        />
                        <Checkbox
                            label="Tax Liable"
                            checked={watch("tax_liable")}
                            onCheckedChange={(val) =>
                                !disableAll &&
                                setValue &&
                                setValue("tax_liable", val)
                            }
                            disabled={disableAll} // Disabled berdasarkan disableAll
                        />
                    </div>
                </TabsContent>
            </Tabs>
        </CardContent>
    </Card>
);

export default DetailForm;
