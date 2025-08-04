import React, { useMemo, useState, useEffect } from "react";
import { Card, CardContent } from "@components/ui/Card";
import TableForm from "@components/shared/TableForm";
import { FieldPath } from "react-hook-form";
import { GET_DETAIL_BY_WAREHOUSE_STOCK_MUTATION } from "@constants/queryKey";
import { getItemStockMutation } from "@services/fetcher/transaction/inventory-material-management/inventory-management";
import { convertStockMutationFromForm } from "@utils/converter";
import { GenerateColumnsOption } from "../../../../../../../types/client/table";
import { FormType } from "../../../../../../../types/form";

const MutateFromForm = ({
    errors,
    watch,
    setValue,
    setError,
    handleInputKeyDown,
    disableAll,
    formType = "add",
}: FormType<StockMutationFormBody> & {
    formType?: "add" | "edit" | "detail";
}) => {
    const [showModal, setShowModal] = useState<boolean>(false);
    const [isWarehouseEmpty, setIsWarehouseEmpty] = useState<boolean>(true);

    useEffect(() => {
        if (formType !== "add") {
            setShowModal(false);
        }
    }, [formType]);

    useEffect(() => {
        const warehouseCode = watch("warehouse_code");
        setIsWarehouseEmpty(!warehouseCode);
    }, [watch("warehouse_code")]);

    const columns = useMemo((): GenerateColumnsOption => {
        const options: GenerateColumnsOption = {
            columns: [
                {
                    accessor: "item_name",
                    header: "Item's Name",
                    type: "input",
                    inputProps: {
                        disabled: true,
                    },
                },
                {
                    accessor: "batch",
                    header: "Batch",
                    type: "input",
                    inputProps: {
                        disabled: true,
                    },
                },
                {
                    accessor: "stock",
                    header: "Stock",
                    type: "input",
                    inputProps: {
                        disabled: true,
                    },
                },
                {
                    accessor: "quantity",
                    header: "Quantity",
                    type: "input",
                    inputProps: {
                        type: "number",
                        disabled: formType !== "add",
                    },
                },
                {
                    accessor: "uom",
                    header: "UoM",
                    type: "input",
                    inputProps: {
                        disabled: true,
                    },
                },
            ],
            hasAction: formType === "add",
        };

        return options;
    }, [handleInputKeyDown]);

    const total = useMemo(() => {
        const details = watch("from_array");
        if (details) {
            return watch("from_array")
                .map((detail) => Number(detail.quantity))
                .reduce(
                    (accumulator, currentValue) => accumulator + currentValue,
                    0
                );
        }
        return 0;
    }, [watch]);

    useEffect(() => {
        const fromArray = watch("from_array");
        console.log("MutateFromForm data:", fromArray);
    }, [watch]);

    return (
        <Card size="drawer" className="border border-Neutral-200 shadow-none">
            <CardContent className="flex-wrap flex flex-row gap-6 items-center w-full">
                <TableForm
                    title="Mutate From"
                    data={watch("from_array") || []}
                    columns={columns}
                    errors={errors}
                    disableAll={disableAll}
                    showButtonDeleteRow={formType === "add"}
                    showButtonDataModal={formType === "add"}
                    getDataButtonProps={{
                        disabled: isWarehouseEmpty || formType !== "add",
                        variant:
                            isWarehouseEmpty || formType !== "add"
                                ? "disabled"
                                : undefined,
                        title: isWarehouseEmpty
                            ? "Please select warehouse first"
                            : undefined,
                    }}
                    onShowGetDataModal={() => {
                        if (!isWarehouseEmpty && formType === "add") {
                            console.log(
                                "[MutateFromForm] Opening modal with warehouse:",
                                watch("warehouse_code")
                            );
                            setShowModal(true);
                        } else {
                            console.warn(
                                "[MutateFromForm] Cannot open modal: ",
                                {
                                    isWarehouseEmpty,
                                    formType,
                                    warehouseCode: watch("warehouse_code"),
                                }
                            );
                        }
                    }}
                    onChangeData={(rowIndex, columnId, value, type) => {
                        const prevData = watch("from_array");
                        let data: string | number = value;
                        if (type === "number") {
                            data = Number(data);
                        }
                        prevData[rowIndex] = {
                            ...prevData[rowIndex],
                            [columnId]: data,
                        };
                        setValue?.("from_array", prevData);
                        if (setError) {
                            setError(
                                `from_array.${rowIndex}.${columnId}` as FieldPath<StockMutationFormBody>,
                                { type: "daisabled" }
                            );
                        }
                    }}
                    onCheckedChange={(
                        rowIndex: number,
                        columnId: string,
                        value: boolean
                    ) => {
                        const prevData = watch("from_array");
                        prevData[rowIndex] = {
                            ...prevData[rowIndex],
                            [columnId]: value,
                        };
                        setValue?.("from_array", prevData);
                        if (setError) {
                            setError(
                                `from_array.${rowIndex}.${columnId}` as FieldPath<StockMutationFormBody>,
                                { type: "disabled" }
                            );
                        }
                    }}
                    onDeleteRow={(index) => {
                        const data = watch("from_array");
                        if (index >= 0) {
                            const filteredData = data.filter(
                                (_, idx) => idx !== Number(index)
                            );
                            setValue?.("from_array", filteredData);
                        }
                    }}
                    getDataModalProps={{
                        isOpen:
                            formType === "add" &&
                            showModal &&
                            !isWarehouseEmpty,
                        title: "Select Item",
                        queryKey: GET_DETAIL_BY_WAREHOUSE_STOCK_MUTATION,
                        queryFn: (params) => {
                            if (formType === "add") {
                                return getItemStockMutation({
                                    ...params,
                                    query: {
                                        ...params?.query,
                                        warehouse_code: watch("warehouse_code"),
                                    },
                                });
                            }
                            // Return a resolved promise or handle as needed when not "add"
                            return Promise.resolve({} as any);
                        },
                        onClose: () => {
                            if (formType === "add") {
                                setShowModal(false);
                            }
                        },
                        columns: {
                            columns: [
                                {
                                    accessor: "selected",
                                    header: "",
                                    type: "checkbox",
                                    size: 50,
                                },
                                {
                                    accessor: "item_code",
                                    header: "Item's Code",
                                },
                                {
                                    accessor: "item_name",
                                    header: "Item's Name",
                                },
                                {
                                    accessor: "batch",
                                    header: "Batch",
                                },
                                {
                                    accessor: "stock",
                                    header: "Stock",
                                },
                                {
                                    accessor: "uom_name",
                                    header: "UOM",
                                },
                            ],
                            hasAction: false,
                        },
                        multipleSelect: true,
                        idSelected: "selected",
                        targetIdSelector: "item_code",
                        valueSelected: watch("from_array")?.map(
                            (item) => item.item_code
                        ),
                        onSelectRow: (data: any) => {
                            if (setValue) {
                                const convertData =
                                    convertStockMutationFromForm(
                                        data as TransactionItem
                                    );
                                const prevData = watch("from_array") || [];
                                const itemExists = prevData.some(
                                    (item) =>
                                        item.item_code === convertData.item_code
                                );
                                let updatedData;
                                if (itemExists) {
                                    updatedData = prevData.filter(
                                        (item) =>
                                            item.item_code !==
                                            convertData.item_code
                                    );
                                } else {
                                    updatedData = [...prevData, convertData];
                                }
                                setValue("from_array", updatedData);
                            }
                        },
                    }}
                    total={`${total} Quantity`}
                />
            </CardContent>
        </Card>
    );
};

export default MutateFromForm;
