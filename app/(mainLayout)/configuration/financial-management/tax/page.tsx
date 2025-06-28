"use client";

import React from "react";
import Content from "@components/module/Content";
import HeaderContent from "@components/module/Content/HeaderContent";
import BodyContent from "@components/module/Content/BodyContent";
import Image from "next/image";
import { useDrawerStore } from "@stores/useDrawerStore";
import { getTax } from "@services/fetcher/configuration/financial-management";
import { GET_TAX } from "@constants/queryKey";
import dynamic from "next/dynamic";

const TableDrawer = dynamic(
    () => import("@components/shared/Drawer/Table/TableDrawer"),
    { ssr: false }
);
const CreateTax = dynamic(
    () =>
        import(
            "@components/module/Configuration/FinancialManagement/Tax/Create"
        ),
    { ssr: false }
);
const DetailTax = dynamic(
    () =>
        import(
            "@components/module/Configuration/FinancialManagement/Tax/Detail"
        ),
    { ssr: false }
);
const EditTax = dynamic(
    () =>
        import("@components/module/Configuration/FinancialManagement/Tax/Edit"),
    { ssr: false }
);

const Tax = () => {
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
                <HeaderContent title="Tax" onAdd={handleOpenAdd} />
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
                title="Find Tax"
                queryKey={GET_TAX}
                columns={{
                    columns: [
                        {
                            accessor: "number",
                            header: "#",
                        },
                        {
                            accessor: "tax_code",
                            header: "Tax Code",
                        },
                        {
                            accessor: "tax_name",
                            header: "Tax Name",
                        },
                        {
                            accessor: "tax_rate",
                            header: "Tax Rate",
                        },
                        {
                            accessor: "tax_group",
                            header: "Tax Group",
                        },
                        {
                            accessor: "create_date",
                            header: "Create Date",
                        },
                    ],
                }}
                queryFn={getTax}
            />
            <CreateTax />
            <DetailTax />
            <EditTax />
        </>
    );
};

export default Tax;
