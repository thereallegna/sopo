import React from "react";
import InputField from "@components/shared/InputField";
import { Card, CardContent } from "@components/ui/Card";
import Combobox from "@components/shared/Combobox";
import { getWarehouse } from "@services/fetcher/configuration/inventory-management";
import { GET_CURRENCY, GET_WAREHOUSE } from "@constants/queryKey";
import { getCurrency } from "@services/fetcher/configuration/financial-management";
import { parse, format, isValid } from "date-fns";
import { FormType } from "../../../../../../../types/form";

const InitialStockHeaderForm = ({
    setError,
    errors,
    watch,
    register,
    setValue,
    handleInputKeyDown,
    disableAll,
    type = "add",
}: FormType<InitialStockFormBody> & {
    type?: "add" | "edit";
}) => {
    // Function to convert date format for display
    const convertDateForDisplay = (dateValue: string | undefined) => {
        if (!dateValue) return "";

        try {
            const dateStr = dateValue.toString();

            // Check if date is in YYYYMMDD format (e.g., "20250605")
            if (/^\d{8}$/.test(dateStr)) {
                const year = dateStr.substring(0, 4);
                const month = dateStr.substring(4, 6);
                const day = dateStr.substring(6, 8);
                return `${year}-${month}-${day}`;
            }
            // Check if date is in dd/MMM/yyyy format (e.g., "21/Jan/2025")
            if (/^\d{2}\/\w{3}\/\d{4}$/.test(dateStr)) {
                const parsedDate = parse(dateStr, "dd/MMM/yyyy", new Date());
                if (isValid(parsedDate)) {
                    return format(parsedDate, "yyyy-MM-dd");
                }
            }
            // Check if date is in YYYY-MM-DD format (already correct)
            else if (/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) {
                return dateStr;
            }

            return dateStr;
        } catch (error) {
            console.error("Error converting date for display:", error);
            return "";
        }
    };

    // Handle date change
    const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (setValue) {
            setValue("document_date", e.target.value);
        }
    };

    return (
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
                        placeholder="Enter document number"
                        type="text"
                        required
                        right
                        disabled
                        className="w-full gap-2"
                        onKeyDown={handleInputKeyDown}
                    />
                    <InputField
                        {...register("document_date")}
                        value={convertDateForDisplay(watch("document_date"))}
                        onChange={handleDateChange}
                        message={
                            errors?.document_date
                                ? {
                                      text: errors.document_date.message!,
                                      type: "danger",
                                  }
                                : undefined
                        }
                        label="Date"
                        placeholder="Date"
                        type="date"
                        right
                        required
                        disabled={disableAll} // Disabled berdasarkan disableAll
                        className="w-full gap-2"
                        onKeyDown={handleInputKeyDown}
                    />
                </div>
                <div className="flex flex-col gap-[14px] flex-1 h-full justify-between">
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
                                setError("warehouse_code", {
                                    type: "disabled",
                                });
                            }
                        }}
                        disabled={disableAll || type === "edit"}
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
                </div>
                <div className="flex flex-col gap-[14px] flex-1 h-full justify-between">
                    <InputField
                        {...register("rate", { valueAsNumber: true })}
                        message={
                            errors?.rate
                                ? { text: errors.rate.message!, type: "danger" }
                                : undefined
                        }
                        label="Rate"
                        placeholder="Enter rate"
                        type="number"
                        right
                        required
                        disabled={disableAll}
                        className="w-full gap-2"
                        onKeyDown={handleInputKeyDown}
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
};

export default InitialStockHeaderForm;
