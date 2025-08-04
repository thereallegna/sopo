import React from "react";
import { Card, CardContent } from "@components/ui/Card";
import TableContent from "@components/shared/TableContent";
import useTable from "@hooks/useTable";
import { getStockMovement } from "@services/fetcher/reporting/inventory-material-management";
import { GET_STOCK_MOVEMENT } from "@constants/queryKey";
import PrintButton from "@components/ui/Table/Action/PrintButton";
import { GenerateColumnsOption } from "../../../../../../types/client/table";

const detailFormColumn: GenerateColumnsOption = {
    columns: [
        {
            accessor: "number",
            header: "#",
        },
        {
            accessor: "doc_type",
            header: "Type",
        },
        {
            accessor: "doc_no",
            header: "Document#",
        },
        {
            accessor: "doc_date",
            header: "Date",
        },
        {
            accessor: "warehouse_name",
            header: "Warehouse",
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
            accessor: "batch_no",
            header: "Batch",
        },
        {
            accessor: "source",
            header: "Source",
        },
        {
            accessor: "quantity",
            header: "Quantity",
        },
        {
            accessor: "uom_name",
            header: "UOM",
        },
        {
            accessor: "remark",
            header: "Remark",
        },
        {
            accessor: "created_by",
            header: "Created By",
        },
        {
            accessor: "item_specification",
            header: "Specification",
        },
    ],
    hasAction: false,
};

const StockMovementDetailForm = () => {
    const tableProps = useTable<any[]>({
        showSearch: false,
        queryFn: getStockMovement,
        columns: detailFormColumn,
        queryKey: GET_STOCK_MOVEMENT,
    });

    // Kolom yang ingin di-print khusus Stock Movement
    const printKeys = [
        "number",
        "doc_type",
        "doc_no",
        "warehouse_name",
        "item_name",
        "batch_no",
        "quantity",
    ];
    const printColumns = detailFormColumn.columns.filter((col) =>
        printKeys.includes(col.accessor)
    );
    const printData = tableProps.data?.results ?? [];

    // return (
    //     <Card
    //         size="drawer"
    //         className="w-full border border-Neutral-200 shadow-none overflow-hidden"
    //     >
    //         <CardContent className="flex-wrap flex flex-col gap-2 items-center w-full">
    //             <div className="flex flex-row items-start gap-2 w-full">
    //                 <div className="flex-1 overflow-x-auto">
    //                     <TableContent {...tableProps} showPrint={false}/>
    //                 </div>
    //                 <div className="flex flex-row gap-2 min-w-fit">
    //                     <PrintButton data={printData} columns={printColumns} />
    //                 </div>
    //             </div>
    //         </CardContent>
    //     </Card>
    // );
    return (
        <Card
            size="drawer"
            className="w-full border border-Neutral-200 shadow-none overflow-hidden"
        >
            <CardContent className="flex flex-col gap-2 w-full h-full">
                <div className="flex flex-row gap-2 w-full h-full items-stretch">
                    {/* TableContent akan mengisi semua lebar dan tinggi */}
                    <div className="flex-1 overflow-x-auto h-full">
                        <TableContent {...tableProps} showPrint={false} />
                    </div>

                    {/* PrintButton akan menyesuaikan tinggi dengan parent */}
                    <div className="flex flex-col justify-start gap-2 min-w-fit h-full">
                        <PrintButton data={printData} columns={printColumns} />
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

export default StockMovementDetailForm;
