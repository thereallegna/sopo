"use client";

import React from "react";
import Content from "@components/module/Content";
import HeaderContent from "@components/module/Content/HeaderContent";
import BodyContent from "@components/module/Content/BodyContent";
import Image from "next/image";
import { useDrawerStore } from "@stores/useDrawerStore";
import { getVendor } from "@services/fetcher/configuration/procurement-management";
import { GET_VENDOR } from "@constants/queryKey";
import dynamic from "next/dynamic";

const TableDrawer = dynamic(
    () => import("@components/shared/Drawer/Table/TableDrawer"),
    { ssr: false }
);
const CreateVendor = dynamic(
    () =>
        import(
            "@components/module/Configuration/ProcurementManagement/Vendor/Create"
        ),
    { ssr: false }
);
const DetailVendor = dynamic(
    () =>
        import(
            "@components/module/Configuration/ProcurementManagement/Vendor/Detail"
        ),
    { ssr: false }
);
const EditVendor = dynamic(
    () =>
        import(
            "@components/module/Configuration/ProcurementManagement/Vendor/Edit"
        ),
    { ssr: false }
);

const Vendor = () => {
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
                <HeaderContent title="Vendor" onAdd={handleOpenAdd} />
                <BodyContent>
                    <div className="flex flex-col justify-center items-center h-full min-h-[400px] py-2">
                        <Image
                            src="/images/api-empty-state.png"
                            alt="Empty State"
                            width={200}
                            height={200}
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
                title="Find Vendor"
                queryKey={GET_VENDOR}
                columns={{
                    columns: [
                        {
                            accessor: "number",
                            header: "#",
                        },
                        {
                            accessor: "vendor_code",
                            header: "Vendor Code",
                        },
                        {
                            accessor: "vendor_name",
                            header: "Vendor Name",
                        },
                        {
                            accessor: "vendor_category",
                            header: "Vendor Category",
                        },
                        {
                            accessor: "address",
                            header: "Address",
                        },
                        {
                            accessor: "create_date",
                            header: "Create Date",
                        },
                    ],
                }}
                queryFn={getVendor}
            />
            <CreateVendor />
            <DetailVendor />
            <EditVendor />
        </>
    );
};

export default Vendor;
