import React from "react";
import InputField from "@components/shared/InputField";
import { Card, CardContent } from "@components/ui/Card";
import { Checkbox } from "@components/ui/Checkbox";
import Label from "@components/ui/Label";
import Combobox from "@components/shared/Combobox";
import { GET_WAREHOUSE } from "@constants/queryKey";
import { getWarehouse } from "@services/fetcher/configuration/inventory-management";
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
                        }
                        if (setError) {
                            setError("warehouse_code", { type: "disabled" });
                        }
                    }}
                    disabled={disableAll || type === "edit"}
                />
                <div className="flex items-center gap-2">
                    <Label className="shrink-0 w-[100px] font-semibold">
                        Cancel
                    </Label>
                    <Checkbox
                        label="Inventory Item"
                        checked={watch("cancel")}
                        onCheckedChange={(val) =>
                            setValue && setValue("cancel", val)
                        }
                        disabled={disableAll} // Disabled berdasarkan disableAll
                    />
                </div>
            </div>
            <div className="flex flex-col gap-[14px] flex-1">
                <InputField
                    {...register("reason_for_cancellation")}
                    message={
                        errors?.reason_for_cancellation
                            ? {
                                  text: errors.reason_for_cancellation.message!,
                                  type: "danger",
                              }
                            : undefined
                    }
                    label="Reason for Cancellation"
                    placeholder="Reason for Cancellation"
                    type="text"
                    right
                    disabled={disableAll} // Disabled berdasarkan disableAll
                    className="w-full gap-2"
                    onKeyDown={handleInputKeyDown}
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
                    disabled={disableAll} // Disabled berdasarkan disableAll
                    className="w-full gap-2"
                    onKeyDown={handleInputKeyDown}
                />
            </div>
        </CardContent>
    </Card>
);

export default BasicForm;
