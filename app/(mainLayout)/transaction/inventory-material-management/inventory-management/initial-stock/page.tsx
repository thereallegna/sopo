"use client";

import React from "react";
import Content from "@components/module/Content";
import HeaderContent from "@components/module/Content/HeaderContent";
import BodyContent from "@components/module/Content/BodyContent";
import Image from "next/image";
import { useDrawerStore } from "@stores/useDrawerStore";
import { getInitialStock } from "@services/fetcher/transaction/inventory-material-management/inventory-management";
import { GET_INITIAL_STOCK } from "@constants/queryKey";
import dynamic from "next/dynamic";

const TableDrawer = dynamic(
    () => import("@components/shared/Drawer/Table/TableDrawer"),
    { ssr: false }
);
const CreateInitialStock = dynamic(
    () =>
        import(
            "@components/module/Transaction/InventoryMaterialManagement/InventoryManagement/InitialStock/Create"
        ),
    { ssr: false }
);
const DetailInitialStock = dynamic(
    () =>
        import(
            "@components/module/Transaction/InventoryMaterialManagement/InventoryManagement/InitialStock/Detail"
        ),
    { ssr: false }
);
const EditInitialStock = dynamic(
    () =>
        import(
            "@components/module/Transaction/InventoryMaterialManagement/InventoryManagement/InitialStock/Edit"
        ),
    { ssr: false }
);

const InitialStock = () => {
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
                <HeaderContent title="Initial Stock" onAdd={handleOpenAdd} />
                <BodyContent>
                    <div className="flex flex-col justify-center items-center h-full min-h-[400px] py-2">
                        <Image
                            src="/images/api-empty-state.png"
                            alt="api-empyt-state"
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
                title="Find Initial Stock"
                queryKey={GET_INITIAL_STOCK}
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
                            accessor: "warehouse_name",
                            header: "Warehouse",
                        },
                        {
                            accessor: "remark",
                            header: "Remark",
                        },
                    ],
                }}
                queryFn={getInitialStock}
            />
            <CreateInitialStock />
            <DetailInitialStock />
            <EditInitialStock />
        </>
    );
};

export default InitialStock;
