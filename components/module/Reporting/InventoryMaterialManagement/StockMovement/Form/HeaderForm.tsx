import React, { useEffect, useState } from "react";
import InputField from "@components/shared/InputField";
import { Card, CardContent } from "@components/ui/Card";
import Combobox, { FrameworkItem } from "@components/shared/Combobox";
import DatePickerRange from "@components/shared/DatePickerRange";
import {
    GET_WAREHOUSE,
    GET_CATEGORY_MATERIAL_MANAGEMENT,
    GET_STOCK_MOVEMENT,
} from "@constants/queryKey";
import {
    getItemCategory,
    getWarehouse,
} from "@services/fetcher/configuration/inventory-management";
import { useTableStore } from "@stores/useTableStore";
import MultiSelectCombobox from "@components/shared/Combobox/MultiSelect";

const StockMovementHeaderForm = () => {
    const query = useTableStore(
        (state) => state.options[GET_STOCK_MOVEMENT].query
    ) as StockMovementFilterQuery;
    const { setQuery } = useTableStore();

    const [warehouses, setWarehouses] = useState<FrameworkItem[]>([]);

    const handleAddFilter = (
        key: keyof StockMovementFilterQuery,
        val: string
    ) => {
        setQuery(GET_STOCK_MOVEMENT, {
            ...query,
            [key]: val,
        });
    };

    useEffect(() => {
        console.log(query);
    }, [query]);

    return (
        <Card size="drawer" className="border border-Neutral-200 shadow-none">
            <CardContent className="flex-wrap flex flex-row gap-6">
                <div className="flex flex-col gap-[14px] flex-1">
                    <DatePickerRange
                        label="Select Date"
                        placeholder="Select Date"
                        right
                        onChange={(date) => {
                            if (date) {
                                setQuery(GET_STOCK_MOVEMENT, {
                                    ...query,
                                    date_start: date.from
                                        ?.toISOString()
                                        .split("T")[0],
                                    date_end: date.to
                                        ?.toISOString()
                                        .split("T")[0],
                                });
                            }
                        }}
                    />
                    <MultiSelectCombobox
                        label="Multi Warehosue"
                        placeholder="Select Warehouse"
                        queryKey={[GET_WAREHOUSE]}
                        queryFn={getWarehouse}
                        dataLabel="warehouse_name"
                        dataValue="warehouse_code"
                        value={warehouses}
                        onChange={(val) => {
                            setWarehouses(val);
                            handleAddFilter(
                                "warehouse",
                                JSON.stringify(val.map((item) => item.value))
                            );
                        }}
                    />
                </div>
                <div className="flex flex-col gap-[14px] flex-1 h-full">
                    <Combobox
                        label="Type"
                        placeholder="Select Type"
                        data={[
                            {
                                label: "Initial Stock",
                                value: "Initial Stock",
                            },
                            {
                                label: "Stock Adjustment",
                                value: "Stock Adjustment",
                            },
                            {
                                label: "Stock Mutation",
                                value: "Stock Movement",
                            },
                        ]}
                        dataLabel="label"
                        dataValue="value"
                        value={
                            query?.doc_type && query?.type_name
                                ? {
                                      label: query.type_name,
                                      value: query.doc_type,
                                  }
                                : undefined
                        }
                        onChange={(val) => {
                            if (query.doc_type !== val.value) {
                                setQuery(GET_STOCK_MOVEMENT, {
                                    ...query,
                                    doc_type: val.value,
                                    type_name: val.label,
                                });
                            } else {
                                setQuery(GET_STOCK_MOVEMENT, {
                                    ...query,
                                    doc_type: undefined,
                                    type_name: undefined,
                                });
                            }
                        }}
                    />
                    <Combobox
                        label="Item's Category"
                        placeholder="Select Item's Category"
                        queryKey={[GET_CATEGORY_MATERIAL_MANAGEMENT]}
                        queryFn={getItemCategory}
                        dataLabel="item_category_name"
                        dataValue="item_category_code"
                        value={
                            query?.item_category && query?.item_category_name
                                ? {
                                      label: query.item_category_name,
                                      value: query.item_category,
                                  }
                                : undefined
                        }
                        onChange={(val) => {
                            if (
                                !query.item_category ||
                                query.item_category !== val.value
                            ) {
                                setQuery(GET_STOCK_MOVEMENT, {
                                    ...query,
                                    item_category: val.value,
                                    item_category_name: val.label,
                                });
                            } else {
                                setQuery(GET_STOCK_MOVEMENT, {
                                    ...query,
                                    item_category: undefined,
                                    item_category_name: undefined,
                                });
                            }
                        }}
                    />
                </div>
                <div className="flex flex-col gap-[14px] flex-1 h-full">
                    <InputField
                        label="Item's Code"
                        placeholder="Enter Item's Code"
                        type="text"
                        right
                        className="w-full gap-2"
                        onChange={(e) => {
                            handleAddFilter("item_code", e.target.value);
                        }}
                    />
                    <InputField
                        label="Item's Name"
                        placeholder="Enter Item's Name"
                        type="text"
                        right
                        className="w-full gap-2"
                        onChange={(e) => {
                            handleAddFilter("item_name", e.target.value);
                        }}
                    />
                </div>
                <div className="flex flex-col gap-[14px] flex-1 h-full">
                    <InputField
                        label="Batch"
                        placeholder="Enter Batch"
                        type="text"
                        right
                        className="w-full gap-2"
                        onChange={(e) => {
                            handleAddFilter("batch", e.target.value);
                        }}
                    />
                </div>
            </CardContent>
        </Card>
    );
};

export default StockMovementHeaderForm;
