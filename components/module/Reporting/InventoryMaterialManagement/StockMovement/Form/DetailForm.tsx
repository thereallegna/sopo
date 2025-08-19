import React from "react";
import { Card, CardContent } from "@components/ui/Card";
import { GET_STOCK_MOVEMENT } from "@constants/queryKey";
import TableContent from "@components/shared/TableContent";
import { getStockMovement } from "@services/fetcher/reporting/inventory-material-management";
import useTable from "@hooks/useTable";
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
            accessor: "stock_actual",
            header: "Stock Actual",
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

    return (
        <Card
            size="drawer"
            className="w-full border border-Neutral-200 shadow-none"
        >
            <CardContent className="flex flex-col gap-2 w-full h-full">
                <TableContent
                    {...tableProps}
                    showPrint={false}
                    showExport={false}
                />
            </CardContent>
        </Card>
    );
};

export default StockMovementDetailForm;
