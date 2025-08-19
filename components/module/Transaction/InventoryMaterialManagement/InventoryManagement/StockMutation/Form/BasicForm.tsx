import React from "react";
import InputField from "@components/shared/InputField";
import { Card, CardContent } from "@components/ui/Card";
import { Checkbox } from "@components/ui/Checkbox";
import Label from "@components/ui/Label";
import Combobox from "@components/shared/Combobox";
import {
    GET_DETAIL_BY_WAREHOUSE_STOCK_MUTATION,
    GET_WAREHOUSE,
} from "@constants/queryKey";
import { getWarehouse } from "@services/fetcher/configuration/inventory-management";
import { useTableStore } from "@stores/useTableStore";
import { parse, format, isValid } from "date-fns";
import { FormType } from "../../../../../../../types/form";

const BasicForm = ({
    setError,
    errors,
    watch,
    register,
    setValue,
    handleInputKeyDown,
    disableAll, // Pastikan properti ini diterima
    type = "add",
}: FormType<StockMutationFormBody> & {
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
            setValue("date", e.target.value);
        }
    };

    const query = useTableStore(
        (state) => state.options[GET_DETAIL_BY_WAREHOUSE_STOCK_MUTATION].query
    ) as ItemsQuery;
    const { setQuery } = useTableStore();

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
                        placeholder="Document Number"
                        type="text"
                        required
                        right
                        disabled
                        className="w-full gap-2"
                        onKeyDown={handleInputKeyDown}
                    />
                    <InputField
                        {...register("date")}
                        value={convertDateForDisplay(watch("date"))}
                        onChange={handleDateChange}
                        message={
                            errors?.date
                                ? {
                                      text: errors.date.message!,
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
                            errors?.warehouse
                                ? {
                                      text: errors.warehouse.message!,
                                      type: "danger",
                                  }
                                : undefined
                        }
                        value={{
                            label: watch("warehouse"),
                            value: watch("warehouse_code"),
                        }}
                        onChange={(val) => {
                            if (!disableAll && setValue) {
                                setValue("warehouse", val.label);
                                setValue("warehouse_code", val.value);
                                setQuery(
                                    GET_DETAIL_BY_WAREHOUSE_STOCK_MUTATION,
                                    {
                                        ...query,
                                        warehouse: val.value,
                                    }
                                );
                            }
                            if (setError) {
                                setError("warehouse_code", {
                                    type: "disabled",
                                });
                            }
                        }}
                        disabled={disableAll || type === "edit"}
                    />
                    <div className="flex items-center gap-2">
                        <Label className="shrink-0 w-[100px] font-semibold">
                            Cancel
                        </Label>
                        <Checkbox
                            checked={watch("cancel")}
                            onCheckedChange={(val) =>
                                setValue && setValue("cancel", val)
                            }
                            disabled={disableAll || type === "add"}
                        />
                    </div>
                </div>
                <div className="flex flex-col gap-[14px] flex-1">
                    <InputField
                        {...register("reason_for_cancellation")}
                        message={
                            errors?.reason_for_cancellation
                                ? {
                                      text: errors.reason_for_cancellation
                                          .message!,
                                      type: "danger",
                                  }
                                : undefined
                        }
                        label="Reason for Cancellation"
                        placeholder="Reason for Cancellation"
                        type="text"
                        right
                        disabled={disableAll || type === "add"} // Disabled berdasarkan disableAll
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
                        disabled={disableAll} // Disabled berdasarkan disableAll
                        className="w-full gap-2"
                        onKeyDown={handleInputKeyDown}
                    />
                </div>
            </CardContent>
        </Card>
    );
};
export default BasicForm;
