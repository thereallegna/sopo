import {
    IconLayoutDashboard,
    IconAdjustments,
    IconArrowsLeftRight,
    IconChartArea,
} from "@tabler/icons-react";
import { SidebarItem } from "../types/sidebar";

export const sidebarConstant: SidebarItem[] = [
    {
        title: "Dashboard",
        path: "/dashboard",
        icon: { icon: IconLayoutDashboard },
        roles: ["ADMIN", "PROCUREMENT", "WAREHOUSE"],
    },
    {
        title: "Configuration",
        icon: { icon: IconAdjustments },
        roles: ["ADMIN", "PROCUREMENT", "WAREHOUSE"],
        children: [
            {
                title: "General",
                roles: ["ADMIN", "PROCUREMENT", "WAREHOUSE"],
                children: [
                    {
                        title: "Site",
                        path: "/configuration/general/site",
                        roles: ["ADMIN", "PROCUREMENT", "WAREHOUSE"],
                    },
                    {
                        title: "Country",
                        path: "/configuration/general/country",
                        roles: ["ADMIN", "PROCUREMENT", "WAREHOUSE"],
                    },
                    {
                        title: "Province",
                        path: "/configuration/general/province",
                        roles: ["ADMIN", "PROCUREMENT", "WAREHOUSE"],
                    },
                    {
                        title: "City",
                        path: "/configuration/general/city",
                        roles: ["ADMIN", "PROCUREMENT", "WAREHOUSE"],
                    },
                ],
            },
            {
                title: "Financial Management",
                roles: ["ADMIN", "PROCUREMENT", "WAREHOUSE"],
                children: [
                    {
                        title: "Currency",
                        path: "/configuration/financial-management/currency",
                        roles: ["ADMIN", "PROCUREMENT", "WAREHOUSE"],
                    },
                    {
                        title: "Tax",
                        path: "/configuration/financial-management/tax",
                        roles: ["ADMIN", "PROCUREMENT"],
                    },
                    {
                        title: "Tax Group",
                        path: "/configuration/financial-management/tax-group",
                        roles: ["ADMIN", "PROCUREMENT"],
                    },
                ],
            },
            {
                title: "Procurement Management",
                roles: ["ADMIN", "PROCUREMENT"],
                children: [
                    {
                        title: "Vendor Category",
                        path: "/configuration/procurement-management/vendor-category",
                        roles: ["ADMIN", "PROCUREMENT"],
                    },
                    {
                        title: "Master Vendor",
                        path: "/configuration/procurement-management/vendor",
                        roles: ["ADMIN", "PROCUREMENT"],
                    },
                ],
            },
            {
                title: "Inventory & Material Management",
                roles: ["ADMIN", "PROCUREMENT", "WAREHOUSE"],
                children: [
                    {
                        title: "Material Management",
                        roles: ["ADMIN", "WAREHOUSE"],
                        children: [
                            {
                                title: "Items Category",
                                path: "/configuration/inventory-management/material-management/items-category",
                                roles: ["ADMIN", "WAREHOUSE"],
                            },
                            {
                                title: "Master Items",
                                path: "/configuration/inventory-management/material-management/master-items",
                                roles: ["ADMIN", "WAREHOUSE"],
                            },
                            {
                                title: "Items UoM",
                                path: "/configuration/inventory-management/material-management/items-uom",
                                roles: ["ADMIN", "WAREHOUSE"],
                            },
                        ],
                    },
                    {
                        title: "Warehouse Management System",
                        roles: ["ADMIN", "PROCUREMENT", "WAREHOUSE"],
                        children: [
                            {
                                title: "Warehouse's Category",
                                path: "/configuration/inventory-management/warehouse-management-system/warehouse-category",
                                roles: ["ADMIN", "PROCUREMENT", "WAREHOUSE"],
                            },
                            {
                                title: "Warehouse",
                                path: "/configuration/inventory-management/warehouse-management-system/warehouse",
                                roles: ["ADMIN", "PROCUREMENT", "WAREHOUSE"],
                            },
                        ],
                    },
                ],
            },
        ],
    },
    {
        title: "Transaction",
        icon: { icon: IconArrowsLeftRight },
        roles: ["ADMIN", "PROCUREMENT", "WAREHOUSE"],
        children: [
            {
                title: "Inventory Material Management",
                roles: ["ADMIN", "PROCUREMENT", "WAREHOUSE"],
                children: [
                    {
                        title: "Inventory Management",
                        roles: ["ADMIN", "WAREHOUSE"],
                        children: [
                            {
                                title: "Initial Stock",
                                path: "/transaction/inventory-material-management/inventory-management/initial-stock",
                                roles: ["ADMIN", "WAREHOUSE"],
                            },
                            {
                                title: "Stock Adjustment",
                                path: "/transaction/inventory-material-management/inventory-management/stock-adjustment",
                                roles: ["ADMIN", "WAREHOUSE"],
                            },
                            {
                                title: "Stock Mutation",
                                path: "/transaction/inventory-material-management/inventory-management/stock-mutation",
                                roles: ["ADMIN", "WAREHOUSE"],
                            },
                        ],
                    },
                    {
                        title: "Material Management",
                        roles: ["ADMIN", "PROCUREMENT"],
                        children: [
                            {
                                title: "Inbound Material Management",
                                roles: ["ADMIN", "PROCUREMENT"],
                                children: [
                                    {
                                        title: "Direct Purchase Receive",
                                        path: "/transaction/inventory-material-management/material-management/inbound-material-management/direct-purchase-receive",
                                        roles: ["ADMIN", "PROCUREMENT"],
                                    },
                                ],
                            },
                        ],
                    },
                ],
            },
        ],
    },
    {
        title: "Reporting",
        icon: { icon: IconChartArea },
        roles: ["ADMIN", "PROCUREMENT", "WAREHOUSE"],
        children: [
            {
                title: "Inventory Material Management",
                roles: ["ADMIN", "PROCUREMENT", "WAREHOUSE"],
                children: [
                    {
                        title: "Inventory Management",
                        roles: ["ADMIN", "PROCUREMENT", "WAREHOUSE"],
                        children: [
                            {
                                title: "Stock Summary",
                                path: "/reporting/inventory-material-management/inventory-management/stock-summary",
                                roles: ["ADMIN", "PROCUREMENT", "WAREHOUSE"],
                            },
                            {
                                title: "Stock Movement",
                                path: "/reporting/inventory-material-management/inventory-management/stock-movement",
                                roles: ["ADMIN", "PROCUREMENT", "WAREHOUSE"],
                            },
                        ],
                    },
                ],
            },
        ],
    },
];
