"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@components/ui/Button";
import { usePathname } from "next/navigation";
import { cn } from "@libs/classNames";
import { useSidebar } from "@hooks/useSidebar";
import { useSidebarStore } from "@stores/useSidebarStore";
import SidebarDropdown from "./SidebarDropdown";
import { SidebarItem } from "../../../types/sidebar";

type SidebarItemsProps = {
    items: SidebarItem[];
};

const SidebarItems: React.FC<SidebarItemsProps> = ({ items }) => {
    const pathname = usePathname();
    const searchQuery = useSidebarStore((state) =>
        state.searchQuery.toLowerCase()
    );
    const { isOpen } = useSidebar();

    const filterItems = (item: SidebarItem): boolean => {
        const matchesTitle = item.title.toLowerCase().includes(searchQuery);

        const childrenMatch =
            item.children?.some((child) => filterItems(child)) ?? false;

        return matchesTitle || childrenMatch;
    };

    return (
        <div className="space-y-1 py-1">
            {items.filter(filterItems).map((item) => {
                const isActive = pathname === item.path;

                return (
                    <div key={item.title}>
                        {item.path ? (
                            <Link href={item.path}>
                                <Button
                                    type="button"
                                    iconClassName={cn(
                                        isActive
                                            ? "text-[#475569] font-bold"
                                            : ""
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
                                            isActive
                                                ? "font-semibold"
                                                : "font-normal",
                                            isOpen ? "block" : "hidden"
                                        )}
                                    >
                                        {item.title}
                                    </h1>
                                </Button>
                            </Link>
                        ) : (
                            <SidebarDropdown item={item} />
                        )}
                    </div>
                );
            })}
        </div>
    );
};

export default SidebarItems;
