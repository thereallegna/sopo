import React from "react";
import { GET_MASTER_ITEM_MATERIAL_MANAGEMENT } from "@constants/queryKey";
import { getItem } from "@services/fetcher/configuration/inventory-management";
import dynamic from "next/dynamic";

const TableDrawer = dynamic(
    () => import("@components/shared/Drawer/Table/TableDrawer"),
    { ssr: false }
);

export const MasterItemColumns = {
    columns: [
        {
            accessor: "number",
            header: "#",
            size: 65,
        },
        {
            accessor: "item_code",
            header: "Item Code",
        },
        {
            accessor: "item_name",
            header: "Item Name",
        },
        {
            accessor: "category_name",
            header: "Category Name",
        },
        {
            accessor: "active",
            header: "Active",
        },
        {
            accessor: "create_date",
            header: "Create Date",
        },
    ],
};

const TableMasterItem = () => (
    <TableDrawer
        title="Find Master Items"
        queryKey={GET_MASTER_ITEM_MATERIAL_MANAGEMENT}
        columns={MasterItemColumns}
        queryFn={getItem}
    />
);

export default TableMasterItem;
