"use client";

import { Button } from "@components/ui/Button";
import Input from "@components/ui/Input";
import { IconChevronsLeft, IconSearch } from "@tabler/icons-react";
import { useSidebar } from "@hooks/useSidebar";
import { cn } from "@libs/classNames";
import React from "react";
import { useSidebarStore } from "@stores/useSidebarStore";

const SidebarHeader: React.FC = () => {
    const { isOpen } = useSidebar();
    const { setSearchQuery, toggleSidebar } = useSidebarStore();

    return (
        <div className="sticky p-3 top-0 flex flex-row gap-[10px]">
            <Input
                className={cn(
                    isOpen ? "" : "hidden transition-all duration-300"
                )}
                placeholder="Search menu.."
                end_icon={{
                    icon: IconSearch,
                    className: "text-[#354052]",
                }}
                onChange={(e) => setSearchQuery(e.target.value)} // Menambahkan onChange
            />

            <Button
                size="icon"
                className="flex-1 bg-Neutral-100 hover:bg-Neutral-200 focus:bg-Neutral-300"
                iconClassName={`transition-transform duration-200 ${
                    isOpen ? "" : "rotate-180"
                }`}
                icon={{
                    icon: IconChevronsLeft,
                    size: "large",
                }}
                onClick={() => toggleSidebar()}
            />
        </div>
    );
};

export default SidebarHeader;
