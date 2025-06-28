"use client";

import React from "react";
import Content from "@components/module/Content";
import HeaderContent from "@components/module/Content/HeaderContent";
import BodyContent from "@components/module/Content/BodyContent";
import Image from "next/image";
import { useDrawerStore } from "@stores/useDrawerStore";
import dynamic from "next/dynamic";
import TableMasterItem from "@components/module/Configuration/InventoryMaterialManagement/MaterialManagement/MasterItem/Table";

const CreateMasterItem = dynamic(
    () =>
        import(
            "@components/module/Configuration/InventoryMaterialManagement/MaterialManagement/MasterItem/Create"
        ),
    { ssr: false }
);
const DetailMasterItem = dynamic(
    () =>
        import(
            "@components/module/Configuration/InventoryMaterialManagement/MaterialManagement/MasterItem/Detail"
        ),
    { ssr: false }
);
const EditMasterItem = dynamic(
    () =>
        import(
            "@components/module/Configuration/InventoryMaterialManagement/MaterialManagement/MasterItem/Edit"
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
                <HeaderContent title="Master Items" onAdd={handleOpenAdd} />
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
            <TableMasterItem />
            <CreateMasterItem />
            <DetailMasterItem />
            <EditMasterItem />
        </>
    );
};

export default Country;
