"use client";

import React from "react";
import Content from "@components/module/Content";
import HeaderContent from "@components/module/Content/HeaderContent";
import BodyContent from "@components/module/Content/BodyContent";
import Image from "next/image";
import { useDrawerStore } from "@stores/useDrawerStore";
import { getCity } from "@services/fetcher/configuration/general";
import { GET_CITY } from "@constants/queryKey";
import dynamic from "next/dynamic";

const TableDrawer = dynamic(
    () => import("@components/shared/Drawer/Table/TableDrawer"),
    { ssr: false }
);
const CreateCity = dynamic(
    () => import("@components/module/Configuration/General/City/Create"),
    { ssr: false }
);
const DetailCity = dynamic(
    () => import("@components/module/Configuration/General/City/Detail"),
    { ssr: false }
);
const EditCity = dynamic(
    () => import("@components/module/Configuration/General/City/Edit"),
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
                <HeaderContent title="City" onAdd={handleOpenAdd} />
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
                title="Find City"
                queryKey={GET_CITY}
                columns={{
                    columns: [
                        {
                            accessor: "number",
                            header: "#",
                        },
                        {
                            accessor: "city_code",
                            header: "City Code",
                        },
                        {
                            accessor: "city_name",
                            header: "City Name",
                        },
                        {
                            accessor: "province",
                            header: "Province",
                        },
                        {
                            accessor: "ring_area",
                            header: "Ring Area",
                        },
                        {
                            accessor: "create_date",
                            header: "Create Date",
                        },
                    ],
                }}
                queryFn={getCity}
            />
            <CreateCity />
            <DetailCity />
            <EditCity />
        </>
    );
};

export default Country;
