"use client";

import React from "react";
import Content from "@components/module/Content";
import HeaderContent from "@components/module/Content/HeaderContent";
import BodyContent from "@components/module/Content/BodyContent";
import Image from "next/image";
import { useDrawerStore } from "@stores/useDrawerStore";
import { getCountry } from "@services/fetcher/configuration/general";
import { GET_COUNTRY } from "@constants/queryKey";
import dynamic from "next/dynamic";

const TableDrawer = dynamic(
    () => import("@components/shared/Drawer/Table/TableDrawer"),
    { ssr: false }
);
const CreateCountry = dynamic(
    () => import("@components/module/Configuration/General/Country/Create"),
    { ssr: false }
);
const DetailCountry = dynamic(
    () => import("@components/module/Configuration/General/Country/Detail"),
    { ssr: false }
);
const EditCountry = dynamic(
    () => import("@components/module/Configuration/General/Country/Edit"),
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
                <HeaderContent title="Country" onAdd={handleOpenAdd} />
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
                title="Find Country"
                queryKey={GET_COUNTRY}
                columns={{
                    columns: [
                        {
                            accessor: "number",
                            header: "#",
                        },
                        {
                            accessor: "country_code",
                            header: "Country Code",
                        },
                        {
                            accessor: "country_name",
                            header: "Country Name",
                        },
                        {
                            accessor: "create_date",
                            header: "Create Date",
                        },
                    ],
                }}
                queryFn={getCountry}
            />
            <CreateCountry />
            <DetailCountry />
            <EditCountry />
        </>
    );
};

export default Country;
