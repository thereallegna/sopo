import React, { useMemo, useState } from "react";
import { Card, CardContent } from "@components/ui/Card";
import TableForm from "@components/shared/TableForm";
import { FieldPath } from "react-hook-form";
import { GET_INITIAL_STOCK } from "@constants/queryKey";
// import { convertStockMutationForm } from '@utils/converter';
import { getInitialStock } from "@services/fetcher/transaction/inventory-material-management/inventory-management";
import { GenerateColumnsOption } from "../../../../../../../types/client/table";
import { FormType } from "../../../../../../../types/form";

const MutateFromForm = ({
    errors,
    watch,
    setValue,
    setError,
    type = "add",
    handleInputKeyDown,
    disableAll,
}: FormType<StockMutationFormBody> & { type?: "add" | "edit" | "detail" }) => {
    const [showModal, setShowModal] = useState<boolean>(false);

    const columns = useMemo(() => {
        const mutateFromColumn: GenerateColumnsOption = {
            key: "mutated_from",
            columns: [
                {
                    accessor: "item_name",
                    header: "Name",
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
                        onKeyDown: handleInputKeyDown,
                        disabled: type === "detail" || disableAll,
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
                {
                    accessor: "currency",
                    header: "Currency",
                    type: "input",
                    inputProps: {
                        disabled: true,
                    },
                },
                {
                    accessor: "unit_price",
                    header: "Unit Price",
                    type: "input",
                    inputProps: {
                        disabled: true,
                    },
                },
            ],
            hasAction: false,
        };

        return mutateFromColumn;
    }, [handleInputKeyDown]);

    return (
        <Card size="drawer" className="border border-Neutral-200 shadow-none">
            <CardContent className="flex-wrap flex flex-row gap-6 items-center w-full">
                <TableForm
                    title="Mutate From"
                    errors={errors}
                    data={watch("mutated_from")}
                    columns={columns}
                    disableAll={type === "detail"}
                    onChangeData={(
                        rowIndex: number,
                        columnId: string,
                        value: string
                    ) => {
                        const prevData = watch("mutated_from");
                        prevData[rowIndex] = {
                            ...prevData[rowIndex],
                            [columnId]: value,
                        };
                        setValue?.("mutated_from", prevData);
                        if (setError) {
                            setError(
                                `mutated_from.${rowIndex}.${columnId}` as FieldPath<StockMutationFormBody>,
                                { type: "disabled" }
                            );
                        }
                    }}
                    onShowGetDataModal={() => {
                        if (watch("warehouse_code")) {
                            setShowModal(true);
                        }
                    }}
                    onDeleteRow={(index) => {
                        const data = watch("mutated_from");
                        if (index >= 0) {
                            const filteredData = data.filter(
                                (_, idx) => idx !== Number(index)
                            );
                            setValue?.("mutated_from", filteredData);
                        }
                    }}
                    getDataButtonProps={{
                        disabled: !watch("warehouse_code"),
                        variant: !watch("warehouse_code")
                            ? "disabled"
                            : undefined,
                    }}
                    getDataModalProps={{
                        isOpen: showModal,
                        title: "Select Initial Stock",
                        queryKey: GET_INITIAL_STOCK,
                        queryFn: getInitialStock,
                        onClose: (val) => setShowModal(val),
                        // pinnedColumns: ['selected', 'number', 'document_number'],
                        columns: {
                            columns: [
                                {
                                    accessor: "selected",
                                    header: "#",
                                    type: "checkbox",
                                    size: 50,
                                },
                                {
                                    accessor: "document_number",
                                    header: "Document",
                                },
                                {
                                    accessor: "document_date",
                                    header: "Date",
                                },
                                {
                                    accessor: "warehouse_name",
                                    header: "Warehouse",
                                },
                            ],
                            hasAction: false,
                        },
                        multipleSelect: true,
                        idSelected: "selected",
                        targetIdSelector: "document_number",
                        valueSelected: watch("mutated_from")?.map(
                            (item) => item.document_number
                        ),
                        onSelectRow: (data: any) => {
                            if (setValue) {
                                // Fetch Detail Initial Stock

                                const convertData = data;
                                const prevData = watch("mutated_from") || []; // Default ke array kosong jika undefined
                                const itemExists = prevData.some(
                                    (item) =>
                                        item.document_number ===
                                        convertData.document_number
                                );
                                let updatedData;
                                if (itemExists) {
                                    updatedData = prevData.filter(
                                        (item) =>
                                            item.document_number !==
                                            convertData.document_number
                                    );
                                } else {
                                    updatedData = [...prevData, convertData];
                                }
                                setValue("mutated_from", updatedData);
                            }
                        },
                    }}
                />
            </CardContent>
        </Card>
    );
};

export default MutateFromForm;
