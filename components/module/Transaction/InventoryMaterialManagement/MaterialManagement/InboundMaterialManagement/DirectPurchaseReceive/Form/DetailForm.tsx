import React, { useMemo, useState } from "react";
import { Card, CardContent } from "@components/ui/Card";
import TableForm from "@components/shared/TableForm";
import { GET_MASTER_ITEM_MATERIAL_MANAGEMENT } from "@constants/queryKey";
import { getItem } from "@services/fetcher/configuration/inventory-management";
import { convertDirectPurchaseReceiveForm } from "@utils/converter";
import { FieldPath } from "react-hook-form";
import { GenerateColumnsOption } from "../../../../../../../../types/client/table";
import { FormType } from "../../../../../../../../types/form";
// import { convertInitialStockForm } from '@utils/converter';

const DirectPurchaseReceiveDetailForm = ({
    errors,
    watch,
    setValue,
    setError,
    handleInputKeyDown,
    disableAll,
    formType = "add",
}: // setError,
// disableAll,
// type = 'add'
FormType<DirectPurchaseReceiveFormBody> & {
    formType?: "add" | "edit" | "detail";
}) => {
    const [showModal, setShowModal] = useState<boolean>(false);
    const columns = useMemo((): GenerateColumnsOption => {
        const options: GenerateColumnsOption = {
            columns: [
                {
                    accessor: "item_code",
                    header: "Item's Code",
                    type: "input",
                    inputProps: {
                        disabled: true,
                    },
                },
                {
                    accessor: "item_name",
                    header: "Item's Name",
                    type: "input",
                    inputProps: {
                        disabled: true,
                    },
                },
                {
                    accessor: "local_code",
                    header: "Local Code",
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
                    accessor: "uom_name",
                    header: "UOM",
                    type: "input",
                    inputProps: {
                        disabled: true,
                    },
                },
                {
                    accessor: "price",
                    header: "Unit Price",
                    type: "input",
                    inputProps: {
                        type: "number",
                        disabled: formType !== "add",
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

    // const total = useMemo(() => {
    //     const details = watch("details");
    //     if (details && Array.isArray(details)) {
    //         return details
    //             .map((detail) => Number(detail?.quantity) || 0)
    //             .reduce((accumulator, currentValue) => (accumulator || 0) + (currentValue || 0), 0);
    //     }
    //     return 0;
    // }, [watch("details")]);

    const total = useMemo(() => {
        const details = watch("details");
        if (details) {
            return watch("details")
                .map((detail) => Number(detail.quantity) || 0)
                .reduce(
                    (accumulator, currentValue) =>
                        (accumulator || 0) + (currentValue || 0),
                    0
                );
        }
        return 0;
    }, [watch("details")]);

    return (
        <Card size="drawer" className="border border-Neutral-200 shadow-none">
            <CardContent className="flex-wrap flex flex-row gap-6 items-center w-full">
                <TableForm
                    title="Detail Item"
                    data={watch("details") || []}
                    columns={columns}
                    errors={errors}
                    disableAll={disableAll}
                    showButtonDeleteRow={formType === "add"}
                    showButtonDataModal={formType === "add"}
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
                                `details.${rowIndex}.${columnId}` as FieldPath<DirectPurchaseReceiveFormBody>,
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
                                `details.${rowIndex}.${columnId}` as FieldPath<DirectPurchaseReceiveFormBody>,
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
                    onShowGetDataModal={() => setShowModal(true)}
                    getDataModalProps={{
                        isOpen: showModal,
                        title: "Select Item",
                        queryKey: GET_MASTER_ITEM_MATERIAL_MANAGEMENT,
                        queryFn: getItem,
                        onClose: (val) => setShowModal(val),
                        // pinnedColumns:
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
                                    accessor: "local_code",
                                    header: "Local Code",
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
                                const convertData =
                                    convertDirectPurchaseReceiveForm(
                                        data as MasterItemFormBody
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
                    total={`${total} Quantity`}
                />
            </CardContent>
        </Card>
    );
};

export default DirectPurchaseReceiveDetailForm;
