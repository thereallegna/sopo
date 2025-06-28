"use client";

import React from "react";
import Content from "@components/module/Content";
import HeaderContent from "@components/module/Content/HeaderContent";
import BodyContent from "@components/module/Content/BodyContent";
import Image from "next/image";
import { useDrawerStore } from "@stores/useDrawerStore";
import { getTaxGroup } from "@services/fetcher/configuration/financial-management";
import { GET_TAX_GROUP } from "@constants/queryKey";
import dynamic from "next/dynamic";

const TableDrawer = dynamic(
    () => import("@components/shared/Drawer/Table/TableDrawer"),
    { ssr: false }
);
const CreateTaxGroup = dynamic(
    () =>
        import(
            "@components/module/Configuration/FinancialManagement/TaxGroup/Create"
        ),
    { ssr: false }
);
const DetailTaxGroup = dynamic(
    () =>
        import(
            "@components/module/Configuration/FinancialManagement/TaxGroup/Detail"
        ),
    { ssr: false }
);
const EditTaxGroup = dynamic(
    () =>
        import(
            "@components/module/Configuration/FinancialManagement/TaxGroup/Edit"
        ),
    { ssr: false }
);

const TaxGroup = () => {
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
                <HeaderContent title="Tax Group" onAdd={handleOpenAdd} />
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
                title="Find Tax Group"
                queryKey={GET_TAX_GROUP}
                columns={{
                    columns: [
                        {
                            accessor: "number",
                            header: "#",
                        },
                        {
                            accessor: "tax_group_code",
                            header: "Tax Group Code",
                        },
                        {
                            accessor: "tax_group_name",
                            header: "Tax Group Name",
                        },
                        {
                            accessor: "create_date",
                            header: "Create Date",
                        },
                    ],
                }}
                queryFn={getTaxGroup}
            />
            <CreateTaxGroup />
            <DetailTaxGroup />
            <EditTaxGroup />
        </>
    );
};

export default TaxGroup;
