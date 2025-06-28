"use client";

import React from "react";
import Content from "@components/module/Content";
import HeaderContent from "@components/module/Content/HeaderContent";
import BodyContent from "@components/module/Content/BodyContent";
import Image from "next/image";
import { useDrawerStore } from "@stores/useDrawerStore";
import { getUOM } from "@services/fetcher/configuration/inventory-management";
import { GET_UOM } from "@constants/queryKey";
import dynamic from "next/dynamic";

const TableDrawer = dynamic(
    () => import("@components/shared/Drawer/Table/TableDrawer"),
    { ssr: false }
);
const CreateUOM = dynamic(
    () =>
        import(
            "@components/module/Configuration/InventoryMaterialManagement/MaterialManagement/UoM/Create"
        ),
    { ssr: false }
);
const DetailUOM = dynamic(
    () =>
        import(
            "@components/module/Configuration/InventoryMaterialManagement/MaterialManagement/UoM/Detail"
        ),
    { ssr: false }
);
const EditUOM = dynamic(
    () =>
        import(
            "@components/module/Configuration/InventoryMaterialManagement/MaterialManagement/UoM/Edit"
        ),
    { ssr: false }
);

const Country = () => {
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
                <HeaderContent title="UoM" onAdd={handleOpenAdd} />
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
                title="Find UoM"
                queryKey={GET_UOM}
                columns={{
                    columns: [
                        {
                            accessor: "number",
                            header: "#",
                        },
                        {
                            accessor: "uom_code",
                            header: "UoM Code",
                        },
                        {
                            accessor: "uom_name",
                            header: "UoM Name",
                        },
                        {
                            accessor: "create_date",
                            header: "Create Date",
                        },
                    ],
                }}
                queryFn={getUOM}
            />
            <CreateUOM />
            <DetailUOM />
            <EditUOM />
        </>
    );
};

export default Country;
