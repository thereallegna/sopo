import React from "react";
import { IconAdjustments } from "@tabler/icons-react";
import { Button, ButtonProps } from "@components/ui/Button";

export type FilterButtonProps = {
    iconColor?:
        | "primary"
        | "secondary"
        | "danger"
        | "default"
        | "teriary"
        | "quaternary"
        | "light"
        | "dark"
        | "White"
        | "drawer"
        | null;
} & ButtonProps;

const FilterButton: React.FC<FilterButtonProps> = ({ iconColor, ...props }) => (
    <Button
        variant="secondary"
        className="w-[75px]"
        icon={{
            icon: IconAdjustments,
            size: "large",
            className: "mr-2",
            color: iconColor,
        }}
        {...props}
    >
        Filter
    </Button>
);

export default FilterButton;
