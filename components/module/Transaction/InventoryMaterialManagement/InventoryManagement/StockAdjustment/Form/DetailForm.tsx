import React, { useMemo, useState, useEffect } from "react";
import { Card, CardContent } from "@components/ui/Card";
import TableForm from "@components/shared/TableForm";
import { GET_DETAIL_BY_WAREHOUSE_STOCK_ADJUSTMENT } from "@constants/queryKey";
import { convertStockAdjustmentForm } from "@utils/converter";
import { FieldPath } from "react-hook-form";
import { getItemStockAdjustment } from "@services/fetcher/transaction/inventory-material-management/inventory-management";
import { GenerateColumnsOption } from "../../../../../../../types/client/table";
import { FormType } from "../../../../../../../types/form";

const StockAdjustmentDetailForm = ({
    errors,
    watch,
    setValue,
    setError,
    handleInputKeyDown,
    disableAll,
    formType = "add",
}: FormType<StockAdjustmentFormBody> & {
    formType?: "add" | "edit" | "detail";
}) => {
    const [showModal, setShowModal] = useState<boolean>(false);
    const [isWarehouseEmpty, setIsWarehouseEmpty] = useState<boolean>(true);

    // Tambahkan useEffect untuk menutup modal saat formType bukan add
    useEffect(() => {
        if (formType !== "add") {
            setShowModal(false);
        }
    }, [formType]);

    // Tambahkan useEffect untuk warehouse
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
                    accessor: "stock_system",
                    header: "Stock System",
                    type: "input",
                    inputProps: {
                        disabled: true,
                    },
                },
                {
                    accessor: "stock_actual",
                    header: "Stock Actual",
                    type: "input",
                    inputProps: {
                        disabled: formType !== "add",
                    },
                },
                {
                    accessor: "balance",
                    header: "Balance",
                    type: "input",
                    inputProps: (rowIndex) => ({
                        value:
                            watch(`details.${rowIndex}.stock_actual`) -
                            watch(`details.${rowIndex}.stock_system`),
                        disabled: true,
                    }),
                },
                {
                    accessor: "uom_name",
                    header: "UOM",
                    type: "input",
                    inputProps: {
                        disabled: true,
                    },
                },
                {
                    accessor: "specification",
                    header: "Specification",
                    type: "input",
                    inputProps: {
                        disabled: true,
                    },
                },
            ],
            hasAction: false,
        };

        if (formType !== "add") {
            options.columns = [
                {
                    accessor: "cancel",
                    header: "Cancel",
                    type: "checkbox",
                },
                ...options.columns,
            ];
        }

        return options;
    }, [handleInputKeyDown]);

    const total = useMemo(() => {
        const details = watch("details");
        if (details) {
            return watch("details")
                .map((detail) => detail.stock_actual - detail.stock_system)
                .reduce(
                    (accumulator, currentValue) => accumulator + currentValue,
                    0
                );
        }
        return 0;
    }, [watch("details")]);

    return (
        <Card size="drawer" className="border border-Neutral-200 shadow-none">
            <CardContent className="flex-wrap flex flex-row gap-6 items-center w-full">
                <TableForm
                    title="Detail"
                    data={watch("details") || []}
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
                        const prevData = watch("details");
                        let data: string | number = value;
                        if (type === "number") {
                            data = Number(data);
                        }
                        prevData[rowIndex] = {
                            ...prevData[rowIndex],
                            [columnId]: data,
                        };
                        setValue?.("details", prevData);
                        if (setError) {
                            setError(
                                `details.${rowIndex}.${columnId}` as FieldPath<StockAdjustmentFormBody>,
                                { type: "disabled" }
                            );
                        }
                    }}
                    onCheckedChange={(
                        rowIndex: number,
                        columnId: string,
                        value: boolean
                    ) => {
                        const prevData = watch("details");
                        prevData[rowIndex] = {
                            ...prevData[rowIndex],
                            [columnId]: value,
                        };
                        setValue?.("details", prevData);
                        if (setError) {
                            setError(
                                `details.${rowIndex}.${columnId}` as FieldPath<StockAdjustmentFormBody>,
                                { type: "disabled" }
                            );
                        }
                    }}
                    onDeleteRow={(index) => {
                        const data = watch("details");
                        if (index >= 0) {
                            const filteredData = data.filter(
                                (_, idx) => idx !== Number(index)
                            );
                            setValue?.("details", filteredData);
                        }
                    }}
                    // onShowGetDataModal={() => setShowModal(true)}
                    getDataModalProps={{
                        isOpen:
                            formType === "add" &&
                            showModal &&
                            !isWarehouseEmpty,
                        title: "Select Item",
                        queryKey: GET_DETAIL_BY_WAREHOUSE_STOCK_ADJUSTMENT,
                        queryFn: (params) => {
                            const warehouseCode = watch("warehouse_code");
                            if (formType === "add" && warehouseCode) {
                                return getItemStockAdjustment({
                                    ...params,
                                    query: {
                                        ...params?.query,
                                        warehouse_code: warehouseCode,
                                    },
                                });
                            }
                            // Jangan kirim request jika warehouse_code kosong
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
                        valueSelected: watch("details")?.map(
                            (item) => item.item_code
                        ),
                        onSelectRow: (data: any) => {
                            if (setValue) {
                                const convertData = convertStockAdjustmentForm(
                                    data as TransactionItem
                                );
                                const prevData = watch("details") || [];
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
                                setValue("details", updatedData);
                            }
                        },
                    }}
                    total={`${total}`}
                />
            </CardContent>
        </Card>
    );
};

export default StockAdjustmentDetailForm;
