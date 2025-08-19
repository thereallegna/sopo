"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@components/ui/Button";
import { usePathname } from "next/navigation";
import { cn } from "@libs/classNames";
import { useSidebar } from "@hooks/useSidebar";
import SidebarDropdown from "./SidebarDropdown";
import { SidebarItem } from "../../../types/sidebar";

type SidebarItemsProps = {
    items: SidebarItem[];
    role: string;
};

function filterSidebarItemsByRole(
    items: SidebarItem[],
    role: string
): SidebarItem[] {
    return items
        .filter((item) => !item.roles || item.roles.includes(role))
        .map((item) => {
            if (item.children) {
                const filteredChildren = filterSidebarItemsByRole(
                    item.children,
                    role
                );
                // Hanya tampilkan parent jika ada children yang lolos filter, atau parent itu sendiri punya path
                if (filteredChildren.length > 0) {
                    return { ...item, children: filteredChildren };
                }
                // Jika parent punya path dan lolos role, tetap tampilkan mesk children kosong
                if (item.path) {
                    return { ...item, children: undefined };
                }
                // Jika tidak ada children yang lolos dan parent tidak punya path, jangan tampilkan
                return null;
            }
            return item;
        })
        .filter(Boolean) as SidebarItem[];
}

const SidebarItems: React.FC<SidebarItemsProps> = ({ items, role }) => {
    const pathname = usePathname();
    // const searchQuery = useSidebarStore((state) =>
    //     state.searchQuery.toLowerCase()
    // );
    const { isOpen } = useSidebar();

    // Filter menu berdasarkan role secara rekursif
    const filteredItems = filterSidebarItemsByRole(items, role);

    return (
        <div className="space-y-1 py-1">
            {filteredItems.map((item) => {
                const isActive = pathname === item.path;

                if (item.children && item.children.length > 0) {
                    return <SidebarDropdown key={item.title} item={item} />;
                }

                return (
                    <Link key={item.title} href={item.path ?? "#"}>
                        <Button
                            type="button"
                            iconClassName={cn(
                                isActive ? "text-[#475569] font-bold" : ""
                            )}
                            className={cn(
                                "flex items-center justify-between p-2",
                                isActive ? "text-[#475569]" : ""
                            )}
                            variant="sidebar"
                            icon={item.icon}
                        >
                            <h1
                                className={cn(
                                    "ml-2 font-normal ",
                                    isActive ? "font-semibold" : "font-normal",
                                    isOpen ? "block" : "hidden"
                                )}
                            >
                                {item.title}
                            </h1>
                        </Button>
                    </Link>
                );
            })}
        </div>
    );
};

export default SidebarItems;
