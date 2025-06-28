"use client";

import React from "react";
import Content from "@components/module/Content";
import HeaderContent from "@components/module/Content/HeaderContent";
import BodyContent from "@components/module/Content/BodyContent";
import Image from "next/image";
import { useDrawerStore } from "@stores/useDrawerStore";
import { GET_STOCK_MUTATION } from "@constants/queryKey";
import dynamic from "next/dynamic";
import { getStockMutation } from "@services/fetcher/transaction/inventory-material-management/inventory-management";

const TableDrawer = dynamic(
    () => import("@components/shared/Drawer/Table/TableDrawer"),
    { ssr: false }
);
const CreateStockMutation = dynamic(
    () =>
        import(
            "@components/module/Transaction/InventoryMaterialManagement/InventoryManagement/StockMutation/Create"
        ),
    { ssr: false }
);
const DetailStockMutation = dynamic(
    () =>
        import(
            "@components/module/Transaction/InventoryMaterialManagement/InventoryManagement/StockMutation/Detail"
        ),
    { ssr: false }
);
const EditStockMutation = dynamic(
    () =>
        import(
            "@components/module/Transaction/InventoryMaterialManagement/InventoryManagement/StockMutation/Edit"
        ),
    { ssr: false }
);

const StockMutation = () => {
    const { openTableDrawer, closeFilterDrawer, openDrawer } = useDrawerStore();

    const handleOpenAdd = () => {
        openDrawer();
    };

    const handleOpenTable = () => {
        closeFilterDrawer();
        openTableDrawer();
    };

    return (
        <>
            <Content>
                <HeaderContent title="Stock Mutation" onAdd={handleOpenAdd} />
                <BodyContent>
                    <div className="flex flex-col justify-center items-center h-full min-h-[400px] py-2">
                        <Image
                            src="/images/api-empty-state.png"
                            alt="api-empty-state"
                            width={213}
                            height={213}
                        />
                        <button
                            type="button"
                            onClick={handleOpenTable}
                            className="underline text-base text-Blue-500"
                        >
                            Show latest data
                        </button>
                    </div>
                </BodyContent>
            </Content>
            <TableDrawer
                title="Find Stock Mutation"
                queryKey={GET_STOCK_MUTATION}
                columns={{
                    columns: [
                        {
                            accessor: "number",
                            header: "#",
                        },
                        {
                            accessor: "document_number",
                            header: "Document",
                        },
                        {
                            accessor: "date",
                            header: "Date",
                        },
                        {
                            accessor: "cancel",
                            header: "Cancel",
                        },
                        {
                            accessor: "warehouse",
                            header: "Werehouse",
                        },
                        {
                            accessor: "from_to",
                            header: "From/To",
                        },
                        {
                            accessor: "item_name",
                            header: "Item Name",
                        },
                        {
                            accessor: "batch",
                            header: "Batch",
                        },
                    ],
                }}
                queryFn={getStockMutation}
            />
            <CreateStockMutation />
            <DetailStockMutation />
            <EditStockMutation />
        </>
    );
};

export default StockMutation;
