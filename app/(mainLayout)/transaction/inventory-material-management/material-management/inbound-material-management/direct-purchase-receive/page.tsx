"use client";

import React from "react";
import Content from "@components/module/Content";
import HeaderContent from "@components/module/Content/HeaderContent";
import BodyContent from "@components/module/Content/BodyContent";
import Image from "next/image";
import { useDrawerStore } from "@stores/useDrawerStore";
import { GET_DIRECT_PURCHASE_RECEIVE } from "@constants/queryKey";
import dynamic from "next/dynamic";
import { getDirectPurchaseReceive } from "@services/fetcher/transaction/inventory-material-management/material-management/inbound-material-management";

const TableDrawer = dynamic(
    () => import("@components/shared/Drawer/Table/TableDrawer"),
    { ssr: false }
);
const CreateDirectPurchaseReceive = dynamic(
    () =>
        import(
            "@components/module/Transaction/InventoryMaterialManagement/MaterialManagement/InboundMaterialManagement/DirectPurchaseReceive/Create"
        ),
    { ssr: false }
);
const DetailDirectPurchaseReceive = dynamic(
    () =>
        import(
            "@components/module/Transaction/InventoryMaterialManagement/MaterialManagement/InboundMaterialManagement/DirectPurchaseReceive/Detail"
        ),
    { ssr: false }
);
const EditDirectPurchaseReceive = dynamic(
    () =>
        import(
            "@components/module/Transaction/InventoryMaterialManagement/MaterialManagement/InboundMaterialManagement/DirectPurchaseReceive/Edit"
        ),
    { ssr: false }
);

const DirectPurchaseReceive = () => {
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
                <HeaderContent
                    title="Direct Purchase Receive"
                    onAdd={handleOpenAdd}
                />
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
                title="Find Direct Purchase Receive"
                queryKey={GET_DIRECT_PURCHASE_RECEIVE}
                columns={{
                    columns: [
                        {
                            accessor: "number",
                            header: "#",
                        },
                        {
                            accessor: "document_number",
                            header: "Document Number",
                        },
                        {
                            accessor: "warehouse_name",
                            header: "Warehouse",
                        },
                        {
                            accessor: "vendor_name",
                            header: "Vendor",
                        },
                    ],
                }}
                queryFn={getDirectPurchaseReceive}
            />
            <CreateDirectPurchaseReceive />
            <DetailDirectPurchaseReceive />
            <EditDirectPurchaseReceive />
        </>
    );
};

export default DirectPurchaseReceive;
