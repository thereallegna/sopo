import React from "react";
import {
    IconLayoutNavbar,
    IconChevronDown,
    IconLayoutRows,
    IconColumns3,
} from "@tabler/icons-react";
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import IconComponent, { IconProps } from "@components/ui/Icon";
import { Button } from "@components/ui/Button";
import { RowSizeType } from "../../../../types/client/table";

export type RowSizeDropdownProps = {
    active: RowSizeType;
    action: (size: RowSizeType) => void;
};

const RowSizeDropdown: React.FC<RowSizeDropdownProps> = ({
    active,
    action,
}) => {
    const labels: { name: RowSizeType; icon: IconProps }[] = [
        {
            name: "normal",
            icon: {
                icon: IconLayoutNavbar,
                size: "large",
            },
        },
        {
            name: "compact",
            icon: {
                icon: IconLayoutRows,
                size: "large",
            },
        },
        {
            name: "narrow",
            icon: {
                icon: IconColumns3,
                size: "large",
                className: "rotate-90",
            },
        },
    ];

    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <Button variant="secondary" className="px-[10px]">
                    <IconComponent icon={IconLayoutNavbar} size="large" />
                    <IconComponent icon={IconChevronDown} size="large" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
                align="start"
                className="bg-white shadow-md rounded-sm w-[124px] border border-neutral-200 p-2 mt-1"
            >
                <div className="px-1">
                    {labels.map((label) => (
                        <DropdownMenuCheckboxItem
                            key={label.name}
                            className={`${
                                active === label.name ? "bg-[#EFF8FF]" : ""
                            } text-base font-normal p-[5px_12px] flex items-center gap-2 capitalize hover:bg-[#EFF8FF] rounded`}
                            onClick={() => action(label.name)}
                        >
                            <IconComponent {...label.icon} />
                            {label.name}
                        </DropdownMenuCheckboxItem>
                    ))}
                </div>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default RowSizeDropdown;
