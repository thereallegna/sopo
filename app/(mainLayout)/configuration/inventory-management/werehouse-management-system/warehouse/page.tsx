"use client";

import React from "react";
import Content from "@components/module/Content";
import HeaderContent from "@components/module/Content/HeaderContent";
import BodyContent from "@components/module/Content/BodyContent";
import Image from "next/image";
import { useDrawerStore } from "@stores/useDrawerStore";
import { GET_WAREHOUSE } from "@constants/queryKey";
import dynamic from "next/dynamic";
import { getWarehouse } from "@services/fetcher/configuration/inventory-management";

const TableDrawer = dynamic(
    () => import("@components/shared/Drawer/Table/TableDrawer"),
    { ssr: false }
);
const CreateWarehouse = dynamic(
    () =>
        import(
            "@components/module/Configuration/InventoryMaterialManagement/WarehouseManagementSystem/Warehouse/Create"
        ),
    { ssr: false }
);
const DetailWarehouse = dynamic(
    () =>
        import(
            "@components/module/Configuration/InventoryMaterialManagement/WarehouseManagementSystem/Warehouse/Detail"
        ),
    { ssr: false }
);
const EditWarehouse = dynamic(
    () =>
        import(
            "@components/module/Configuration/InventoryMaterialManagement/WarehouseManagementSystem/Warehouse/Edit"
        ),
    { ssr: false }
);

const Warehouse = () => {
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
                <HeaderContent title="Warehouse" onAdd={handleOpenAdd} />
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
                title="Find Warehouse"
                queryKey={GET_WAREHOUSE}
                columns={{
                    columns: [
                        {
                            accessor: "number",
                            header: "#",
                        },
                        {
                            accessor: "warehouse_code",
                            header: "Warehouse Code",
                        },
                        {
                            accessor: "warehouse_name",
                            header: "Warehouse Name",
                        },
                        {
                            accessor: "warehouse_category_name",
                            header: "Warehouse Category Name",
                        },
                        {
                            accessor: "create_date",
                            header: "Create Date",
                        },
                    ],
                }}
                queryFn={getWarehouse}
            />
            <CreateWarehouse />
            <DetailWarehouse />
            <EditWarehouse />
        </>
    );
};

export default Warehouse;
