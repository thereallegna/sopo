"use client";

import React from "react";
import Context from "@components/module/Content";
import HeaderContent from "@components/module/Content/HeaderContent";
import BodyContent from "@components/module/Content/BodyContent";
import Image from "next/image";
import { useDrawerStore } from "@stores/useDrawerStore";
import { getVendorCategory } from "@services/fetcher/configuration/procurement-management";
import { GET_VENDOR_CATEGORY } from "@constants/queryKey";
import dynamic from "next/dynamic";

const TableDrawer = dynamic(
    () => import("@components/shared/Drawer/Table/TableDrawer"),
    { ssr: false }
);
const CreateVendorCategory = dynamic(
    () =>
        import(
            "@components/module/Configuration/ProcurementManagement/VendorCategory/Create"
        ),
    { ssr: false }
);
const DetailVendorCategory = dynamic(
    () =>
        import(
            "@components/module/Configuration/ProcurementManagement/VendorCategory/Detail"
        ),
    { ssr: false }
);
const EditVendorCategory = dynamic(
    () =>
        import(
            "@components/module/Configuration/ProcurementManagement/VendorCategory/Edit"
        ),
    { ssr: false }
);

const VendorCategory = () => {
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
            <Context>
                <HeaderContent title="Vendor Category" onAdd={handleOpenAdd} />
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
            </Context>
            <TableDrawer
                title="Vendor Category"
                queryKey={GET_VENDOR_CATEGORY}
                columns={{
                    columns: [
                        {
                            accessor: "number",
                            header: "#",
                        },
                        {
                            accessor: "vendor_category_code",
                            header: "Vendor Category Code",
                        },
                        {
                            accessor: "vendor_category_name",
                            header: "Vendor Category Name",
                        },
                        {
                            accessor: "create_date",
                            header: "Create Date",
                        },
                    ],
                }}
                queryFn={getVendorCategory}
            />
            <CreateVendorCategory />
            <DetailVendorCategory />
            <EditVendorCategory />
        </>
    );
};

export default VendorCategory;
