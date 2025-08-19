import React from "react";
import InputField from "@components/shared/InputField";
import { Card, CardContent } from "@components/ui/Card";
import Combobox from "@components/shared/Combobox";
import { getWarehouse } from "@services/fetcher/configuration/inventory-management";
import { getVendor } from "@services/fetcher/configuration/procurement-management";
import { getSite } from "@services/fetcher/configuration/general";
import {
    getCurrency,
    getTax,
} from "@services/fetcher/configuration/financial-management";
import {
    GET_WAREHOUSE,
    GET_VENDOR,
    GET_SITE,
    GET_CURRENCY,
    GET_TAX,
} from "@constants/queryKey";
import { FormType } from "../../../../../../../../types/form";

const DirectPurchaseReceiveHeaderForm = ({
    setError,
    errors,
    watch,
    register,
    setValue,
    handleInputKeyDown,
    disableAll,
    type = "add",
}: FormType<DirectPurchaseReceiveFormBody> & {
    type?: "add" | "edit";
}) => (
    <Card size="drawer" className="border border-Neutral-200 shadow-none">
        <CardContent className="flex-wrap flex flex-row gap-6 items-center">
            <div className="flex flex-col gap-[14px] flex-1">
                <InputField
                    {...register("document_number")}
                    message={
                        errors?.document_number
                            ? {
                                  text: errors.document_number.message!,
                                  type: "danger",
                              }
                            : undefined
                    }
                    label="Document Number"
                    placeholder="Document Number"
                    type="text"
                    required
                    right
                    disabled
                    className="w-full gap-2"
                    onKeyDown={handleInputKeyDown}
                />
                <InputField
                    {...register("document_date")}
                    message={
                        errors?.document_date
                            ? {
                                  text: errors.document_date.message!,
                                  type: "danger",
                              }
                            : undefined
                    }
                    label="Date"
                    placeholder="Select Date"
                    type="date"
                    right
                    required
                    disabled={disableAll}
                    className="w-full gap-2"
                    onKeyDown={handleInputKeyDown}
                />

                <InputField
                    {...register("department")}
                    message={
                        errors?.department
                            ? {
                                  text: errors.department.message!,
                                  type: "danger",
                              }
                            : undefined
                    }
                    label="Department"
                    placeholder="Department"
                    right
                    required
                    type="text"
                    disabled={disableAll}
                    className="w-full gap-2"
                    onKeyDown={handleInputKeyDown}
                />
                <Combobox
                    label="Warehouse"
                    placeholder="Select Warehouse"
                    required
                    queryKey={[GET_WAREHOUSE]}
                    queryFn={getWarehouse}
                    dataLabel="warehouse_name"
                    dataValue="warehouse_code"
                    message={
                        errors?.warehouse_name
                            ? {
                                  text: errors.warehouse_name.message!,
                                  type: "danger",
                              }
                            : undefined
                    }
                    value={{
                        label: watch("warehouse_name"),
                        value: watch("warehouse_code"),
                    }}
                    onChange={(val) => {
                        if (!disableAll && setValue) {
                            setValue("warehouse_name", val.label);
                            setValue("warehouse_code", val.value);
                        }
                        if (setError) {
                            setError("warehouse_code", { type: "disabled" });
                        }
                    }}
                    disabled={disableAll || type === "edit"}
                />
                <Combobox
                    label="Vendor"
                    placeholder="Select Vendor"
                    required
                    queryKey={[GET_VENDOR]}
                    queryFn={getVendor}
                    dataLabel="vendor_name"
                    dataValue="vendor_code"
                    message={
                        errors?.vendor_name
                            ? {
                                  text: errors.vendor_name.message!,
                                  type: "danger",
                              }
                            : undefined
                    }
                    value={{
                        label: watch("vendor_name"),
                        value: watch("vendor_code"),
                    }}
                    onChange={(val) => {
                        if (!disableAll && setValue) {
                            setValue("vendor_name", val.label);
                            setValue("vendor_code", val.value);
                        }
                        if (setError) {
                            setError("vendor_code", { type: "disabled" });
                        }
                    }}
                    disabled={disableAll || type === "edit"}
                />
            </div>
            <div className="flex flex-col gap-[14px] flex-1 h-full justify-between">
                <Combobox
                    label="Site"
                    placeholder="Select Site"
                    required
                    queryKey={[GET_SITE]}
                    queryFn={getSite}
                    dataLabel="site_name"
                    dataValue="site_code"
                    message={
                        errors?.site_name
                            ? {
                                  text: errors.site_name.message!,
                                  type: "danger",
                              }
                            : undefined
                    }
                    value={{
                        label: watch("site_name"),
                        value: watch("site_code"),
                    }}
                    onChange={(val) => {
                        if (!disableAll && setValue) {
                            setValue("site_name", val.label);
                            setValue("site_code", val.value);
                        }
                        if (setError) {
                            setError("site_code", { type: "disabled" });
                        }
                    }}
                    disabled={disableAll || type === "edit"}
                />
                <InputField
                    {...register("term_of_payment")}
                    message={
                        errors?.term_of_payment
                            ? {
                                  text: errors.term_of_payment.message!,
                                  type: "danger",
                              }
                            : undefined
                    }
                    label="Term of Payment"
                    placeholder="Term of Payment"
                    right
                    required
                    type="text"
                    disabled={disableAll}
                    className="w-full gap-2"
                    onKeyDown={handleInputKeyDown}
                />
                <Combobox
                    label="Currency"
                    required
                    placeholder="Select Currency"
                    queryKey={[GET_CURRENCY]}
                    queryFn={getCurrency}
                    dataLabel="currency_name"
                    dataValue="currency_code"
                    message={
                        errors?.currency_name
                            ? {
                                  text: errors.currency_name.message!,
                                  type: "danger",
                              }
                            : undefined
                    }
                    value={{
                        label: watch("currency_name"),
                        value: watch("currency_code"),
                    }}
                    onChange={(val) => {
                        if (!disableAll && setValue) {
                            setValue("currency_name", val.label);
                            setValue("currency_code", val.value);
                        }
                        if (setError) {
                            setError("currency_code", { type: "disabled" });
                        }
                    }}
                    disabled={disableAll || type === "edit"}
                />
                <Combobox
                    label="Tax"
                    placeholder="Select Tax"
                    required
                    queryKey={[GET_TAX]}
                    queryFn={getTax}
                    dataLabel="tax_name"
                    dataValue="tax_code"
                    message={
                        errors?.tax_name
                            ? {
                                  text: errors.tax_name.message!,
                                  type: "danger",
                              }
                            : undefined
                    }
                    value={{
                        label: watch("tax_name"),
                        value: watch("tax_code"),
                    }}
                    onChange={(val) => {
                        if (!disableAll && setValue) {
                            setValue("tax_name", val.label);
                            setValue("tax_code", val.value);
                        }
                        if (setError) {
                            setError("tax_code", { type: "disabled" });
                        }
                    }}
                    disabled={disableAll || type === "edit"}
                />
                <InputField
                    {...register("remark")}
                    message={
                        errors?.remark
                            ? { text: errors.remark.message!, type: "danger" }
                            : undefined
                    }
                    label="Remark"
                    placeholder="Remark"
                    type="text"
                    right
                    textarea
                    disabled={disableAll}
                    className="w-full gap-2"
                    onKeyDown={handleInputKeyDown}
                />
            </div>
        </CardContent>
    </Card>
);

export default DirectPurchaseReceiveHeaderForm;
