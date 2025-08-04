import React, { useMemo, useState, useEffect } from "react";
import { Card, CardContent } from "@components/ui/Card";
import TableForm from "@components/shared/TableForm";
import { GET_MASTER_ITEM_MATERIAL_MANAGEMENT } from "@constants/queryKey";
import { convertStockMutationToForm } from "@utils/converter";
import { FieldPath } from "react-hook-form";
import { getItem } from "@services/fetcher/configuration/inventory-management";
import { GenerateColumnsOption } from "../../../../../../../types/client/table";
import { FormType } from "../../../../../../../types/form";

const MutateToForm = ({
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
                        disabled: formType !== "add",
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
            hasAction: false,
        };

        return options;
    }, [handleInputKeyDown]);

    const total = useMemo(() => {
        const details = watch("to_array");
        if (details) {
            return watch("to_array")
                .map((detail) => Number(detail.quantity))
                .reduce(
                    (accumulator, currentValue) => accumulator + currentValue,
                    0
                );
        }
        return 0;
    }, [watch("to_array")]);

    useEffect(() => {
        const toArray = watch("to_array");
        console.log("MutateToForm data:", toArray);
    }, [watch]);

    return (
        <Card size="drawer" className="border border-Neutral-200 shadow-none">
            <CardContent className="flex-wrap flex flex-row gap-6 items-center w-full">
                <TableForm
                    title="Mutate To"
                    data={watch("to_array") || []}
                    columns={columns}
                    errors={errors}
                    disableAll={disableAll}
                    showButtonDeleteRow={formType === "add"}
                    showButtonDataModal={formType === "add"}
                    onChangeData={(rowIndex, columnId, value, type) => {
                        const prevData = watch("to_array");
                        let data: string | number = value;
                        if (type === "number") {
                            data = Number(data);
                        }
                        prevData[rowIndex] = {
                            ...prevData[rowIndex],
                            [columnId]: data,
                        };
                        setValue?.("to_array", prevData);
                        if (setError) {
                            setError(
                                `details.${rowIndex}.${columnId}` as FieldPath<StockMutationFormBody>,
                                { type: "disabled" }
                            );
                        }
                    }}
                    onCheckedChange={(
                        rowIndex: number,
                        columnId: string,
                        value: boolean
                    ) => {
                        const prevData = watch("to_array");
                        prevData[rowIndex] = {
                            ...prevData[rowIndex],
                            [columnId]: value,
                        };
                        setValue?.("to_array", prevData);
                        if (setError) {
                            setError(
                                `details.${rowIndex}.${columnId}` as FieldPath<StockMutationFormBody>,
                                { type: "disabled" }
                            );
                        }
                    }}
                    onDeleteRow={(index) => {
                        const data = watch("to_array");
                        if (index >= 0) {
                            const filteredData = data.filter(
                                (_, idx) => idx !== Number(index)
                            );
                            setValue?.("to_array", filteredData);
                        }
                    }}
                    onShowGetDataModal={() => setShowModal(true)}
                    getDataModalProps={{
                        isOpen: showModal,
                        title: "Select Item",
                        queryKey: GET_MASTER_ITEM_MATERIAL_MANAGEMENT,
                        queryFn: getItem,
                        onClose: (val) => setShowModal(val),
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
                                    accessor: "uom_name",
                                    header: "UOM",
                                },
                            ],
                            hasAction: false,
                        },
                        multipleSelect: true,
                        idSelected: "selected",
                        targetIdSelector: "item_code",
                        valueSelected: watch("to_array")?.map(
                            (item) => item.item_code
                        ),
                        onSelectRow: (data: any) => {
                            if (setValue) {
                                const convertData = convertStockMutationToForm(
                                    data as MasterItemFormBody
                                );
                                const prevData = watch("to_array") || [];
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
                                setValue("to_array", updatedData);
                            }
                        },
                    }}
                    total={`${total} Quantity`}
                />
            </CardContent>
        </Card>
    );
};

export default MutateToForm;
