"use client";

import React from "react";
import Content from "@components/module/Content";
import HeaderContent from "@components/module/Content/HeaderContent";
import BodyContent from "@components/module/Content/BodyContent";
import Image from "next/image";
import { useDrawerStore } from "@stores/useDrawerStore";
import { getItemCategory } from "@services/fetcher/configuration/inventory-management";
import { GET_CATEGORY_MATERIAL_MANAGEMENT } from "@constants/queryKey";
import dynamic from "next/dynamic";

const TableDrawer = dynamic(
    () => import("@components/shared/Drawer/Table/TableDrawer"),
    { ssr: false }
);
const CreateItemCategory = dynamic(
    () =>
        import(
            "@components/module/Configuration/InventoryMaterialManagement/MaterialManagement/ItemCategory/Create"
        ),
    { ssr: false }
);
const DetailItemCategory = dynamic(
    () =>
        import(
            "@components/module/Configuration/InventoryMaterialManagement/MaterialManagement/ItemCategory/Detail"
        ),
    { ssr: false }
);
const EditItemCategory = dynamic(
    () =>
        import(
            "@components/module/Configuration/InventoryMaterialManagement/MaterialManagement/ItemCategory/Edit"
        ),
    { ssr: false }
);

const ItemCategory = () => {
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
                <HeaderContent title="Item's Category" onAdd={handleOpenAdd} />
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
                title="Find Category Material Management"
                queryKey={GET_CATEGORY_MATERIAL_MANAGEMENT}
                columns={{
                    columns: [
                        {
                            accessor: "number",
                            header: "#",
                            size: 65,
                        },
                        {
                            accessor: "item_category_code",
                            header: "Item Category Code",
                        },
                        {
                            accessor: "item_category_name",
                            header: "Item Category Name",
                        },
                        {
                            accessor: "active",
                            header: "Active",
                        },
                        {
                            accessor: "create_date",
                            header: "Create Date",
                        },
                        // {
                        //   accessor: 'coa_stock',
                        //   header: 'Coa Stock',
                        // },
                        // {
                        //   accessor: 'coa_stock_description',
                        //   header: 'Coa Stock Description',
                        // },
                        // {
                        //   accessor: 'coa_sales',
                        //   header: 'Coa Sales',
                        // },
                        // {
                        //   accessor: 'coa_sales_description',
                        //   header: 'Coa Sales Description',
                        // },
                        // {
                        //   accessor: 'coa_cogs',
                        //   header: 'Coa Cogs',
                        // },
                        // {
                        //   accessor: 'coa_cogs_description',
                        //   header: 'Coa Cogs Description',
                        // },
                        // {
                        //   accessor: 'coa_sales_return',
                        //   header: 'Coa Sales Return',
                        // },
                        // {
                        //   accessor: 'coa_sales_return_description',
                        //   header: 'Coa Sales Return Description',
                        // },
                        // {
                        //   accessor: 'coa_purchase_return',
                        //   header: 'Coa Purchase Return',
                        // },
                        // {
                        //   accessor: 'coa_purchase_return_description',
                        //   header: 'Coa Purchase Return Description',
                        // },
                        // {
                        //   accessor: 'coa_consumption_cost',
                        //   header: 'Coa Consumption Cost',
                        // },
                        // {
                        //   accessor: 'coa_consumption_cost_description',
                        //   header: 'Coa Consumption Cost Description',
                        // },
                    ],
                }}
                pinnedColumns={["number", "item_category_code"]}
                queryFn={getItemCategory}
            />
            <CreateItemCategory />
            <DetailItemCategory />
            <EditItemCategory />
        </>
    );
};

export default ItemCategory;
