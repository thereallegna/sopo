"use client";

import React from "react";
import Content from "@components/module/Content";
import HeaderContent from "@components/module/Content/HeaderContent";
import BodyContent from "@components/module/Content/BodyContent";
import Image from "next/image";
import { useDrawerStore } from "@stores/useDrawerStore";
import { GET_WAREHOUSE_CATEGORY } from "@constants/queryKey";
import dynamic from "next/dynamic";
import { getWarehouseCategory } from "@services/fetcher/configuration/inventory-management";

const TableDrawer = dynamic(
    () => import("@components/shared/Drawer/Table/TableDrawer"),
    { ssr: false }
);
const CreateWarehouseCategory = dynamic(
    () =>
        import(
            "@components/module/Configuration/InventoryMaterialManagement/WarehouseManagementSystem/WarehouseCategory/Create"
        ),
    { ssr: false }
);
const DetailWarehouseCategory = dynamic(
    () =>
        import(
            "@components/module/Configuration/InventoryMaterialManagement/WarehouseManagementSystem/WarehouseCategory/Detail"
        ),
    { ssr: false }
);
const EditWarehouseCategory = dynamic(
    () =>
        import(
            "@components/module/Configuration/InventoryMaterialManagement/WarehouseManagementSystem/WarehouseCategory/Edit"
        ),
    { ssr: false }
);

const WarehouseCategory = () => {
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
                    title="Warehouse Category"
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
                title="Find Warehouse Category"
                queryKey={GET_WAREHOUSE_CATEGORY}
                columns={{
                    columns: [
                        {
                            accessor: "number",
                            header: "#",
                        },
                        {
                            accessor: "warehouse_category_code",
                            header: "Warehouse Category Code",
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
                queryFn={getWarehouseCategory}
            />
            <CreateWarehouseCategory />
            <DetailWarehouseCategory />
            <EditWarehouseCategory />
        </>
    );
};

export default WarehouseCategory;
